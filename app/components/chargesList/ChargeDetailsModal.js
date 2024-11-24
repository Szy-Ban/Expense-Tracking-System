export default function ChargeDetailsModal({ charge, closeModal }) {
    if (!charge) {
        return <div className="modal">Brak danych do wyświetlenia</div>;
    }

    return (
        <div className="modal" onClick={closeModal}>
            <div className="modal-content">
                <h1>Szczegóły Wydatku</h1>
                <p><strong>Tytuł:</strong> {charge.title || "Brak danych"}</p>
                <p><strong>Kwota:</strong> {charge.amount || "Brak danych"}</p>
                <p><strong>Kategoria:</strong> {charge.category || "Brak danych"}</p>
                <p><strong>Data:</strong> {charge.date || "Brak danych"}</p>
                <p><strong>Opis:</strong> {charge.description || "Brak danych"}</p>
                <button onClick={closeModal}>Zamknij</button>
            </div>
        </div>
    );
}
