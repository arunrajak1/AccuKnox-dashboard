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
      const { categoryId, name, text } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      const newWidget = { id: Date.now(), name, text };
      if (category) {
        category.widgets.push(newWidget);
      }
     },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
    },
    searchWidgets: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.categories.forEach(category => {
        category.filteredWidgets = category.widgets.filter(widget =>
          widget.name.toLowerCase().includes(searchTerm)
        );
      });
    },
  },
});

export const { addWidget, removeWidget, searchWidgets } = dashboardSlice.actions;
export default dashboardSlice.reducer;
