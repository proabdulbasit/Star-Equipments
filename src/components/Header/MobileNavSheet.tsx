'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { RxCross2 } from 'react-icons/rx';
import { FiArrowLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import NavLink from '@/data/navLinks.json';
import { useCart } from '@/context/CartContext';
import { FiShoppingCart } from 'react-icons/fi';
import { getDropdownItemByName } from '@/utils/dropdownUtils';

interface MobileNavSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavLevel {
  type: 'main' | 'subcategory' | 'types';
  title: string;
  items: any[];
  parentId?: number;
}

const MobileNavSheet: React.FC<MobileNavSheetProps> = ({ isOpen, onClose }) => {
  const [navHistory, setNavHistory] = useState<NavLevel[]>([]);
  const [currentLevel, setCurrentLevel] = useState<NavLevel>({
    type: 'main',
    title: 'Menu',
    items: NavLink,
  });
  const { cart } = useCart();

  const cartCount =
    cart?.lines?.edges?.reduce(
      (sum: any, item: { node: { quantity: any } }) =>
        sum + (item.node.quantity || 0),
      0,
    ) || 0;

  const handleItemClick = (item: any) => {
    // Check if this is a dynamic dropdown item (like Trucks)
    const dropdownItem = getDropdownItemByName(item.name);

    if (
      dropdownItem &&
      dropdownItem.subcategories &&
      dropdownItem.subcategories.length > 0
    ) {
      // Navigate to dynamic subcategories
      const newLevel: NavLevel = {
        type: 'subcategory',
        title: item.name,
        items: dropdownItem.subcategories,
        parentId: item.id,
      };

      setNavHistory([...navHistory, currentLevel]);
      setCurrentLevel(newLevel);
    } else if (item.subcategories && item.subcategories.length > 0) {
      // Navigate to static subcategories
      const newLevel: NavLevel = {
        type: 'subcategory',
        title: item.name,
        items: item.subcategories,
        parentId: item.id,
      };

      setNavHistory([...navHistory, currentLevel]);
      setCurrentLevel(newLevel);
    } else if (item.types && item.types.length > 0) {
      // Navigate to types
      const newLevel: NavLevel = {
        type: 'types',
        title: item.name,
        items: item.types,
        parentId: item.id,
      };

      setNavHistory([...navHistory, currentLevel]);
      setCurrentLevel(newLevel);
    } else {
      // Navigate to the page
      window.location.href = item.url;
      onClose();
    }
  };

  const handleBackClick = () => {
    if (navHistory.length > 0) {
      const previousLevel = navHistory[navHistory.length - 1];
      setCurrentLevel(previousLevel);
      setNavHistory(navHistory.slice(0, -1));
    } else {
      // Go back to main menu
      setCurrentLevel({
        type: 'main',
        title: 'Menu',
        items: NavLink,
      });
      setNavHistory([]);
    }
  };

  const resetNavigation = () => {
    setCurrentLevel({
      type: 'main',
      title: 'Menu',
      items: NavLink,
    });
    setNavHistory([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
      <div className="bg-white w-80 h-full max-h-screen overflow-y-auto flex flex-col relative animate-fadeInRight">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            {currentLevel.type !== 'main' && (
              <button
                onClick={handleBackClick}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <FiArrowLeft className="text-gray-600 text-xl" />
              </button>
            )}
            <span className="font-bold text-lg text-gray-800">
              {currentLevel.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <RxCross2 className="text-gray-600 text-xl" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="space-y-1">
              {currentLevel.type === 'main' ? (
                // For main menu, filter out Shop by Apparel and add it after Shop Our Products
                <>
                  {currentLevel.items
                    .filter((item) => item.name !== 'Shop by Apparel')
                    .map((item, index) => {
                      // Check if this is a dynamic dropdown item (like Trucks)
                      const dropdownItem = getDropdownItemByName(item.name);
                      const hasSubcategories =
                        (dropdownItem &&
                          dropdownItem.subcategories &&
                          dropdownItem.subcategories.length > 0) ||
                        (item.subcategories && item.subcategories.length > 0) ||
                        (item.types && item.types.length > 0);

                      return (
                        <React.Fragment key={item.id}>
                          <div className="border-b border-gray-100">
                            {hasSubcategories ? (
                              // Item has subcategories or types - make it clickable to navigate
                              <button
                                onClick={() => handleItemClick(item)}
                                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition-colors"
                              >
                                <span className="text-gray-800 font-medium text-left">
                                  {item.name}
                                </span>
                                <FiChevronRight className="text-gray-400 flex-shrink-0" />
                              </button>
                            ) : (
                              // Direct link
                              <Link
                                href={item.url}
                                onClick={onClose}
                                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition-colors"
                              >
                                <span className="text-gray-800 font-medium text-left">
                                  {item.name}
                                </span>
                              </Link>
                            )}
                          </div>
                          {/* Add Shop by Apparel right after Shop Our Products */}
                          {item.name === 'Shop Our Products' && (
                            <div className="border-b border-gray-100">
                              <button
                                onClick={() => {
                                  const shopOurProducts = NavLink.find(
                                    (item) => item.name === 'Shop Our Products',
                                  );
                                  const shopByApparel =
                                    shopOurProducts?.subcategories?.find(
                                      (sub) => sub.name === 'Shop by Apparel',
                                    );
                                  if (shopByApparel && shopByApparel.types) {
                                    const newLevel: NavLevel = {
                                      type: 'subcategory',
                                      title: 'Shop by Apparel',
                                      items: shopByApparel.types,
                                      parentId: shopByApparel.id,
                                    };
                                    setNavHistory([
                                      ...navHistory,
                                      currentLevel,
                                    ]);
                                    setCurrentLevel(newLevel);
                                  }
                                }}
                                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition-colors"
                              >
                                <span className="text-gray-800 font-medium text-left">
                                  Shop by Apparel
                                </span>
                                <FiChevronRight className="text-gray-400 flex-shrink-0" />
                              </button>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                </>
              ) : (
                // For subcategory views, show normal items but filter out Shop by Apparel from Shop Our Products
                currentLevel.items
                  .filter((item) => item.name !== 'Shop by Apparel')
                  .map((item) => {
                    // Check if this is a dynamic dropdown item (like Trucks)
                    const dropdownItem = getDropdownItemByName(item.name);
                    const hasSubcategories =
                      (dropdownItem &&
                        dropdownItem.subcategories &&
                        dropdownItem.subcategories.length > 0) ||
                      (item.subcategories && item.subcategories.length > 0) ||
                      (item.types && item.types.length > 0);

                    return (
                      <div
                        key={item.id}
                        className="border-b border-gray-100 last:border-b-0"
                      >
                        {hasSubcategories ? (
                          // Item has subcategories or types - make it clickable to navigate
                          <button
                            onClick={() => handleItemClick(item)}
                            className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition-colors"
                          >
                            <span className="text-gray-800 font-medium text-left">
                              {item.name}
                            </span>
                            <FiChevronRight className="text-gray-400 flex-shrink-0" />
                          </button>
                        ) : (
                          // Direct link
                          <Link
                            href={item.url}
                            onClick={onClose}
                            className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition-colors"
                          >
                            <span className="text-gray-800 font-medium text-left">
                              {item.name}
                            </span>
                          </Link>
                        )}
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        </div>

        {/* Footer with Cart */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <Link
            href="/cart"
            onClick={onClose}
            className="flex items-center justify-between p-3 bg-white rounded-md hover:bg-gray-100 transition-colors shadow-sm"
          >
            <div className="flex items-center gap-3">
              <FiShoppingCart className="text-2xl text-gray-600" />
              <span className="text-gray-800 font-medium">Cart</span>
            </div>
            {cartCount > 0 && (
              <span className="bg-[#007934] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNavSheet;
