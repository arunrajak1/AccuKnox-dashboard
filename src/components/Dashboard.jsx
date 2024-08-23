import React, { useState } from 'react';
import Category from './Category';
import AddWidgetModal from './AddWidgetModal';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const categories = useSelector((state) => state.dashboard.categories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleAddWidget = (categoryId) => {
    setCurrentCategory(categoryId);
    setIsModalOpen(true);
  };

  const getExistingWidgets = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.widgets : [];
  };

  return (
    <div className="p-6">
      {categories.map(category => (
        <Category key={category.id} category={category} onAddWidget={handleAddWidget} />
      ))}
      {isModalOpen && currentCategory !== null && (
        <AddWidgetModal
          categoryId={currentCategory}
          existingWidgets={getExistingWidgets(currentCategory)} 
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
