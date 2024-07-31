import HeaderCounter from '../HeaderCounter/HeaderCounter';
import CartIcon from '../../../../assets/svg/cart.svg?react';
import WishlistIcon from '../../../../assets/svg/wishlist.svg?react'
import { getCartTotalQuantitySelector } from '@components/store/cart/selectors';
import { useAppSelector } from '@components/store/hooks';
import styles from './styles.module.css'



const { headLeftBar} = styles


const HeaderLeftBar = () => {


    const wishlistTotalQuantity = useAppSelector((state) => 
        state.wishlist.itemsId.length);
    
      const cartTotalQuantity= useAppSelector(getCartTotalQuantitySelector);

  return (
    <>
         <div className={headLeftBar}>

<HeaderCounter 
to="wishlist"
title="wishlist"
totalQuantity={wishlistTotalQuantity}      
svgIcon={<WishlistIcon title="wishlist"/>}
/>
<HeaderCounter 
to="cart"
title="cart"
totalQuantity={cartTotalQuantity}      
svgIcon={<CartIcon title="cart"/>}
/>


</div>
    </>
  )
}

export default HeaderLeftBar
