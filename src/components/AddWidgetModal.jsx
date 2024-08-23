import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addWidget, removeWidget } from '../redux/Slice';

const AddWidgetModal = ({ categoryId, closeModal, existingWidgets = [] }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [selectedWidgets, setSelectedWidgets] = useState(new Set());

  const dispatch = useDispatch();

  // useEffect(() => {
  //   setSelectedWidgets(new Set(existingWidgets.map(widget => widget.id)));
  // }, [existingWidgets]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add new widget
    if (name && text) {
      dispatch(addWidget({ categoryId, name, text }));
      setName(''); // Reset name field
      setText(''); // Reset text field
    }

    // Remove unselected widgets
    existingWidgets.forEach(widget => {
      if (!selectedWidgets.has(widget.id)) {
        dispatch(removeWidget({ categoryId, widgetId: widget.id }));
      }
    });

    closeModal();
  };

  const handleCheckboxChange = (widgetId) => {
    setSelectedWidgets(prev => {
      const newSelectedWidgets = new Set(prev);
      if (newSelectedWidgets.has(widgetId)) {
        newSelectedWidgets.delete(widgetId);
      } else {
        newSelectedWidgets.add(widgetId);
      }
      return newSelectedWidgets;
    });
  };

  return (
    <div className="fixed inset-0 flex justify-end bg-black bg-opacity-50">
      <div className="bg-white rounded shadow-md w-1/2 h-full flex flex-col relative">
        <h2 className="text-base text-white px-4 py-2 w-full bg-blue-900">Add New Widget</h2>
        <button
          onClick={() => closeModal()}
          className="absolute top-2 right-2 text-2xl text-white"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col flex-grow">
          <div className="mb-4">
            <h4 className="text-base mb-2">Personalise your dashboard by adding the following widgets</h4>
            {existingWidgets.length > 0 ? (
              existingWidgets.map((widget) => (
                <div key={widget.id} className="mb-2 border py-1 rounded">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedWidgets.has(widget.id)}
                      onChange={() => handleCheckboxChange(widget.id)}
                      className="mr-2 ml-2"
                    />
                    {widget.name}
                  </label>
                </div>
              ))
            ) : (
              <p>No widgets available.</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Widget Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4 flex-grow">
            <label className="block mb-2">Widget Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="p-2 border rounded w-full h-32"
            ></textarea>
          </div>
          <div className="flex justify-end items-end mt-auto">
            <button
              type="button"
              onClick={closeModal}
              className="px-2 py-2 sm:px-2 sm:py-2 md:py-4 md:px-2 lg:px-4 lg:py-2 bg-transparent text-blue-800 rounded-lg border mr-2 border-blue-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-2 py-2 sm:px-2 sm:py-2 md:py-4 md:px-2 lg:px-4 lg:py-2 bg-blue-900 text-white rounded-lg"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWidgetModal;
