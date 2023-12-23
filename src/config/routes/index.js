import adminRouter from "./adminRouter";
import mainRouter from "./mainRouter";


const publicRouter = [
    mainRouter,    
];

const privateRouter = [
    adminRouter,
];

export {publicRouter, privateRouter}