'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AddPlayerContextType {
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

const AddPlayerContext = createContext<AddPlayerContextType | undefined>(undefined);

export function useAddPlayer() {
    const context = useContext(AddPlayerContext);
    if (!context) {
        throw new Error("useAddPlayer must be used within a AddPlayerProvider");
    }
    return context;
}

export function AddPlayerProvider({ children }: { children: ReactNode }) {
    const [inputName, setInputName] = useState('');
    const [nameList, setNameList] = useState<string[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState('');
    const [editNameIndex, setEditNameIndex] = useState<number | null>(null);
    const [isSameName, setIsSameName] = useState(false);

    return (
        <AddPlayerContext.Provider value={{
            inputName, nameList, isEditing, editName, editNameIndex, isSameName,
            setInputName, setNameList, setIsEditing, setEditName, setEditNameIndex, setIsSameName
        }}>
            {children}
        </AddPlayerContext.Provider>
    );
}

