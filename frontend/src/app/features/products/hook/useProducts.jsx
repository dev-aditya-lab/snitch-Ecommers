import { setSellerProducts, setError, setLoading } from "../state/product.slice";
import { getSellerProducts, createProduct } from "../services/products.api";
import { useDispatch, useSelector } from "react-redux";

export const useProducts = () => {
    const dispatch = useDispatch();
    const { SellerProducts, loading, error } = useSelector((state) => state.products);

    const fetchSellerProducts = async () => {
        dispatch(setLoading(true));
        try {
            const products = await getSellerProducts();
            dispatch(setSellerProducts(products));
        } catch (err) {
            dispatch(setError(err.message || "Failed to fetch seller products"));
        } finally {
            dispatch(setLoading(false));
        }
    };
    const createNewProduct = async (productData) => {
        dispatch(setLoading(true));
        try {
            const newProduct = await createProduct(productData);
            dispatch(setSellerProducts([...SellerProducts, newProduct]));
        } catch (err) {
            dispatch(setError(err.message || "Failed to create product"));
        } finally {
            dispatch(setLoading(false));
        }
    };
    return { fetchSellerProducts, createNewProduct, loading, error };
}