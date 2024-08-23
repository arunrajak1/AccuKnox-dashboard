import React, { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { LuRefreshCcw } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { searchWidgets } from "./redux/Slice";
import AddWidgetModal from "./components/AddWidgetModal";


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(searchWidgets(e.target.value));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-custom-gray p-6">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold text-start ml-6">CNAPP Dashboard</h1>
        <div>
          <input
            type="text"
            placeholder="Search widgets..."
            onChange={handleSearch}
            className="mb-4 p-2 border-blue-800 rounded-lg  mr-2"
          />
          <button
            className="px-4 py-2 text-gray-500 rounded-lg border bg-white"
            onClick={() => setIsModalOpen(true)} // Open modal
          >
            Add Widget +
          </button>

          <button className="px-2 py-2 bg-white ml-2 rounded-md">
            <span>
              <LuRefreshCcw />
            </span>
          </button>
          <button className="px-2 py-2 bg-white ml-2 rounded-md">
            <span>
              <BsThreeDotsVertical />
            </span>
          </button>
        </div>
      </div>
      <Dashboard />
      {isModalOpen && (
        <AddWidgetModal
          categoryId={selectedCategoryId}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default App;
