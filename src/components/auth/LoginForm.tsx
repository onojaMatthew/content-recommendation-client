
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { login } from '../../store/slices/authSlice';
import Link from 'next/link';
import LoadingSpinner from '../common/Spinner';
import { LoginCredentials } from '@/types';
import { useAppDispatch, useAppSelector } from '../../types/storeType';

const LoginForm = () => {
  const { loading, success } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { handleSubmit, watch, register, control, setValue, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onHandleSubmit = async (data: LoginCredentials) => {
    try {

      dispatch(login(data));
    } catch (error: any) {
      console.log(error.message)
    }
   
  };

  // useEffect(() => {
  //   if (success) {
  //     router.push("/dashboard");
  //   }
  // }, [ success ]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              href="/register"
              className="font-medium text-gray-900 hover:text-secondary"
            >
              create a new account
            </Link>
          </p>
        </div>
      
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onHandleSubmit)}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm space-y-4">
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
                placeholder="Email address"
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
                autoComplete="current-password"
                
                {...register("password",{ required: "Station name field is required"})}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors?.password?.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/auth/forgot-password"
                className="font-medium text-primary hover:text-secondary"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="text-gray-900 hover:bg-gray-900 w-full hover:text-white hover:cursor-pointer py-2 border-1 border-gray-600 rounded"
            >
              {loading ? <LoadingSpinner /> : "Log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;