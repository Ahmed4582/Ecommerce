import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@components/store/hooks';
import { authLogout } from '@components/store/auth/authSlice';
import { actGetWishlist } from '@components/store/wishlist/wishlistSlice';
import { Badge,Navbar,Nav,Container, NavDropdown,} from 'react-bootstrap';
import styles from './styles.module.css';
import HeaderLeftBar from './HeaderLeftBar/HeaderLeftBar';
import { NavLink } from "react-router-dom";



const {headerContainer,headerLogo} = styles

const Header = () => {
const dispatch = useAppDispatch();
const {accessToken, user} = useAppSelector((state) => state.auth)


useEffect(() => {
  if(accessToken){
    dispatch(actGetWishlist("ProductIds"))
  }
}, [dispatch, accessToken])

    return <header >
 
    <div className={headerContainer}>
    <h1 className={headerLogo}>
        <span>Our</span> <Badge bg= "info">Shop</Badge>
    </h1>

    <HeaderLeftBar/>
  
    </div>
    
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="categories">Categories</Nav.Link>
            <Nav.Link as={NavLink} to="about-us">About</Nav.Link>
          </Nav>
          <Nav >
            {!accessToken ? 
            <>
            <Nav.Link  as={NavLink} to="login">Login</Nav.Link>
            <Nav.Link  as={NavLink} to="register">Register</Nav.Link>
            </> 
            :<>
              <NavDropdown title={`Welcome: ${user?.firstName} ${user?.lastName} `} id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="profile" end>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="profile/orders" >
                Orders
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
              as={NavLink}
              to="/"
              onClick={() => dispatch(authLogout())}
              >
                Logout
                </NavDropdown.Item>
            </NavDropdown>
            </>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </header>
};
export default Header;
