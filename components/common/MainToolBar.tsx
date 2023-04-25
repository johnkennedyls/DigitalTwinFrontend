// components/Toolbar.tsx
import React from 'react';
import { client } from 'next/client';

const Toolbar: React.FC = () => {
  return (
    <div className="bg-blue-500 py-2 px-4 flex items-center justify-between">
      <h1 className="text-white font-bold text-xl">BioPilot Dashboard</h1>
      <div className="flex space-x-2">
        <button
          onClick={() => client.console.log('Help button clicked')}
          className="bg-blue-700 text-white py-2 px-4 rounded"
        >
          Help
        </button>
        <button
          onClick={() => client.console.log('Notifications button clicked')}
          className="bg-blue-700 text-white py-2 px-4 rounded"
        >
          Notifications
        </button>
        <button
          onClick={() => client.console.log('Logout button clicked')}
          className="bg-blue-700 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
