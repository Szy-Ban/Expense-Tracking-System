// components/chargesList/ChargeDetailsModal.js
export default function ChargeDetailsModal({ charge, closeModal }) {
    return (
        <div className="modal" onClick={closeModal}>
            <div className="modal-content">
                <h1>Szczegóły Wydatku</h1>
                <p><strong>Tytuł:</strong> {charge.title}</p>
                <p><strong>Kwota:</strong> {charge.amount}</p>
                <p><strong>Kategoria:</strong> {charge.category}</p>
                <p><strong>Data:</strong> {charge.date}</p>
                <p><strong>Opis:</strong> {charge.description}</p>
                <button onClick={closeModal}>Zamknij</button>
            </div>
        </div>
    );
}
