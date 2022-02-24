import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import lion from '../assets/q-logo.png';

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
    <nav className="px-10 pt-3 flex items-center border border-b border-bg-mirror">
      <header className="text-lg tracking-wider pr-10 mr-10 border-r border-bg-mirror">QLEO</header>
      <div className="flex space-x-4">

        {navItems.map((item, idx) => {
          let basicStyle = 'px-2 py-6 tracking-wide hover:text-primary';
          if (item.path === pathname) {
            basicStyle += ' border-b-4 border-primary rounded-none text-text-primary';
          }

          return (
            <Link
              key={idx}
              to={item.path}
              className={basicStyle}>
              {item.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default NavBar;