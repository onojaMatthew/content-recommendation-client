import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../types/storeType';
import { setFilters } from '../../store/slices/recommendationSlice';
import { UserPreferences } from '../../types/user';
import { FaRegStar, FaStar } from 'react-icons/fa';

const Filters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentFilters = useSelector((state: RootState) => state.recommendations.filters);
  const preferences = useSelector((state: RootState) => state.user.profile?.preferences);
  
  const [filters, setLocalFilters] = useState({
    categories: currentFilters.categories || [],
    priceRange: currentFilters.priceRange || [0, 1000],
    rating: currentFilters.rating || 0,
  });

  // Initialize with user preferences if available
  useEffect(() => {
    if (preferences) {
      setLocalFilters({
        categories: preferences.categories || [],
        priceRange: [
          preferences.budget?.min ?? 0,
          preferences.budget?.max ?? 1000
        ],
        rating: 0,
      });
    }
  }, [preferences]);


  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    setLocalFilters({ ...filters, categories: newCategories });
  };

  const handlePriceChange = (index: number, value: number) => {
    const newPriceRange = [...filters.priceRange] as [number, number];
    newPriceRange[index] = value;
    setLocalFilters({ ...filters, priceRange: newPriceRange });
  };

  const handleRatingChange = (rating: number) => {
    setLocalFilters({ ...filters, rating });
  };

  const applyFilters = () => {
    dispatch(setFilters(filters));
  };

  const resetFilters = () => {
    const defaultFilters = {
      categories: preferences?.categories || [],
      priceRange: [
        preferences?.budget?.min ?? 0,
        preferences?.budget?.max ?? 1000
      ] as [number, number],
      rating: 0,
    };
    setLocalFilters(defaultFilters);
    dispatch(setFilters(defaultFilters));
  };


  // Available categories from preferences or default set
  const availableCategories = preferences?.categories || [
    'CRM', 'Marketing', 'Sales', 'HR', 'Finance', 'Project Management'
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-medium text-lg mb-4">Filters</h3>
      
      {/* Categories Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
        <div className="space-y-2">
          {availableCategories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                id={`filter-category-${category}`}
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={`filter-category-${category}`} className="ml-3 text-sm text-gray-600">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">${filters.priceRange[0]}</span>
          <span className="text-sm text-gray-500">${filters.priceRange[1]}</span>
        </div>
        <div className="flex space-x-4">
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.priceRange[0]}
            onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Minimum Rating</h4>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingChange(star)}
              className={`p-1 rounded ${filters.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              {filters.rating >= star ? (
                <FaStar className="h-5 w-5" />
              ) : (
                <FaRegStar className="h-5 w-5" />
              )}
            </button>
          ))}
          {filters.rating > 0 && (
            <button
              type="button"
              onClick={() => handleRatingChange(0)}
              className="ml-2 text-sm text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={applyFilters}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md text-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filters;