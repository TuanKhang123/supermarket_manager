import AccountForm from "../../features/AccountForm/Add";
import AccountInfo from "../../features/AccountInfo";
import Home from "../../features/Home";
import InventoryAuditDetail from "../../features/InventoryAuditDetail";
import InventoryAuditForm from "../../features/InventoryAuditForm";
import InventoryAuditInfo from "../../features/InventoryAuditInfo";
import AdminLayout from "../../layout/Admin/index";
import Import from "../../features/Import";
import ImportDetail from "../../features/ImportDetails/ImportDetail";
import Inventory from "../../features/Inventory";
import { AddProvider, ProviderHome } from "../../features/Provider";
import ProductModifier from "../../features/ProductModifier";
import { AddShelf, Compartment, ShelveMap, TierList } from "../../features/ShelfManagement";


const adminRouter = [
    {
        role: "ADMIN",
        element: <AdminLayout></AdminLayout>,
        children: [
            {
                path: '/',
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
            {
                path: "/import",
                Component: Import
            },
            {
                path: "/idetail",
                Component: ImportDetail
            },
            {
                path: "/inventory",
                Component: Inventory
            },
            {
                path: "/provider/add",
                Component: AddProvider
            },
            {
                path: "/provider",
                Component: ProviderHome
            },
            {
                path: "/product",
                Component: ProductModifier
            },
            {
                path: "/shelf",
                Component: ShelveMap,
            },
            {
                path: "/shelf/add",
                Component: AddShelf,
            },
            {
                path: "/shelf/:shelfId",
                Component: TierList,
            },
            {
                path: '/account/form',
                Component: AccountForm,
            },
            {
                path: "/shelf/:shelfId/:tierId",
                Component: Compartment,
            }

        ]
    },
]

export default adminRouter