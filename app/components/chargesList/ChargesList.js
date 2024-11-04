// components/chargesList/ChargesList.js
'use client';
import Data from "../../data/history.json";
import styles from "../../globals.css"
import { useState } from "react";
import ChargeItem from "./ChargeItem";
import ChargeDetailsModal from "./ChargeDetailsModal";
import CategoryFilter from "./CategoryFilter";
import AddChargeForm from "./ChargeAdder";

export default function ChargesList() {
    const [charges, setCharges] = useState(Data); // Przechowujemy listę opłat tymczasowo w stanie React
    const [selectedCharge, setSelectedCharge] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
    const [hiddenCharges, setHiddenCharges] = useState([]);

    const openModal = (charge) => setSelectedCharge(charge);
    const closeModal = () => setSelectedCharge(null);
    const hideCharge = (id) => setHiddenCharges(hiddenCharges.concat(id));

    const addCharge = (newCharge) => {
        setCharges([...charges, { ...newCharge, id: Date.now() }]); // Dodajemy nową opłatę tymczasowo do stanu
    };

    // const addCharge = (newCharge) => {
    //     const updatedCharge = { id: Date.now(), title: newCharge.title, amount: newCharge.amount, category: newCharge.category, date: newCharge.date };
    //     setCharges([...charges, updatedCharge]);
    // };

    const uniqueCategories = Array.from(new Set(charges.map(item => item.category)));
    const categories = ["Wszystkie"].concat(uniqueCategories);

    const visibleCharges = charges.filter(item => !hiddenCharges.includes(item.id));
    const filteredCharges = selectedCategory === "Wszystkie"
        ? visibleCharges
        : visibleCharges.filter(item => item.category === selectedCategory);

    return (
        <div className="charges-container">
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <td>Tytuł wydatku</td>
                        <td>Kwota</td>
                        <td>
                            <CategoryFilter
                                categories={categories}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                            />
                        </td>
                        <td>Data</td>
                        <td></td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredCharges.map((info, i) => (
                        <ChargeItem key={i} info={info} openModal={openModal} hideCharge={hideCharge} />
                    ))}
                    </tbody>
                </table>
                {selectedCharge && (
                    <ChargeDetailsModal charge={selectedCharge} closeModal={closeModal} />
                )}
            </div>
            <AddChargeForm onAdd={addCharge} /> {/* Przekazujemy funkcję addCharge do formularza */}
        </div>
    );
}
