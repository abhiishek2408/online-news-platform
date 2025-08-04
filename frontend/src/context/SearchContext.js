
import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [keyword, setKeyword] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(false);

  const handleSearch = () => {
    setTriggerSearch(prev => !prev);
  };

  return (
    <SearchContext.Provider value={{ keyword, setKeyword, triggerSearch, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
