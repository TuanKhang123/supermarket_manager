import Home from "../../features/Home";
import AdminLayout from "../../layout/Admin";



const adminRouter = [
    {
        role: "ADMIN",
        element: <AdminLayout></AdminLayout>,
        children: [
            {
                path: '/home',
                Component: Home
            },
            
        ]
    },
]

export default adminRouter