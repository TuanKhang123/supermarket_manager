import ResetPassword from "../../features/ResetPassword";
import Login from "../../features/Login";


const mainRouter = [
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/resetpassword",
        element: <ResetPassword />
    }
]

export default mainRouter