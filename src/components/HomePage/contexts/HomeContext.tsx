'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HomeContextType {
    inputName: string;
    nameList: string[];
    isEditing: boolean;
    editName: string;
    editNameIndex: number | null;
    isSameName: boolean;

    setInputName: (value: string) => void;
    setNameList: (value: string[]) => void;
    setIsEditing: (value: boolean) => void;
    setEditName: (value: string) => void;
    setEditNameIndex: (value: number | null) => void;
    setIsSameName: (value: boolean) => void;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export function useHome() {
    const context = useContext(HomeContext);
    if (!context) {
        throw new Error("useHome must be used within a HomeProvider");
    }
    return context;
}

export function HomeProvider({ children }: { children: ReactNode }) {
    const [inputName, setInputName] = useState('');
    const [nameList, setNameList] = useState<string[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState('');
    const [editNameIndex, setEditNameIndex] = useState<number | null>(null);
    const [isSameName, setIsSameName] = useState(false);

    return (
        <HomeContext.Provider value={{
            inputName, nameList, isEditing, editName, editNameIndex, isSameName,
            setInputName, setNameList, setIsEditing, setEditName, setEditNameIndex, setIsSameName
        }}>
            {children}
        </HomeContext.Provider>
    );
}

