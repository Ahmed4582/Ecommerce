import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@components/store/hooks";
import { actGetUserOrders } from "@components/store/orders/ordersSlice";
import { resetOrderStatus } from "@components/store/orders/ordersSlice";
import { TProduct } from "@components/types";


const useOrders = () => {

  const dispatch = useAppDispatch();

  const {loading, error, ordersList } = useAppSelector((state) => state.orders);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);



  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct([]);
  };

  const viewDetailsHandler = (id: number) => {
    const productDetails = ordersList.find((order) => order.id === id);

    const newItems = productDetails?.items ?? [];
    setShowModal(true);
    setSelectedProduct((prev) => [...prev, ...newItems]);
  };

  useEffect(() => {
    const promise = dispatch(actGetUserOrders());

    return () => {
      promise.abort();
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);

  return {
    loading,
    error,
    ordersList,
    showModal,
    selectedProduct,
    viewDetailsHandler,
    handleCloseModal,
}
}

export default useOrders
