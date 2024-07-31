export type TProduct = {
    id: number;
    title: string;
    price: number  ;
    prefix: string;
    img: string;
    quantity?: number;
    max: number;
    isLiked?: boolean;
    isAuthenticated?: boolean
  };