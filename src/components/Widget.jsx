import React from 'react';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../redux/Slice';
import DonutChart from './../charts/DonutChart'; 
import DonutMultiColor from '../charts/DonutMultiColor';
import { GiProgression } from 'react-icons/gi'; 
import StackedBarChart from '../charts/StackedBarChart';

const Widget = ({ widget, categoryId }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ categoryId, widgetId: widget.id }));
  };

  const renderChart = () => {
  
    switch (widget.chartType) {
      case 'DonutChart':
        return <DonutChart data={widget.data} />;
      case 'DonutMultiColor':
        return <DonutMultiColor data={widget.data} />;
      case 'StackedBarChart':
        return <StackedBarChart data={widget.data} />;  
      default:
        return (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <GiProgression size={50} color="#ccc" /> 
            <p className="mt-2 text-gray-500">No graph data available !</p>
          </div>
        );
    }
  };

  return (
    <div className="p-4 border rounded-2xl relative bg-white w-full h-full flex flex-col justify-between ">
      <button
        onClick={handleRemove}
        className="absolute text-2xl top-2 right-2 text-red-500"
      >
        &times;
      </button>
      <h3 className="text-base font-semibold text-wrap sm:text-sm md:text-base  lg:text-base">{widget.name}</h3>
      <p className="">{widget.text}</p> 
      <div className="flex-grow flex items-center justify-center">
        {renderChart()}
      </div>
    </div>
  );
};

export default Widget;
