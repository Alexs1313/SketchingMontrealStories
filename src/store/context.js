import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const ContextProvider = ({ children }) => {
  const [savedTips, setSavedTips] = useState([]);
  const [savedDrawings, setSavedDrawings] = useState([]);

  const value = {
    savedDrawings,
    setSavedDrawings,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
