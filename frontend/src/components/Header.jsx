import { Heart } from 'lucide-react';

const Header = () => {
  return (
    <header className='bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg'>
              <Heart className='w-5 h-5 text-white fill-current' />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>Wishlist App</h1>
              <p className='text-sm text-gray-600'>Organize your dreams</p>
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            <span className='hidden sm:block text-sm text-gray-600'>
              Kelas Praktisi Modern Web
            </span>
            <span className='text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full'>
              Vite + React
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
