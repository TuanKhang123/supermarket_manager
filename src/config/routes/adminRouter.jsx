import AccountInfo from "../../features/AccountInfo";
import Home from "../../features/Home";
import InventoryAuditDetail from "../../features/InventoryAuditDetail";
import InventoryAuditForm from "../../features/InventoryAuditForm";
import InventoryAuditInfo from "../../features/InventoryAuditInfo";
import AdminLayout from "../../layout/Admin/index";



const adminRouter = [
    {
        role: "ADMIN",
        element: <AdminLayout></AdminLayout>,
        children: [
            {
                path: '/home',
                Component: Home
            },
            {
                path: '/inventory-audit-form',
                Component: InventoryAuditForm
            },
            {
                path: '/inventory-audit-detail/:id',
                Component: InventoryAuditDetail
            },
            {
                path: '/inventory-audit-info',
                Component: InventoryAuditInfo
            },
            {
                path: '/account',
                Component: AccountInfo
            },

        ]
    },
]

export default adminRouter