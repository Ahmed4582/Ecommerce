import useProducts from "@components/hooks/useProducts";
import  Product  from "@components/ecommerce/Product/Product";
import Loading from "@components/feedback/Loading/Loading";
import { GridList, Heading } from "@components/coomon/";
import { TProduct } from "@components/types";

const Products = () => {
  const { loading, error, productPrefix, productsFullInfo } = useProducts();

  return (
    <>
      <Heading title={`${productPrefix?.toUpperCase()} Products`} />
      <Loading status={loading} error={error} type="product">
        <GridList<TProduct>
          emptyMessage="There are no products"
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Products;