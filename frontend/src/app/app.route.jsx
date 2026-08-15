import { createBrowserRouter } from "react-router";
import SignUp from "./features/auth/pages/SignUp";
import Login from "./features/auth/pages/Login";
import SellerProducts from "./features/products/pages/SellerProducts";
import CreateProduct from "./features/products/pages/CreateProduct";
import Protected from "./features/auth/components/Protected";
import GuestOnly from "./features/auth/components/GuestOnly";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><h1>Hello, World!</h1></Protected>
    },
    {
        path: "/register",
        element: <GuestOnly><SignUp /></GuestOnly>
    }, {
        path: "/login",
        element: <GuestOnly><Login /></GuestOnly>
    },{
        path: "/dashboard",
        element: <Protected><SellerProducts /></Protected>
    },{
        path: "/seller/products/create",
        element: <Protected role="seller"><CreateProduct /></Protected>
    }
])