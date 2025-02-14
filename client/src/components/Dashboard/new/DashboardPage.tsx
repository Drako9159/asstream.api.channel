import Sidebar from './Sidebar';
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';
import ContentList from './ContentList';
import ContentForm from './ContentForm';
import { useCurrentView } from '../../../store/current_view';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { UserIcon } from '@heroicons/react/16/solid';


export default function DashboardPage() {
  //const [currentView, setCurrentView] = useState('categoryList');

  const currentView = useCurrentView((state) => state.currentView);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'categoryList':
        return <CategoryList />;
      case 'categoryForm':
        return <CategoryForm />;
      case 'contentList':
        return <ContentList />;
      case 'contentForm':
        return <ContentForm />;
      default:
        return <CategoryList />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      <button
        className="absolute top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md cursor-pointer"
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      >
        {isSidebarVisible ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <UserIcon className="h-6 w-6" />
        )}
      </button>
      {isSidebarVisible && (
        <div className="fixed inset-0 z-40 flex mt-17">
          <div className="w-64 bg-white shadow-lg">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black opacity-50"
            onClick={() => setIsSidebarVisible(false)}
          ></div>
        </div>
      )}
      <main className="flex-1 flex-wrap overflow-y-auto p-6 bg-gray-100  mt-17">
        
          {renderContent()}
     
      </main>
    </div>
  );
};

