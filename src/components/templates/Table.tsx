import './Table.css';

function Table() {
    const rows: string[] = [];
    

    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}

export default Table;