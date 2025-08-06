'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { DropdownItem, Subcategory, Type } from '@/utils/dropdownUtils';
import { useRouter, usePathname } from 'next/navigation';

interface DropdownMenuProps {
  item: DropdownItem;
  isActive: boolean;
  onClose: () => void;
  nrcCategories?: any[];
}

const DropdownMenu = ({
  item,
  isActive,
  onClose,
  nrcCategories,
}: DropdownMenuProps) => {
  const [activeSubcategory, setActiveSubcategory] = useState<number | null>(
    null,
  );
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSubcategoryHover = (subcategoryId: number) => {
    if (!isMobile) {
      setActiveSubcategory(subcategoryId);
    }
  };

  const handleSubcategoryLeave = () => {
    if (!isMobile) {
      setActiveSubcategory(null);
    }
  };

  const handleSubcategoryClick = (subcategoryId: number) => {
    if (isMobile) {
      setActiveSubcategory(
        activeSubcategory === subcategoryId ? null : subcategoryId,
      );
    }
  };

  const handleNavigation = (url: string) => {
    onClose();
    if (url.startsWith('/inventory')) {
      router.push(url);
    } else {
      window.location.href = url;
    }
  };

  // Check if dropdown should be positioned to the right or left
  const shouldPositionRight = () => {
    if (typeof window !== 'undefined') {
      const dropdownElement = dropdownRef.current;
      if (dropdownElement) {
        const rect = dropdownElement.getBoundingClientRect();
        return rect.left + 640 > window.innerWidth; // 640 = dropdown width (320) + submenu width (320)
      }
    }
    return false;
  };

  // Don't render if no subcategories
  if (!item.subcategories || item.subcategories.length === 0) {
    return null;
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 mt-2 w-80 bg-white shadow-xl rounded-lg border border-gray-200 z-50 dropdown-enter"
      onMouseLeave={onClose}
    >
      <div className="p-4">
        <div className="grid grid-cols-1 gap-0">
          {item.subcategories.map((subcategory) => {
            return (
              <div
                key={subcategory.id}
                className="relative group"
                onMouseEnter={() =>
                  !isMobile &&
                  subcategory.types.length > 0 &&
                  handleSubcategoryHover(subcategory.id)
                }
                onMouseLeave={() => !isMobile && handleSubcategoryLeave()}
              >
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition-colors">
                  <button
                    onClick={() => {
                      if (subcategory.types.length === 0) {
                        handleNavigation(subcategory.url);
                      } else if (isMobile) {
                        handleSubcategoryClick(subcategory.id);
                      }
                    }}
                    className="text-gray-800 font-medium hover:text-[#007934] transition-colors text-left w-full text-left"
                  >
                    {subcategory.name}
                  </button>
                  {subcategory.types.length > 0 && (
                    <FiChevronDown
                      className={`text-gray-400 group-hover:text-[#007934] transition-colors ${isMobile && activeSubcategory === subcategory.id ? 'rotate-180' : ''}`}
                    />
                  )}
                </div>

                {/* Types dropdown */}
                {activeSubcategory === subcategory.id && (
                  <div
                    className={`absolute top-0 w-64 bg-white shadow-xl rounded-lg border border-gray-200 z-50 dropdown-submenu-enter ${
                      shouldPositionRight()
                        ? 'right-full mr-1'
                        : 'left-full ml-1'
                    }`}
                  >
                    <div className="p-3">
                      <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                        Types
                      </h4>
                      <div className="space-y-1">
                        {subcategory.types.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => handleNavigation(type.url)}
                            className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#007934] rounded-md transition-colors"
                          >
                            {type.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
