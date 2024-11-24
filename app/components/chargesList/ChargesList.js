'use client';
import { useGlobalContext } from "../context/GlobalContext";
import ChargeItem from "./ChargeItem";
import ChargeDetailsModal from "./ChargeDetailsModal";
import CategoryFilter from "./CategoryFilter";
import AddChargeForm from "./ChargeAdder";
import EditChargeModal from "./EditChargeModal";
import { useState } from "react";

export default function ChargesList() {
    const {
        filteredCharges,
        categories,
        selectedCategory,
        setSelectedCategory,
        addCharge,
        hideCharge,
        updateCharge,
    } = useGlobalContext();

    const [selectedCharge, setSelectedCharge] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const openModal = (charge) => setSelectedCharge(charge);
    const closeModal = () => setSelectedCharge(null);

    const openEditModal = (charge) => {
        setSelectedCharge(charge);
        setIsEditing(true);
    };
    const closeEditModal = () => {
        setSelectedCharge(null);
        setIsEditing(false);
    };

    return (
        <div className="charges-container">
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>Tytuł wydatku</th>
                        <th>Kwota</th>
                        <th>
                            <CategoryFilter
                                categories={categories}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                            />
                        </th>
                        <th>Data</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredCharges.map((info) => (
                        <ChargeItem
                            key={info.id}
                            info={info}
                            openModal={openModal}
                            hideCharge={hideCharge}
                            openEditModal={openEditModal}
                        />
                    ))}
                    </tbody>
                </table>
                {selectedCharge && !isEditing && (
                    <ChargeDetailsModal charge={selectedCharge} closeModal={closeModal} />
                )}
                {selectedCharge && isEditing && (
                    <EditChargeModal
                        charge={selectedCharge}
                        closeModal={closeEditModal}
                        updateCharge={updateCharge}
                    />
                )}
            </div>
            <AddChargeForm />
        </div>
    );
}
