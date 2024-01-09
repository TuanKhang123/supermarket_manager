import React, { useEffect, useState } from 'react'
import '../Title/style.scss'
import { useLocation } from 'react-router-dom';

const Title = () => {
    const location = useLocation();
    const pathName = location.pathname;

    const [titlePage, setTitlePage] = useState('')
    useEffect(() => {
        switch (true) {
            case pathName === '/':
                setTitlePage("Dashboard")
                break;
            case pathName === '/account':
                setTitlePage("Accounts Management")
                break;

            // Inventory management
            case pathName === "/inventory":
                setTitlePage("Warehouse receiving table");
                break;

            case pathName.includes("/import"):
                setTitlePage("Warehouse receiving form ");
                break;

            // shelf
            case pathName === '/shelf':
                setTitlePage("Shelf arrangement");
                break;

            case pathName === '/shelf/add':
                setTitlePage("Add shelf");
                break;
            // Audit
            case pathName === '/inventory-audit-info':
                setTitlePage("Audit list of goods")
                break;
            case pathName.includes('/inventory-audit-form'):
                setTitlePage("Goods audit form")
                break;
            case pathName === '/category':
                setTitlePage("Category table")
                break;
            case pathName === '/inventory-audit-detail':
                setTitlePage("Update details audit")
                break;
            // category

            case pathName.includes("/category"):
                setTitlePage("Category table")
                break;
            // provider
            case pathName === '/provider':
                setTitlePage("Supplier management")
                break;
            case pathName === '/provider/add':
                setTitlePage("Supplier form")
                break;

            default:
                setTitlePage("")
                break;
        }
    }, [pathName])

    return (
        <div className='title'>
            {titlePage}
        </div>
    )
}

export default Title;