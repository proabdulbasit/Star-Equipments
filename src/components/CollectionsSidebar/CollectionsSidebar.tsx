'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiChevronDown, FiChevronRight, FiMenu, FiX } from 'react-icons/fi';
import NavLink from '@/data/navLinks.json';

interface CollectionsSidebarProps {
  className?: string;
}

const CollectionsSidebar: React.FC<CollectionsSidebarProps> = ({
  className = '',
}) => {
  const pathname = usePathname();
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get Shop Our Products subcategories
  const shopOurProducts = NavLink.find(
    (item) => item.name === 'Shop Our Products',
  );
  const subcategories = shopOurProducts?.subcategories || [];

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const isActive = (url: string) => {
    // For the main collections page (/collections), only match exactly
    if (url === '/collections') {
      return pathname === '/collections';
    }
    // For specific collection pages, match exact URL or with subcategories
    return pathname === url || pathname.startsWith(url + '/');
  };

  const isExpanded = (categoryId: number) => {
    return expandedCategories.includes(categoryId);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const SidebarContent = () => (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Shop Our Products
      </h2>

      <nav className="space-y-2">
        {subcategories.map((category) => {
          const hasTypes = category.types && category.types.length > 0;
          const expanded = isExpanded(category.id);

          return (
            <div key={category.id} className="space-y-1">
              {hasTypes ? (
                <>
                  {/* Category with subcategories */}
                  <div className="flex items-center">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="flex items-center justify-between w-full p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="font-medium">{category.name}</span>
                      {expanded ? (
                        <FiChevronDown className="w-4 h-4" />
                      ) : (
                        <FiChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Subcategory types */}
                  {expanded && (
                    <div className="ml-4 space-y-1">
                      {category.types?.map((type) => (
                        <Link
                          key={type.id}
                          href={type.url}
                          onClick={closeMobileMenu}
                          className={`block p-2 text-sm rounded-md transition-colors ${
                            isActive(type.url)
                              ? 'bg-[#007934] text-white'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          {type.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                /* Category without subcategories */
                <Link
                  href={category.url}
                  onClick={closeMobileMenu}
                  className={`block p-3 rounded-lg transition-colors ${
                    isActive(category.url)
                      ? 'bg-[#007934] text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium">{category.name}</span>
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:block bg-white border-r border-gray-200 ${className}`}
      >
        <SidebarContent />
      </div>

      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-24 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="bg-[#007934] text-white p-3 rounded-lg shadow-lg hover:bg-[#006529] transition-colors"
          aria-label="Open categories menu"
        >
          <FiMenu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 flex">
          <div className="bg-white w-80 max-w-[85vw] h-full overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Categories
              </h2>
              <button
                onClick={closeMobileMenu}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <FiX className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <SidebarContent />
          </div>
          <div className="flex-1" onClick={closeMobileMenu} />
        </div>
      )}
    </>
  );
};

export default CollectionsSidebar;
