import { configureStore,combineReducers } from '@reduxjs/toolkit';
import { 
persistStore,
persistReducer,
FLUSH,
REHYDRATE,
PAUSE,
PERSIST,
PURGE,
REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import categories from './Categories/categoriesSlice';
import products from './products/productsSlice';
import cart from './cart/cartSlice';
import wishlist from './wishlist/wishlistSlice';
import auth from "./auth/authSlice";
import orders from "./orders/ordersSlice"


const rootPersistConfig ={
  key: "root",
  storage,
  whitelist: ["cart", "auth"]
}


const authPersistCinfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken"]
}

const cartPersisConfig = {
  key: "cart ",
  storage,
  whitelist:["items"]
};


const rootReducer = combineReducers({
  auth: persistReducer(authPersistCinfig, auth),
  categories,
  products,
  cart:  persistReducer(cartPersisConfig,cart),
  wishlist:wishlist,
  orders,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware:getDefaultMiddleware => 
    getDefaultMiddleware({
      serializableCheck:{
        ignoredActions: [FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER,],
      },
    }), 
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const persistor =  persistStore(store)

export  {store, persistor};