import React from 'react';
import { Link } from 'react-router-dom';

const GNB = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 mb-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          기말 프로젝트
        </Link>
        <div className="flex flex-wrap gap-2">
          {[...Array(16)].map((_, i) => (
            <Link 
              key={i + 1}
              to={`/${i + 1}`} 
              className="hover:text-gray-300 px-3 py-1 bg-gray-700 rounded"
            >
              {i + 1}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default GNB;
