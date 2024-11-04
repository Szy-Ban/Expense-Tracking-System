import React from 'react';
import { useFormik } from 'formik';

export default function AddChargeForm({ onAdd }) {

    const formik = useFormik({
        initialValues: {
            title: '',
            amount: '',
            category: '',
            date: '',
            description: ''
        },
        onSubmit: (values, { resetForm }) => {
            onAdd(values);
            resetForm();
        }
    });


    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="title">Tytuł</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
            </div>
            <div>
                <label htmlFor="amount">Kwota</label>
                <input
                    id="amount"
                    name="amount"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.amount}
                />
            </div>
            <div>
                <label htmlFor="category">Kategoria</label>
                <input
                    id="category"
                    name="category"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.category}
                />
            </div>
            <div>
                <label htmlFor="date">Data</label>
                <input
                    id="date"
                    name="date"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.date}
                />
            </div>
            <div>
                <label htmlFor="description">Opis</label>
                <textarea
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                />
            </div>
            <button type="submit">Dodaj Wydatki</button>
        </form>
    );

}