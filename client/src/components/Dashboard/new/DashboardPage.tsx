import { useState } from 'react';
import Sidebar from './Sidebar';
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';
import ContentList from './ContentList';
import ContentForm from './ContentForm';

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState('categoryList');

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
    <div className="flex h-screen bg-gray-100">
      <Sidebar setCurrentView={setCurrentView} currentView={currentView} />
      <main className="flex-1 overflow-y-auto p-6">
        {renderContent()}
      </main>
    </div>
  );
};

