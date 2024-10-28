'use client'
import Data from "../../data/history.json"
import styles from "../../globals.css"
import {useState} from "react";

export default function chargesList() {

    const [selectedCharge, setSelectedCharge] = useState(null);

    const openModal = (charge) => {
        setSelectedCharge(charge);
    };

    const closeModal = () => {
        setSelectedCharge(null);
    };

    const displayCharges=Data.map((info, i)=>{
    return (
        <tr key={i}>
            <td>{info.title}</td>
            <td>{info.amount}</td>
            <td>{info.category}</td>
            <td>{info.date}</td>
            <td>
                <button onClick={() => openModal(info)}>Szczegóły</button>
            </td>
            {/*<td>{info.description}</td>*/}
        </tr>
    )
    })

    return (
        <div className="centerTableT">
            <table>
                <thead>
                <tr>
                <td>Tytuł wydatku</td>
                    <td>Kwota</td>
                    <td>Kategoria</td>
                    <td>Data</td>
                    <td></td>
                    {/*<td>Opis</td>*/}
                </tr>
                </thead>
                <tbody>
                {displayCharges}
                </tbody>
            </table>
            {/*onClick={(e) => e.stopPropagation()}*/}
            {selectedCharge && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content">
                        <h1>Szczegóły Wydatku</h1>
                        <p> </p>
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
