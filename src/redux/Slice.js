import { createSlice } from '@reduxjs/toolkit';
import data from '../data.json';

const initialState = {
  categories: data.categories,
  allWidgets: data.categories.flatMap(category => category.widgets),
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
     addWidget: (state, action) => {
      const { categoryId, widgetId, name, text, chartType, position } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);

      if (widgetId) {
        // Find and update existing widget
        const existingWidget = category.widgets.find(widget => widget.id === widgetId);
        if (existingWidget) {
          existingWidget.name = name;
          existingWidget.text = text;
          existingWidget.chartType = chartType || existingWidget.chartType;
        } else {
          // Add new widget at the specified position
          const newWidget = { id: widgetId, name, text, chartType };
          if (position !== undefined) {
            category.widgets.splice(position, 0, newWidget); // Insert at specific position
          } else {
            category.widgets.push(newWidget); // If no position is specified, append at the end
          }
        }
      } else {
        // Create a new widget if no widgetId is provided
        const newWidget = { id: Date.now().toString(), name, text, chartType: chartType || "DefaultChartType" };
        category.widgets.push(newWidget);
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      const widgetIndex = category.widgets.findIndex(widget => widget.id === widgetId);
      
      if (widgetIndex > -1) {
        category.widgets.splice(widgetIndex, 1); // Remove the widget from its position
      }
    },
  },
});

export const { addWidget, removeWidget, searchWidgets } = dashboardSlice.actions;
export default dashboardSlice.reducer;
