'use client'
import { createContext, useContext, useState, useEffect } from 'react';

type selectLanguageContextType = {  
    isTH: boolean;
    setIsTH: (value: boolean) => void;
} 

const SelectLanguageContext = createContext<selectLanguageContextType | undefined>(undefined);

export const SelectLanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [isTH, setIsTH] = useState(true);

    useEffect(() =>{
        localStorage.setItem("languageDataIsThai", JSON.stringify(isTH))
    }, []);

  return (
    <SelectLanguageContext.Provider
      value={{
        isTH,
        setIsTH,
      }}
    >
      {children}
    </SelectLanguageContext.Provider>
  );
};

export const useSelectLang = () => {
  const context = useContext(SelectLanguageContext);
  if (!context) throw new Error('useSelectLanguageContext must be used within a SelectLanguageProvider');
  return context;
};
