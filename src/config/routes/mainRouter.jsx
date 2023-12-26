import Import from "../../features/Import";
import ImportDetail from "../../features/ImportDetails/ImportDetail";
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
    {
        path: "/idetail",
        element: <ImportDetail/>
    },
] 

export default mainRouter