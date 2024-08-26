import React from 'react';

const MultiColorProgressBar = () => {
  const data = [
    { name: 'Critical', value: 25, color: '#5578FF' },
    { name: 'High', value: 15, color: '#E1EBFF' },
    { name: 'Medium', value: 35, color: '#FFAA00' },
    { name: 'Low', value: 25, color: '#FF5733' }, 
  ];

  const total = data.reduce((acc, segment) => acc + segment.value, 0);

  return (
    <div className="w-full h-8 mb-auto mt-2">
      <div className='flex items-center  mb-4'>
      <span className=' font-medium'>{total}</span>
      <p className='ml-2 text-sm'>Total Vulnerabilities</p>
      </div>
      <div className="relative mb-2 w-full h-4 bg-gray-200 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex">
          {data.map((segment, index) => {
            const widthPercentage = (segment.value / total) * 100;

            return (
              <div
                key={index}
                style={{
                  backgroundColor: segment.color,
                  width: `${widthPercentage}%`,
                }}
                className={`h-full ${index > 0 ? '-ml-1' : ''}`} 
              />
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5 text-sm ">
        {data.map((segment, index) => (
          <div key={index} className="flex items-center justify-center">
            <div
              className="w-3 h-3 mr-2 rounded"
              style={{ backgroundColor: segment.color }}
            ></div>
            <span>{`${segment.name} (${segment.value})`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiColorProgressBar;
