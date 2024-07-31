import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Components
import LottieHandler from '@components/feedback/LottieHandler/LottieHandler';
import PageSuspenseFallback from '@components/feedback/PageSuspenseFallback/PageSuspenseFallback';
// Layaouts
const  MainLayout = lazy(() => import("@components/layouts/MainLayout/MainLayout"))
const  ProfileLayout = lazy(() => import("@components/layouts/ProfileLayout/ProfileLayout"))
// Pages
const Home = lazy(() => import("@components/pages/Home"))
const Categories = lazy(() => import("@components/pages/Categories"))
const Products = lazy(() => import("@components/pages/Products"))
const Wishlist = lazy(() => import("../pages/Wishlist"))
const  Cart = lazy(() => import("@components/pages/Cart"))
const Login = lazy(() => import("@components/pages/Login"))
const AboutUs = lazy(() => import("@components/pages/AboutUs"))
const Register = lazy(() => import("@components/pages/Register"))
const Account = lazy(() => import("@components/pages/Account"))
const Orders = lazy(() => import("@components/pages/Orders"));
import Error from '@components/pages/Error';

// protected rout
import ProtectedRoute from '@components/Auth/ProtectedRoute';

const router = createBrowserRouter([
    {
        path:"/",element:(
            <Suspense
        fallback={
          <div style={{ marginTop: "10%" }}>
            <LottieHandler type="loading" message="Loading please wait..." />
          </div>
        }
      >
        <MainLayout />
      </Suspense>
        ),
        
        errorElement: <Error/>,
        children:[
            {index:true,
         element: (
          <PageSuspenseFallback>
            <Home />
          </PageSuspenseFallback>
        ),
          },

            {path:"/categories",
                element: (
          <PageSuspenseFallback>
            <Categories />
          </PageSuspenseFallback>
        ),
          },

            {path:"/cart" ,
            element: (
          <PageSuspenseFallback>
            <Cart />
          </PageSuspenseFallback>
        ),
          },

            {path:"/wishlist", element:(
            <ProtectedRoute>
                 <PageSuspenseFallback>
            <Wishlist />
          </PageSuspenseFallback>
            </ProtectedRoute>
            )
          },

          {
            path: "/categories/products/:prefix",
              element: (
          <PageSuspenseFallback>
            <Products />
          </PageSuspenseFallback>
        ),
             loader: ({params}) => {
              if (
                typeof params.prefix !== 'string' ||
                !/^[a-z]+$/i.test(params.prefix)
              ){
                throw new Response("Bad Request",{
                  statusText: "Categorie Not Found",
                  status: 400,
              });
              }
              return true;
             },
            },

            {path:"/about-us",
              element: (
          <PageSuspenseFallback>
            <AboutUs />
          </PageSuspenseFallback>
        ),
          },

            {path:"/login",
              element: (
          <PageSuspenseFallback>
            <Login />
          </PageSuspenseFallback>
        ),
          },

            {path:"/register",
              element: (
          <PageSuspenseFallback>
            <Register />
          </PageSuspenseFallback>
        ),
          },

            {path:"/profile",
              element: (
          <ProtectedRoute>
            <PageSuspenseFallback>
            <ProfileLayout />
          </PageSuspenseFallback>
          </ProtectedRoute>
        ),
            children: [
          {
            index: true,
            element: (
              <PageSuspenseFallback>
                <Account />
              </PageSuspenseFallback>
              ),
            },
              {
            path: "orders",
            element: (
              <PageSuspenseFallback>
                <Orders />
              </PageSuspenseFallback>
            ),
          },
          ]
        },
      ]
},
]);
 
const AppRouters = () => {
  return (<RouterProvider router={router} />)
}

export default AppRouters
