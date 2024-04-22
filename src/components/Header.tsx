import React from 'react';
import { HeaderDocument } from '../../prismicio-types';
import { PrismicLink } from '@prismicio/react';

const Header = (header: HeaderDocument) => {
  return (
    <header className="bg-white text-black">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-24 py-8">
        <div className="flex items-center justify-between">
          <div>
            <a href="/" className="flex items-center text-black no-underline">
              <span className="text-2xl font-bold">{header.data.company_name}</span>
            </a>          
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {
                header.data.links.map((link,index) =>
                  <li key={index}><PrismicLink field={link.link} className="hover:text-gray-600 transition-colors duration-300">{link.label}</PrismicLink></li>
                )
              }
            </ul>          
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header;