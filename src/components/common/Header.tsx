import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary hover:text-secondary transition-colors">
          SaaS Recommender
        </Link>
        
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6">
            <li>
              <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/recommendations" className="text-gray-700 hover:text-primary transition-colors">
                Recommendations
              </Link>
            </li>
            
            {user ? (
              <>
                <li>
                  <Link href="/dashboard" className="text-gray-700 hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button className="ml-4 px-4 py-2 bg-error text-white rounded-lg hover:bg-opacity-90 transition-colors">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/auth/login" className="text-gray-700 hover:text-primary transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/auth/register" 
                    className="ml-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-gray-700 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden bg-white py-2 px-4 shadow-md">
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="block py-2 text-gray-700 hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/recommendations" className="block py-2 text-gray-700 hover:text-primary">
                Recommendations
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link href="/dashboard" className="block py-2 text-gray-700 hover:text-primary">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button className="w-full text-left py-2 text-error hover:text-opacity-80">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/auth/login" className="block py-2 text-gray-700 hover:text-primary">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register" className="block py-2 text-primary hover:text-secondary">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;