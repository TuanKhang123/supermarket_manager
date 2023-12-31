import React, { useEffect, useState } from 'react'
import '../Title/style.scss'

const Title = () => {
    const pathName = window.location.pathname // để chèn chữ vào trong title
    console.log(pathName);
    const [titlePage, setTitlePage] = useState('')

    useEffect(() => {
        switch (true) {
            case pathName === '/':
                setTitlePage("Dashboard")
                break;
            // account

            case pathName === '/account':
                setTitlePage("Accounts Management")
                break;

            // audit
            case pathName === '/inventory-audit-info':
                setTitlePage("Audit list of goods")
                break;
            case pathName === '/inventory-audit-form':
                setTitlePage("Goods audit form")
                break;
            case pathName === '/category':
                setTitlePage("Goods audit form")
                break;
            case pathName.includes("inventory-audit-detail"):
                setTitlePage("Update details audit")
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