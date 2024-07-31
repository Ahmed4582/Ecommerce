import useCategories from "@components/hooks/useCategories";
import Category from "@components/ecommerce/Category/Category"
import Loading from "@components/feedback/Loading/Loading";
import { GridList, Heading } from "@components/coomon";
import { TCategory } from "@components/types";




const Categories = () => {

const {loading, error, records} =useCategories();


  return (

     <>
     <Heading title="Categories"/>
       <Loading status={loading} error= {error} type="category">
        <GridList<TCategory>
        emptyMessage= "There are an Categories"
        records= {records}
        renderItem = {(record) =>   <Category {...record}/>}
        />          
      </Loading>
     </>
  );
};

export default Categories;