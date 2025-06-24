import vehicleData from '@/data/vehicleData.json';
import navLinks from '@/data/navLinks.json';

export interface Type {
  id: number;
  name: string;
  url: string;
}

export interface Subcategory {
  id: number;
  name: string;
  url: string;
  types: Type[];
  isDynamic?: boolean;
}

export interface DropdownItem {
  id: number;
  name: string;
  url: string;
  hasDropdown: boolean;
  isDynamic?: boolean;
  subcategories?: Subcategory[];
}

// Function to categorize vehicle types into logical subcategories
const categorizeTypes = (types: string[]): { [key: string]: string[] } => {
  const categories: { [key: string]: string[] } = {
    'Tow Trucks': [],
    'Commercial Trucks': [],
    'Parts & Accessories': [],
  };

  types.forEach((type) => {
    // Tow Trucks category
    if (
      type.toLowerCase().includes('tow') ||
      type.toLowerCase().includes('wrecker') ||
      type.toLowerCase().includes('rollback') ||
      type.toLowerCase().includes('rotator')
    ) {
      categories['Tow Trucks'].push(type);
    }
    // Commercial Trucks category
    else if (
      type.toLowerCase().includes('sleeper') ||
      type.toLowerCase().includes('axle') ||
      type.toLowerCase().includes('truck')
    ) {
      categories['Commercial Trucks'].push(type);
    }
    // Parts & Accessories category
    else {
      categories['Parts & Accessories'].push(type);
    }
  });

  // Remove empty categories
  Object.keys(categories).forEach((key) => {
    if (categories[key].length === 0) {
      delete categories[key];
    }
  });

  return categories;
};

// Generate dynamic dropdown data from vehicle data
export const generateDynamicDropdownData = (): DropdownItem[] => {
  // Get unique types from vehicle data
  const uniqueTypes = Array.from(
    new Set(vehicleData.map((vehicle) => vehicle.type)),
  ).filter(Boolean);

  // Categorize types
  const categorizedTypes = categorizeTypes(uniqueTypes);

  // Convert to dropdown structure
  const subcategories: Subcategory[] = [
    // Add "All Trucks" as the first option
    {
      id: 1,
      name: 'All Trucks',
      url: '/inventory',
      types: [],
      isDynamic: true,
    },
    // Add categorized subcategories
    ...Object.entries(categorizedTypes).map(
      ([categoryName, types], categoryIndex) => {
        return {
          id: categoryIndex + 2, // Start from 2 since "All Trucks" is 1
          name: categoryName,
          url: `/inventory?category=${encodeURIComponent(categoryName)}`,
          types: types.map((type, typeIndex) => ({
            id: (categoryIndex + 1) * 100 + typeIndex + 1,
            name: type,
            url: `/inventory?type=${encodeURIComponent(type)}`,
            isDynamic: true,
          })),
          isDynamic: true,
        };
      },
    ),
  ];

  return [
    {
      id: 1,
      name: 'Trucks',
      url: '/inventory',
      hasDropdown: true,
      isDynamic: true,
      subcategories,
    },
  ];
};

// Get dropdown item by name
export const getDropdownItemByName = (
  name: string,
): DropdownItem | undefined => {
  if (name === 'Trucks') {
    const dropdownData = generateDynamicDropdownData();
    return dropdownData.find((item) => item.name === name);
  }
  // For static dropdowns (like Shop Our Product)
  const navItem = navLinks.find(
    (item: any) => item.name === name && item.subcategories,
  );
  if (navItem && Array.isArray(navItem.subcategories)) {
    return {
      id: navItem.id,
      name: navItem.name,
      url: navItem.url,
      hasDropdown: true,
      subcategories: navItem.subcategories.map((sub: any) => ({
        ...sub,
        types: sub.types || [], // Ensure 'types' property exists
        isDynamic: true,
      })),
      isDynamic: true,
    };
  }
  return undefined;
};
