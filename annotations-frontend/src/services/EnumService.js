import React, { useState, useEffect, useContext, useReducer, createContext } from "react";

import { BASE_API_URL } from "./Common";

const axios = require('axios');

// Create an Enum Context
const EnumContext = createContext();

// Hook for child components
export const useEnumContext = () => {
    return useContext(EnumContext);
};

// Enum Context Provider 
export function EnumContextProvider({ children }) {
    console.log("================================== EnumContextProvider ======================================");

    const [enums, setEnums] = useState(null)

    // Setup Provider
    useEffect(() => {
        EnumService.GetEnums()
            .then(function (response) {
                console.log(response.data);
                setEnums(response.data);
            })

    }, []);

    return <EnumContext.Provider value={enums}>{enums && children}</EnumContext.Provider>;
}

const EnumService = {
    GetEnums: async function () {
        return await axios.get(BASE_API_URL + "/enums");
    }
}
