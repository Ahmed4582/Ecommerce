
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@components/store/hooks";
import {
  actGetProductsByItems,
  cartItemChangeQuantity,
  cartItemRemove,
  cleanCartProductsFullInfo,
} from "@components/store/cart/cartSlice";
import { resetOrderStatus } from "@components/store/orders/ordersSlice";

const useCart = () => {
  const dispatch = useAppDispatch();

  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );

  const userAccessToken = useAppSelector((state) => state.auth.accessToken);

  const { loading: placeOrderStatus } = useAppSelector((state) => state.orders);

  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());

    return () => {
      dispatch(cleanCartProductsFullInfo());
      dispatch(resetOrderStatus());
      promise.abort();
    };
  }, [dispatch]);

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));

  return {
    loading,
    error,
    placeOrderStatus,
    products,
    userAccessToken,
    changeQuantityHandler,
    removeItemHandler,
  };
};

export default useCart;
