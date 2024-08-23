import React from 'react';
import Widget from './Widget';
// import { useDispatch } from 'react-redux';
// import { searchWidgets } from '../redux/slice';

const Category = ({ category, onAddWidget }) => {
  // const dispatch = useDispatch();

  // const handleSearch = (e) => {
  //   dispatch(searchWidgets(e.target.value));
  // };

  return (
    <div className="mb-6">
      <h2 className="font-semibold text-lg mb-4">{category.name}</h2>
      {/* <input
        type="text"
        placeholder="Search widgets..."
        onChange={handleSearch}
        className="mb-4 p-2 border rounded w-full"
      /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {(category.filteredWidgets || category.widgets).map(widget => (
          <div key={widget.id} className="w-full h-64">
            <Widget widget={widget} categoryId={category.id} />
          </div>
        ))}
        <div className="w-full h-64">
          <div className="flex justify-center items-center border border-dashed p-4 rounded-2xl bg-white w-full h-full">
            <button
              onClick={() => onAddWidget(category.id)}
              className="px-4 py-2 text-gray-500 rounded-lg border"
            >
              + Add Widget
            </button>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Category;
