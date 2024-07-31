import useWishlist from "@components/hooks/useWishlist";
import  Heading from "@components/coomon/Heading/Heading";
import { GridList } from "@components/coomon";
import  Product  from "@components/ecommerce/Product/Product";
import  Loading  from "@components/feedback/Loading/Loading";
import { TProduct } from "@components/types/product.types";


const Wishlist = () => {

  const {loading, error, records} = useWishlist();


  return (
    <>
      <Heading title="Your Wishlist"/>
      <Loading status={loading} error={error} type="product">
        <GridList<TProduct>
          emptyMessage= "Your Wishlist is empty"
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Wishlist;