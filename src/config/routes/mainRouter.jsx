import ResetPassword from "../../features/ResetPassword";
import Login from "../../features/Login";


const mainRouter = [
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/reset-password/:token",
        element: <ResetPassword />
    }
]

export default mainRouter