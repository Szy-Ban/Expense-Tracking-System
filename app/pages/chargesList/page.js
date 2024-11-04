'use client'
import Data from "../../data/history.json"
import styles from "../../globals.css"
import {useState} from "react";

export default function chargesList() {

    const [selectedCharge, setSelectedCharge] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
    const [hiddenCharges, setHiddenCharges] = useState([]);

    const openModal = (charge) => {
        setSelectedCharge(charge);
    };

    const closeModal = () => {
        setSelectedCharge(null);
    };

    const hideCharge = (id) => {
        setHiddenCharges([...hiddenCharges, id]);
    };

    const categories = ["Wszystkie", ...new Set(Data.map(item => item.category))];


    const visibleCharges = Data.filter(item => !hiddenCharges.includes(item.id));

    const filteredCharges = selectedCategory === "Wszystkie"
        ? visibleCharges
        : visibleCharges.filter(item => item.category === selectedCategory);

    const displayCharges = filteredCharges.map((info, i) => (
        <tr key={i}>
            <td>{info.title}</td>
            <td>{info.amount}</td>
            <td>{info.category}</td>
            <td>{info.date}</td>
            <td>
                <button onClick={() => openModal(info)}>Szczegóły</button>
            </td>
            <td>
                <button onClick={() => hideCharge(info.id)}>Usuń</button>
            </td>
        </tr>
    ));

    return (
        <div className="centerTableT">
            <table>
                <thead>
                <tr>
                    <td>Tytuł wydatku</td>
                    <td>Kwota</td>
                    <td>
                        Kategoria
                        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td>Data</td>
                    <td></td>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                {displayCharges}
                </tbody>
            </table>
            {selectedCharge && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content">
                        <h1>Szczegóły Wydatku</h1>
                        <p></p>
                        <p><strong>Tytuł:</strong> {selectedCharge.title}</p>
                        <p><strong>Kwota:</strong> {selectedCharge.amount}</p>
                        <p><strong>Kategoria:</strong> {selectedCharge.category}</p>
                        <p><strong>Data:</strong> {selectedCharge.date}</p>
                        <p><strong>Opis:</strong> {selectedCharge.description}</p>
                        <button onClick={closeModal}>Zamknij</button>
                    </div>
                </div>
            )}
        </div>
    );
}
