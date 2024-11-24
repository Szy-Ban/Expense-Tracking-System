'use client';

import { createContext, useContext, useState, useEffect } from "react";
import Data from "../../data/history.json";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [charges, setCharges] = useState([]);
    const [hiddenCharges, setHiddenCharges] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Wszystkie");

    useEffect(() => {
        try {
            setCharges(Data);
        } catch (error) {
            console.error("Błąd ładowania danych:", error);
        }
    }, []);


    const addCharge = (newCharge) => {
        setCharges([...charges, { ...newCharge, id: Date.now() }]);
    };

    const hideCharge = (id) => setHiddenCharges([...hiddenCharges, id]);

    const visibleCharges = charges.filter((charge) => !hiddenCharges.includes(charge.id));
    const filteredCharges = selectedCategory === "Wszystkie"
        ? visibleCharges
        : visibleCharges.filter((charge) => charge.category === selectedCategory);

    const categories = ["Wszystkie", ...new Set(charges.map((charge) => charge.category))];

    const updateCharge = (updatedCharge) => {
        setCharges((prevCharges) =>
            prevCharges.map((charge) => (charge.id === updatedCharge.id ? updatedCharge : charge))
        );
    };


    return (
        <GlobalContext.Provider
            value={{
                filteredCharges,
                categories,
                selectedCategory,
                setSelectedCategory,
                addCharge,
                hideCharge,
                updateCharge,
            }}
        >
            {children}
        </GlobalContext.Provider>

    );
};

export const useGlobalContext = () => useContext(GlobalContext);

