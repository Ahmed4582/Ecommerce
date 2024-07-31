import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@components/store/hooks";
import actGetWishlist from "@components/store/wishlist/act/actGetWishlist";
import { cleanWishlistProductsCleanUp } from "@components/store/wishlist/wishlistSlice";


const useWishlist = () => {

    const dispatch = useAppDispatch();
    const { loading, error, productsFullInfo } = useAppSelector(
      (state) => state.wishlist
    );
    const cartItems = useAppSelector((state) => state.cart.items);
  
    useEffect(() => {
     const promise = dispatch(actGetWishlist("ProductsFullInfo"));
      
      return () => {
        promise.abort();
        dispatch(cleanWishlistProductsCleanUp());
      };
    }, [dispatch]);
  
    const records = productsFullInfo.map((el) => ({
      ...el,
      quantity: cartItems[el.id],
      isLiked: true,
      isAuthenticated: true,
    }));



  return { loading, error, records }
}
export default useWishlist
