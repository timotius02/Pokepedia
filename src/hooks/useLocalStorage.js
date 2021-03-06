import { useState, useEffect } from "react";

/*
Adds values to LocalStorage
Current Schema:
{
  myPokemon: [{
    { 
      name: String, 
      id: number, 
      types: [String], 
      nickname: String, 
      image: String 
    }
  }],
  firstTimeOpen: bool
}
*/
function getStorageValue(key, defaultValue) {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    const initial = saved !== null ? JSON.parse(saved) : defaultValue;
    return initial;
  }

  // can't find local storage during next build
  return defaultValue;
}

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
