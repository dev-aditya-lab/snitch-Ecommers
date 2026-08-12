import { setSellerProducts, setError, setLoading } from "../state/product.slice";
import { getSellerProducts, createProduct } from "../services/products.api";
import { useDispatch, useSelector } from "react-redux";

export const useProducts = () => {
    const dispatch = useDispatch();
    const { SellerProducts, loading, error } = useSelector((state) => state.products);

    const fetchSellerProducts = async () => {
        dispatch(setLoading(true));
        try {
            const data = await getSellerProducts();
            dispatch(setSellerProducts(data.products));
        } catch (err) {
            dispatch(setError(err.message || "Failed to fetch seller products"));
        } finally {
            dispatch(setLoading(false));
        }
    };
    const createNewProduct = async (productData) => {
        dispatch(setLoading(true));
        try {
            const data = await createProduct(productData);
            dispatch(setSellerProducts([...SellerProducts, data.product]));
            return true;
        } catch (err) {
            dispatch(setError(err.message || "Failed to create product"));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    };
    return { fetchSellerProducts, createNewProduct, SellerProducts, loading, error };
}