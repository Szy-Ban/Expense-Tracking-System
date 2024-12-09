import { useGlobalContext } from "../context/GlobalContext";

export default function Pagination() {
    //ograniczenie backendem TODO
    const { currentPage, setCurrentPage, totalPages } = useGlobalContext();


    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="pagination">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Poprzednia
            </button>
            <span>
                Strona {currentPage} z {totalPages}
            </span>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Następna
            </button>
        </div>
    );
}
