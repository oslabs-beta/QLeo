import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import lion from '../assets/Lion100px.svg';

const navItems = [
  {
    title: 'Upload',
    path: '/upload',
  },
  {
    title: 'Dashboard',
    path: '/dashboard'
  }, 
  {
    title: 'Performance',
    path: '/performance'
  }
];


function NavBar() {
  const { pathname } = useLocation();

  return (
    <div>
      <nav className="border-b border-2 border-bg-gray">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <header className='m-1'>
                 QLEO
                </header>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {
                    navItems.map((item, idx) => {
                      let basicStyle = 'text-secondary text-secondary px-3 py-2 text-lg font-medium';

                      if (idx === 0) {
                        basicStyle += ' border-r rounded-none border-bg-gray';
                      }

                      if (item.path === pathname) {
                        basicStyle += ' border-b border-primary rounded-none';
                      }
                  
                      return (
                        <Link
                          key={idx}
                          to={item.path}
                          className={basicStyle}
                        >
                          {item.title}
                        </Link>
                      );
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;