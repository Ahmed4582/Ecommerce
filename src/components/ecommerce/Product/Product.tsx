import { memo, useEffect, useState} from "react";
import { useAppDispatch } from "@components/store/hooks";
import actLikeToggle from "@components/store/wishlist/act/actLikeToggle"
import { addToCart } from "@components/store/cart/cartSlice";
import { Button, Modal, Spinner } from "react-bootstrap";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/likeFill.svg?react";
import ProductInfo from "../ProducrInfo/ProductInfo";
import {TProduct} from '@components/types/product.types'

const {  maximumNotice , wishlistBtn} = styles;
import styles from "./styles.module.css";

const Product = memo(
  ({
    id,
    title,
    price,
    img,
    max,
    quantity,
    isLiked,
    isAuthenticated,
  }: TProduct) => {
    const dispatch = useAppDispatch();

    const [showModal, setShowModal] = useState(false);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const currentRemainingQuantity = (max as number) - (quantity ?? 0);

    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

    useEffect(() => {
      if (!isBtnDisabled) {
        return;
      }

      const debounce = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 300);

      return () => clearTimeout(debounce);
    }, [isBtnDisabled]);

    const addToCartHandler = () => {
      dispatch(addToCart(id));
      setIsBtnDisabled(true);
    };

    const likeToggleHandler = () => {
      if (isAuthenticated) {
        if (!isLoading) {
          setIsLoading(true);
          dispatch(actLikeToggle(id))
            .unwrap()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        }
      } else {
        setShowModal(true);
      }
    };

    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>

        <>
          <ProductInfo title={title} price={price} img={img} direction="column">
            <div className={wishlistBtn} onClick={likeToggleHandler}>
              {isLoading ? (
                <Spinner animation="border" size="sm" variant="primary" />
              ) : isLiked ? (
                <LikeFill />
              ) : (
                <Like />
              )}
            </div>
            <p className={maximumNotice}>
              {quantityReachedToMax
                ? "You reached to the limit"
                : `You can add ${currentRemainingQuantity} item(s)`}
            </p>
            <Button
              variant="info"
              style={{ color: "white", width: "100%" }}
              onClick={addToCartHandler}
              disabled={isBtnDisabled || quantityReachedToMax}
            >
              {isBtnDisabled ? (
                <>
                  <Spinner animation="border" size="sm" /> Loading...
                </>
              ) : (
                "Add to cart"
              )}
            </Button>
          </ProductInfo>
        </>
      </>
    );
  }
);
export default Product;