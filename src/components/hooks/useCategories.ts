import { categoriesRecordsCleanUp } from "@components/store/Categories/categoriesSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@components/store/hooks";
import actGetCategories from "@components/store/Categories/act/actGetCategories"

const useCategories = () => {

    const dispatch = useAppDispatch();
    const {loading, error, records} = useAppSelector(
      (state) => state.categories
    );
  
    useEffect(()=> {
       const promise = dispatch(actGetCategories());
      
  
      return () => {
        promise.abort();
        dispatch(categoriesRecordsCleanUp());
      };
     
    },[dispatch]);


    return  {loading, error, records} 
}

export default useCategories
