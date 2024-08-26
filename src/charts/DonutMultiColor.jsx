import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Label,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DonutMultiColor = () => {
  const data = [
    { name: "Failed", value: 1689 },
    { name: "Warning", value: 68 },
    { name: "Not available", value: 36 },
    { name: "Passed", value: 7253 },
  ];

  const COLORS = ["#C23632", "#FAD732", "#C8CDDC", "#19A55A"];

  const totalValue = data.reduce((a, b) => a + b.value, 0);

  return (
    <div className="w-full h-full flex flex-col md:flex-col  lg:flex-row justify-evenly overflow-y-auto ">
      <div className="w-full  lg:w-48 h-full ">
        <ResponsiveContainer width="100%" height="100%" minHeight={165}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="50%"
              outerRadius="80%"
              startAngle={90}
              endAngle={450}
              fill="#8884d8"
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <Label
                value={`Total: ${totalValue}`}
                position="center"
                className="text-center"
                style={{
                  fontSize: "calc(0.8rem)",
                  fontWeight: "bold",
                  fill: "#333",
                }}
              />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full lg:w-auto text-xs font-sans grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:flex lg:flex-col lg:items-start lg:justify-center lg:space-y-2">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center justify-start sm:justify-start md:justify-start lg:justify-center">
            <div
              className="w-3 h-3 mr-2 rounded"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span className="text-nowrap">{`${entry.name} (${entry.value})`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutMultiColor;
