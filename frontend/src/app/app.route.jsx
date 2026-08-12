import { createBrowserRouter } from "react-router";
import SignUp from "./features/auth/pages/SignUp";
import Login from "./features/auth/pages/Login";
import SellerProducts from "./features/products/pages/SellerProducts";
import CreateProduct from "./features/products/pages/createProduct";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Hello, World!</h1>
    },
    {
        path: "/register",
        element: <SignUp />
    }, {
        path: "/login",
        element: <Login />
    },{
        path: "/dashboard",
        element: <h1>Dashboard</h1>
    },{
        path: "/seller/products",
        element: <SellerProducts />
    },{
        path: "/seller/products/create",
        element: <CreateProduct />
    }
])