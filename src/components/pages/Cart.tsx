
import { Heading } from "@components/coomon";
import useCart from "@components/hooks/useCart";
import CartSubTotalPrice from "@components/ecommerce/CartSubTotalPrice/CartSubTotalPrice";
import Loading from "@components/feedback/Loading/Loading";
import CartItemsList from "@components/ecommerce/CartItemsList/CartItemsList";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";

const Cart = () => {
  const {
    loading,
    error,
    placeOrderStatus,
    products,
    userAccessToken,
    changeQuantityHandler,
    removeItemHandler,
  } = useCart();

  return (
    <>
      <Heading title="Your Cart" />
      <Loading status={loading} error={error} type="cart">
        {products.length ? (
          <>
            <CartItemsList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubTotalPrice
              products={products}
              userAccessToken={userAccessToken}
            />
          </>
        ) : placeOrderStatus === "succeeded" ? (
          <LottieHandler
            message="Your order has been placed successfully"
            type="success"
          />
        ) : (
          <LottieHandler message="Your cart is empty" type="empty" />
        )}
      </Loading>
    </>
  );
};

export default Cart;