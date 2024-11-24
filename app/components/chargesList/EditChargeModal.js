import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function EditChargeModal({ charge, closeModal, updateCharge }) {
    const allowedCategories = [
        "Jedzenie",
        "Media",
        "Rozrywka",
        "Odzież",
        "Transport",
        "Usługi",
        "Elektronika",
        "Edukacja",
    ];

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Tytuł jest wymagany").min(3, "Tytuł musi mieć co najmniej 3 znaki"),
        amount: Yup.number().required("Kwota jest wymagana").positive("Kwota musi być dodatnia").typeError("Kwota musi być liczbą"),
        category: Yup.string().required("Kategoria jest wymagana").oneOf(allowedCategories, "Nieprawidłowa kategoria"),
        date: Yup.date().required("Data jest wymagana").max(new Date(), "Data nie może być w przyszłości"),
        description: Yup.string().optional().max(200, "Opis nie może mieć więcej niż 200 znaków"),
    });

    const formik = useFormik({
        initialValues: {
            title: charge.title,
            amount: charge.amount,
            category: charge.category,
            date: charge.date,
            description: charge.description || '',
        },
        validationSchema,
        onSubmit: (values) => {
            updateCharge({ ...charge, ...values });
            closeModal();
        },
    });

    return (
        <div className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h1>Edytuj Wydatek</h1>
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
                        {formik.touched.title && formik.errors.title && <div className="error">{formik.errors.title}</div>}
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
                        {formik.touched.amount && formik.errors.amount && <div className="error">{formik.errors.amount}</div>}
                    </div>
                    <div>
                        <label htmlFor="category">Kategoria</label>
                        <select
                            id="category"
                            name="category"
                            onChange={formik.handleChange}
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
                        {formik.touched.category && formik.errors.category && <div className="error">{formik.errors.category}</div>}
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
                        {formik.touched.date && formik.errors.date && <div className="error">{formik.errors.date}</div>}
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
                    <button type="submit">Zapisz</button>
                    <button type="button" onClick={closeModal} style={{ marginLeft: '10px' }}>Anuluj</button>
                </form>
            </div>
        </div>
    );
}
