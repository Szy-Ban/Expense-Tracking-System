'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGlobalContext } from "../context/GlobalContext";

export default function AddChargeForm() {
    const { addCharge } = useGlobalContext();

    const allowedCategories = [
        "Jedzenie",
        "Media",
        "Rozrywka",
        "Odzież",
        "Transport",
        "Usługi",
        "Elektronika",
        "Edukacja"
    ];

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Tytuł jest wymagany").min(3, "Tytuł musi mieć co najmniej 3 znaki"),
        amount: Yup.number().required("Kwota jest wymagana").positive("Kwota musi być dodatnia").typeError("Kwota musi być liczbą"),
        category: Yup.string().required("Kategoria jest wymagana").oneOf(allowedCategories, `Kategoria musi być jedną z: ${allowedCategories.join(", ")}`),
        date: Yup.date().required("Data jest wymagana").max(new Date(), "Data nie może być w przyszłości"),
        description: Yup.string().optional().max(200, "Opis nie może mieć więcej niż 200 znaków"),
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            amount: '',
            category: '',
            date: '',
            description: ''
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            addCharge(values);
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
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? <div className="error">{formik.errors.title}</div> : null}
            </div>
            <div>
                <label htmlFor="amount">Kwota</label>
                <input
                    id="amount"
                    name="amount"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.amount}
                />
                {formik.touched.amount && formik.errors.amount ? <div className="error">{formik.errors.amount}</div> : null}
            </div>
            <div>
                <label htmlFor="category">Kategoria</label>
                <select
                    id="category"
                    name="category"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                    style={{ color: '#000000'}}
                >
                    <option value="" label="Wybierz kategorię" />
                    {allowedCategories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                {formik.touched.category && formik.errors.category ? <div className="error">{formik.errors.category}</div> : null}
            </div>
            <div>
                <label htmlFor="date">Data</label>
                <input
                    id="date"
                    name="date"
                    type="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                />
                {formik.touched.date && formik.errors.date ? <div className="error">{formik.errors.date}</div> : null}
            </div>
            <div>
                <label htmlFor="description">Opis</label>
                <textarea
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description ? <div className="error">{formik.errors.description}</div> : null}
            </div>
            <button type="submit">Dodaj Wydatki</button>
        </form>
    );
}
