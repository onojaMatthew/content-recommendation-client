import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../types/storeType';
import { updateUserPreferences } from '../../store/slices/userSlice';
import { UserPreferences } from '../../types/user';
import LoadingSpinner from '../common/Spinner';
import ErrorMessage from '../common/ErrorMessage';

const Preferences = () => {
  const dispatch = useDispatch<AppDispatch>();
  const preferences = useSelector((state: RootState) => state.user.profile?.preferences);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  const [formData, setFormData] = useState<UserPreferences>({
    budget: { min: 0, max: 1000 },
    categories: [],
    mustHaveFeatures: [],
    deployment: 'cloud',
    teamSize: 'small-team',
  });

  // Initialize form with current preferences
  useEffect(() => {
    if (preferences) {
      setFormData({
        budget: preferences.budget || { min: 0, max: 1000 },
        categories: preferences.categories || [],
        mustHaveFeatures: preferences.mustHaveFeatures || [],
        deployment: preferences.deployment || 'cloud',
        teamSize: preferences.teamSize || 'small-team',
      });
    }
  }, [preferences]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'budgetMin' || name === 'budgetMax') {
      setFormData({
        ...formData,
        budget: {
          ...formData.budget,
          [name === 'budgetMin' ? 'min' : 'max']: Number(value),
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    if (name === 'categories' || name === 'mustHaveFeatures') {
      setFormData({
        ...formData,
        [name]: checked
          ? [...formData[name as keyof UserPreferences] as string[], value]
          : (formData[name as keyof UserPreferences] as string[]).filter(item => item !== value),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(updateUserPreferences(formData));
  };

  const categories = ['CRM', 'Marketing', 'Sales', 'HR', 'Finance', 'Project Management'];
  const features = ['Mobile App', 'API Access', 'Analytics', 'Multi-user', 'Cloud Storage'];
  const deploymentOptions = ['cloud', 'self-hosted', 'hybrid'];
  const teamSizeOptions = ['individual', 'small-team', 'enterprise'];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recommendation Preferences</h2>
      
      {error && <ErrorMessage message={error} className="mb-4" />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Range (per month)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="budgetMin" className="block text-sm font-medium text-gray-700">
                Minimum
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="budgetMin"
                  id="budgetMin"
                  value={formData.budget?.min || 0}
                  onChange={handleChange}
                  className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  min="0"
                />
              </div>
            </div>
            <div>
              <label htmlFor="budgetMax" className="block text-sm font-medium text-gray-700">
                Maximum
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="budgetMax"
                  id="budgetMax"
                  value={formData.budget?.max || 1000}
                  onChange={handleChange}
                  className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((category) => (
              <div key={category} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={`category-${category}`}
                    name="categories"
                    type="checkbox"
                    value={category}
                    checked={formData.categories?.includes(category) || false}
                    onChange={handleCheckboxChange}
                    className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={`category-${category}`} className="font-medium text-gray-700">
                    {category}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Must-Have Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={`feature-${feature}`}
                    name="mustHaveFeatures"
                    type="checkbox"
                    value={feature}
                    checked={formData.mustHaveFeatures?.includes(feature) || false}
                    onChange={handleCheckboxChange}
                    className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={`feature-${feature}`} className="font-medium text-gray-700">
                    {feature}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Deployment Type</h3>
          <select
            id="deployment"
            name="deployment"
            value={formData.deployment}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          >
            {deploymentOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Team Size</h3>
          <select
            id="teamSize"
            name="teamSize"
            value={formData.teamSize}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          >
            {teamSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="text-gray-900 hover:bg-gray-900 w-full hover:text-white hover:cursor-pointer py-2 border-1 border-gray-600 rounded"
          >
            {loading ? <LoadingSpinner size="sm" /> : 'Save Preferences'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Preferences;