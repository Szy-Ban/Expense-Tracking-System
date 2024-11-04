// components/chargesList/ChargeItem.js
export default function ChargeItem({ info, openModal, hideCharge }) {
    return (
        <tr>
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
    );
}
