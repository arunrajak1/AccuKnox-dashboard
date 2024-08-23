import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './Slice';

export const Store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});
