'use client';

import { createContext, useContext, useState, useEffect } from "react";
import Data from "../../data/history.json";
import ExpenseFetcher from "../chargesList/ExpenseFetcher"

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [charges, setCharges] = useState([]);
    const [hiddenCharges, setHiddenCharges] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Wszystkie");

    useEffect(() => {
        localStorage.setItem('charges', JSON.stringify(charges));
    }, [charges]);

    useEffect(() => {
        const savedCharges = localStorage.getItem('charges');
        if (savedCharges) {
            setCharges(JSON.parse(savedCharges));
        }
        // else {
        //     setCharges(Data);
        // }
    }, []);


    // useEffect(() => {
    //     try {
    //         setCharges(Data);
    //     } catch (error) {
    //         console.error("Błąd ładowania danych:", error);
    //     }
    // }, []);


    // const addCharge = (newCharge) => {
    //     setCharges([...charges, { ...newCharge, id: Date.now() }]);
    // };

    const [currentPage, setCurrentPage] = useState(1); // Aktualna strona
    const itemsPerPage = 4; // Liczba elementów na stronę

    // const visibleCharges = charges.slice(
    //     (currentPage - 1) * itemsPerPage,
    //     currentPage * itemsPerPage
    // );

    // Dodawanie nowego wydatku
    const addCharge = async (newCharge) => {
        try {
            const response = await fetch('http://localhost:5000/expenses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCharge),
            });
            if (!response.ok) {
                throw new Error('Błąd dodawania wydatku');
            }
            const createdCharge = await response.json();
            setCharges((prevCharges) => [...prevCharges, createdCharge]);
        } catch (error) {
            console.error('Błąd dodawania wydatku:', error);
        }
    };

    // Aktualizacja istniejącego wydatku
    const updateCharge = async (updatedCharge) => {
        try {
            const response = await fetch(`http://localhost:5000/expenses/${updatedCharge.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCharge),
            });
            if (!response.ok) {
                throw new Error('Błąd aktualizacji wydatku');
            }
            const updatedData = await response.json();
            setCharges((prevCharges) =>
                prevCharges.map((charge) =>
                    charge.id === updatedData.id ? updatedData : charge
                )
            );
        } catch (error) {
            console.error('Błąd aktualizacji wydatku:', error);
        }
    };

    // Usuwanie wydatku
    const deleteCharge = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/expenses/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Błąd usuwania wydatku');
            }
            setCharges((prevCharges) => prevCharges.filter((charge) => charge.id !== id));
        } catch (error) {
            console.error('Błąd usuwania wydatku:', error);
        }
    };

    const hideCharge = (id) => setHiddenCharges([...hiddenCharges, id]);

    // const visibleCharges = charges.filter((charge) => !hiddenCharges.includes(charge.id));
    const filteredCharges = selectedCategory === "Wszystkie"
        ? charges.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : charges
            .filter((charge) => charge.category === selectedCategory)
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    const categories = ["Wszystkie", ...new Set(charges.map((charge) => charge.category))];

    // const updateCharge = (updatedCharge) => {
    //     setCharges((prevCharges) =>
    //         prevCharges.map((charge) => (charge.id === updatedCharge.id ? updatedCharge : charge))
    //     );
    // };

    const filteredChargesLength = selectedCategory === "Wszystkie"
        ? charges.length
        : charges.filter((charge) => charge.category === selectedCategory).length;

    const totalPages = Math.ceil(filteredChargesLength / itemsPerPage);


    return (
        <GlobalContext.Provider
            value={{
                filteredCharges,
                categories,
                selectedCategory,
                setSelectedCategory,
                addCharge,
                updateCharge,
                deleteCharge,
                hideCharge,
                setCharges,
                totalPages,
                currentPage,
                setCurrentPage,
            }}
        >
            <ExpenseFetcher />
            {children}
        </GlobalContext.Provider>

    );
};

export const useGlobalContext = () => useContext(GlobalContext);

