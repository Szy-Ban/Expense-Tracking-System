'use client';

import { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';

export default function ExpenseFetcher() {
    const { setCharges } = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch('http://localhost:5000/expenses')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Błąd pobierania danych: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setCharges(data);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [setCharges]);

    if (loading) return <p>Ładowanie danych...</p>;
    if (error) return <p>Błąd: {error}</p>;

    return null;
}
