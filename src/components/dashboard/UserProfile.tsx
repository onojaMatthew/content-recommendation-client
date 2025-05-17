import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../types/storeType';
import { updateUserProfile } from '../../store/slices/userSlice';
import { UserProfileUpdate } from '../../types/user';
import LoadingSpinner from '../common/Spinner';
import ErrorMessage from '../common/ErrorMessage';

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.user.profile);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  const [formData, setFormData] = useState<UserProfileUpdate>({
    name: '',
    avatar: '',
  });

  // Initialize form with current profile data
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        avatar: profile.avatar || '',
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(updateUserProfile(formData));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile Information</h2>
      
      {error && <ErrorMessage message={error} className="mb-4" />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
            Avatar URL
          </label>
          <input
            type="url"
            name="avatar"
            id="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        {formData.avatar && (
          <div className="flex items-center">
            <div className="mr-4">Preview:</div>
            <img 
              src={formData.avatar} 
              alt="Avatar preview" 
              className="h-16 w-16 rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {loading ? <LoadingSpinner size="sm" /> : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;