import { setError,setLoading,setUser } from "../state/auth.slice";
import { registerUser } from "../services/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = () => {
    const dispatch = useDispatch();
    const handleRegister = async ({ email, password, contact, fullName, isSeller=false }) => {
        console.log({ email, password, contact, fullName, isSeller });
        dispatch(setLoading(true));
        try {
                const result = await registerUser({ email, password, contact, fullName, isSeller });
                dispatch(setUser(result.user));
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setError(error));
            dispatch(setLoading(false));
        }
    };

    return { handleRegister };
};