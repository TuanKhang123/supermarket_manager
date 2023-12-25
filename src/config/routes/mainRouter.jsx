import Import from "../../features/Import";
import Login from "../../features/Login";
import ResetPassword from "../../features/ResetPassword";

const mainRouter = [
    {
        path: "/",
        element: <Login/>
    },
    {
        path: "/resetpassword",
        element: <ResetPassword/>
    },
    {
        path: "/import",
        element: <Import/>
    },
] 

export default mainRouter