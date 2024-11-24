export default function ChargeItem({ info, openModal, hideCharge, openEditModal }) {
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
                <button onClick={() => openEditModal(info)}>Edytuj</button>
            </td>
            <td>
                <button onClick={() => hideCharge(info.id)}>Usuń</button>
            </td>
        </tr>
    );
}
