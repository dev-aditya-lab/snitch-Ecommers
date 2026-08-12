import { RouterProvider } from "react-router";
import { router } from "./app.route";
import { useAuth } from "./features/auth/hook/useAuth";
import { useEffect } from "react";

export default function App() {
  const { getCurrentUser } = useAuth();
  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}
