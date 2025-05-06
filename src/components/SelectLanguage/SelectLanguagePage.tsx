import React from 'react'
import SelectLangCard from './SelectLangComponents/SelectLangCard'
import { SelectLanguageProvider } from './contexts/SelectLanguageContext';

const SelectLanguage = () => {
  return (
    <SelectLanguageProvider>
      <div className="flex flex-col items-center">
        <SelectLangCard />
      </div>
    </SelectLanguageProvider>
  );
}

export default SelectLanguage
