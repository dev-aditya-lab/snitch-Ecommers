import {createBrowserRouter} from "react-router";
import SignUp from "./features/auth/pages/SignUp";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Hello, World!</h1>
    },
    {
        path: "/register",
        element: <SignUp/>
    }
])