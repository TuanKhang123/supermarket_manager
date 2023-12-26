const ImportTable = () => {
    const keys = [
        {
            key: "scode",
            title: "Supplier code",
        },
        {
            key: "pcode",
            title: "Product code",
        },
        {
            key: "bcode",
            title: "Batch code",
        },
        {
            key: "qty",
            title: "Quantity",
        },
        {
            key: "pro",
            title: "Manufacture date",
        },
        {
            key: "exp",
            title: "Expire date",
        },
        {
            key: "stc",
            title: "Shelf/ Tier/ Compartment",
        },
    ];

    return (
        <table className="idetail__table">
            {
                keys.map(({ key, title }, index) => {
                    return (<tr key={key} className="idetail__table__row">
                        <td className="idetail__table__cell">
                            {title}
                        </td>
                        <td className="idetail__table__cell">
                            {title}
                        </td>
                    </tr>);
                })
            }
        </table>
    );
}

export default ImportTable;