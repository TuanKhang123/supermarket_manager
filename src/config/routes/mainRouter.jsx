import Login from "../../features/Login";
import ResetPassword from "../../features/ResetPassword";

const mainRouter = [
    {
        path: '/',
        element: <Login/>
    },
    {
        path: '/resetpassword',
        element: <ResetPassword/>
    },
] 

export default mainRouter