import { TProduct } from "@components/types/product.types"
import CartItem from "../CartItems/CartItem"


type CartItemsListProps = {
    products: TProduct[]
    changeQuantityHandler: (id:number, quantity:number) => void
    removeItemHandler: (id:number) => void
};


const CartItemsList = ({products,changeQuantityHandler, removeItemHandler}:CartItemsListProps) => {
    const renderList = products.map((el) => <CartItem
    key={el.id}
    {...el}
    changeQuantityHandler={changeQuantityHandler}
    removeItemHandler={ removeItemHandler}
    />

)
  return (
    <>{renderList}</>
  )
}

export default CartItemsList
