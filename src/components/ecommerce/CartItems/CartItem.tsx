import ProductInfo from "../ProducrInfo/ProductInfo";
import { Button, Form} from "react-bootstrap";
import styles from "./styles.module.css";
import { memo } from "react";
import { TProduct } from "@components/types/product.types";


const { cartItem, cartItemSelection } =
  styles;

  type CartItemsProps = TProduct & {
    changeQuantityHandler: (id:number, quantity:number) => void
    removeItemHandler: (id:number) => void
  };

const CartItem = memo(({
  title,
  id,
  img,
  price,
  max,
  quantity,
  changeQuantityHandler,
  removeItemHandler,
}:CartItemsProps) => {
  const renderOptions = Array(max)
  .fill(0)
  .map((_,idx) => {
    const quantity = ++idx;
    return(
      <option value={quantity} key={quantity}>{quantity}</option>
    )
   

  });



  const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = +event.target.value;
    changeQuantityHandler(id, quantity);
  };
    return (
        <div className={cartItem}>
        <ProductInfo title={title} img={img} price={price} direction="column">
              <Button
                variant="secondary"
                style={{ color: "white", width: "100px" }}
                className="mt-auto"
                onClick={()=> removeItemHandler(id)}
              >
                Remove
              </Button>
            </ProductInfo>

  
          <div className={cartItemSelection}>
            <span className="d-block mb-1" >Quantity</span>
            <Form.Select value={quantity} aria-label="Defaoult" onChange={changeQuantity}>
              {renderOptions}     
            </Form.Select >
          </div>
        </div>
      );
  
});


export default CartItem