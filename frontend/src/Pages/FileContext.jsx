import React from "react";
import { useState,createContext} from "react";

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
    const [file, setFile] = useState("");

    return (
        <FileContext.Provider value={{ file, setFile }}>
            {children}
        </FileContext.Provider>
    );
};