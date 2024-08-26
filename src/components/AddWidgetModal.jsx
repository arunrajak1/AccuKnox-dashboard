import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addWidget, removeWidget } from "../redux/Slice";
import data from "../data.json";
import { Link } from "react-router-dom";
const AddWidgetModal = ({ closeModal, existingWidgets = [] }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [selectedWidgets, setSelectedWidgets] = useState(new Set(existingWidgets.map(widget => widget.id)));
  const [selectedCategoryId, setSelectedCategoryId] = useState(data.categories[0].id);
  const categories = data.categories;
  const dispatch = useDispatch();

  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  );

  useEffect(() => {
    if (selectedCategory) {
      setSelectedWidgets(prevSelected => {
        const newSelectedWidgets = new Set(prevSelected);
        selectedCategory.widgets.forEach(widget => {
          if (!prevSelected.has(widget.id)) {
            newSelectedWidgets.add(widget.id);
          }
        });
        return newSelectedWidgets;
      });
    }
  }, [selectedCategoryId, selectedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && text) {
      const existingWidget = selectedCategory.widgets.find(w => w.name === name);
      const position = selectedCategory.widgets.findIndex(w => w.id === existingWidget?.id);

      dispatch(addWidget({
        categoryId: selectedCategoryId,
        widgetId: existingWidget ? existingWidget.id : null,
        name,
        text,
        chartType: existingWidget ? existingWidget.chartType : "DefaultChartType",
        position: existingWidget ? position : undefined, // Pass position only if it's an existing widget
      }));

      setName("");
      setText("");
    }

    existingWidgets.forEach((widget) => {
      if (!selectedWidgets.has(widget.id)) {
        dispatch(removeWidget({ categoryId: selectedCategoryId, widgetId: widget.id }));
      }
    });

    closeModal();
  };

  const handleCheckboxChange = (widgetId) => {
    setSelectedWidgets(prev => {
      const newSelectedWidgets = new Set(prev);
      if (newSelectedWidgets.has(widgetId)) {
        newSelectedWidgets.delete(widgetId);
        // Schedule a dispatch for removal after the state is updated
        setTimeout(() => {
          dispatch(removeWidget({ categoryId: selectedCategoryId, widgetId }));
        }, 0);
      } else {
        newSelectedWidgets.add(widgetId);
        const widget = selectedCategory.widgets.find(w => w.id === widgetId);
        if (widget) {
          const position = selectedCategory.widgets.findIndex(w => w.id === widgetId);
          // Schedule a dispatch for addition after the state is updated
          setTimeout(() => {
            dispatch(addWidget({
              categoryId: selectedCategoryId,
              widgetId: widget.id,
              name: widget.name,
              text: widget.text,
              chartType: widget.chartType,
              position, // Pass the position where it was removed
            }));
          }, 0);
        }
      }
      return newSelectedWidgets;
    });
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };


  return (
    <div className="fixed inset-0 flex justify-end bg-black bg-opacity-50">
      <div className="bg-white rounded shadow-md w-1/2 h-full flex flex-col relative">
        <h2 className="text-base text-white px-4 py-2 w-full bg-blue-900">
          Add New Widget
        </h2>
        <button
          onClick={() => closeModal()}
          className="absolute top-2 right-2 text-2xl text-white"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col flex-grow">
          <div className="mb-4">
            <h4 className="text-base mb-2">
              Personalise your dashboard by adding the following widgets
            </h4>
            <ul className="flex gap-4 m-2">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className={`cursor-pointer ${
                    category.id === selectedCategoryId
                      ? "font-bold text-blue-900"
                      : ""
                  }`}
                >
                  <Link
                    to="#"
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.id}
                  </Link>
                </li>
              ))}
            </ul>
            {selectedCategory && selectedCategory.widgets.length > 0 ? (
              selectedCategory.widgets.map((widget) => (
                <div
                  key={widget.id}
                  className="mb-2 border border-blue-900 py-1 rounded"
                >
                  <label className="flex items-center font-medium">
                    <input
                      type="checkbox"
                      checked={selectedWidgets.has(widget.id)}
                      onChange={() => handleCheckboxChange(widget.id)}
                      className="mr-2 ml-2"
                    />
                    <span className="text-blue-900 font-semibold">{widget.name}</span>
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
