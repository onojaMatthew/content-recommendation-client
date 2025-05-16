
import { useForm } from 'react-hook-form';
import { signup } from '../../store/slices/authSlice';
import Link from 'next/link';
import LoadingSpinner from '../common/Spinner';
import { useAppDispatch, useAppSelector } from '@/types/storeType';
import { RegisterCredentials } from '@/types';

const RegisterForm = () => {
  const { loading } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const { handleSubmit, watch, register, control, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      businessName: ""
    }
  });


  const onHandleSubmit = async (data: RegisterCredentials) => {
    try {
      dispatch(signup(data));
    } catch (error:any) {
      console.log(error.message)
    } finally {
      
    }
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              href="/auth/login"
              className="font-medium text-primary hover:text-secondary"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="email"
                type="text"
                {...register("name", { required: "Name field is required"})}
                autoComplete="name"
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                placeholder="Tosin Ayegbami"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors?.name?.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...register("email",{ required: "Station name field is required"})}
                autoComplete="email"
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                placeholder="tosin@gmail.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors?.email?.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password",{ required: "Station name field is required"})}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors?.password?.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="businessName" className="sr-only">
                Business name
              </label>
              <input
                id="businessName"
                type="text"
                {...register("businessName",{ required: "Business name is required"})}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                placeholder="Business name"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors?.businessName?.message}</p>
              )}
            </div>
          </div>
            
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <Link
                href="/terms"
                className="font-medium text-primary hover:text-secondary"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="font-medium text-primary hover:text-secondary"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="text-gray-900 hover:bg-gray-900 w-full hover:text-white hover:cursor-pointer py-2 border-1 border-gray-600 rounded"
            >
              {loading ? <LoadingSpinner /> : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;