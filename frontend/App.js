import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { signout } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import AboutUsScreen from "./screens/AboutUsScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SellerRoute from "./components/SellerRoute";
import SellerScreen from "./screens/SellerScreen";
// import SearchBox from './components/SearchBox';
import SearchScreen from "./screens/SearchScreen";
import { listProductCategories } from "./actions/productActions";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import MapScreen from "./screens/MapScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SupportScreen from "./screens/SupportScreen";
import ChatBox from "./components/ChatBox";
import {
  Nav,
  NavDropdown,
  Navbar,
  Container,
  ThemeProvider,
} from "react-bootstrap";
function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
    >
      <div className="App">
        <div>
          <Navbar bg="light" className="Navigator" fixed="top">
            <Container className="Navigator">
              <Navbar.Brand href="#home">
                {" "}
                <Link className="brand" to="/">
                  DGLINKS GEOSPATIAL
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link>
                    {" "}
                    <Link to="/">Home</Link>
                  </Nav.Link>
                  <Nav.Link>
                    {" "}
                    <Link to="/aboutus">About Us</Link>
                  </Nav.Link>
                  <Nav.Link>
                    {" "}
                    <Link to="/cart">
                      Cart
                      {cartItems.length > 0 && (
                        <span className="badge">{cartItems.length}</span>
                      )}
                    </Link>
                  </Nav.Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.Name} id="basic-nav-dropdown">
                      <NavDropdown.Item>
                        <Link to="/profile">User Profile</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to="/orderhistory">Order History</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to="#signout" onClick={signoutHandler}>
                          Log Out
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <Nav.Link>
                      <Link to="/signin">Log In</Link>
                    </Nav.Link>
                  )}
                  {userInfo && userInfo.isSeller && (
                    <NavDropdown title="Seller" id="basic-nav-dropdown">
                      <NavDropdown.Item>
                        <Link to="/productlist/seller">Products</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to="/orderlist/seller">Orders</Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="basic-nav-dropdown">
                      <NavDropdown.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to="/productlist">Products</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        {" "}
                        <Link to="/orderlist">Orders</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to="/userlist">Users</Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <BrowserRouter>
          <div className="grid-container">
            <header className="row">
              <div></div>
              {/* <div>
            <SearchBox />
          </div> */}
              <div>
                {userInfo ? (
                  <div className="dropdown">
                    <Link to="#">
                      {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                    </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/profile">User Profile</Link>
                      </li>
                      <li>
                        <Link to="/orderhistory">Order History</Link>
                      </li>
                      <li>
                        <Link to="#signout" onClick={signoutHandler}>
                          Log Out
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link to="/signin">Log In</Link>
                )}
                {userInfo && userInfo.isSeller && (
                  <div className="dropdown">
                    <Link to="#admin">
                      Seller <i className="fa fa-caret-down"></i>
                    </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/productlist/seller">Products</Link>
                      </li>
                      <li>
                        <Link to="/orderlist/seller">Orders</Link>
                      </li>
                    </ul>
                  </div>
                )}
                {userInfo && userInfo.isAdmin && (
                  <div className="dropdown">
                    <Link to="#admin">
                      Admin <i className="fa fa-caret-down"></i>
                    </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/dashboard">Dashboard</Link>
                      </li>
                      <li>
                        <Link to="/productlist">Products</Link>
                      </li>
                      <li>
                        <Link to="/orderlist">Orders</Link>
                      </li>
                      <li>
                        <Link to="/userlist">Users</Link>
                      </li>
                      <li>
                        <Link to="/support">Support</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </header>
            <aside className={sidebarIsOpen ? "open" : ""}>
              <ul className="categories">
                <li>
                  <strong>Categories</strong>
                  <button
                    onClick={() => setSidebarIsOpen(false)}
                    className="close-sidebar"
                    type="button"
                  >
                    <i className="fa fa-close"></i>
                  </button>
                </li>
                {loadingCategories ? (
                  <LoadingBox></LoadingBox>
                ) : errorCategories ? (
                  <MessageBox variant="danger">{errorCategories}</MessageBox>
                ) : (
                  categories.map((c) => (
                    <li key={c}>
                      <Link
                        to={`/search/category/${c}`}
                        onClick={() => setSidebarIsOpen(false)}
                      >
                        {c}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </aside>
            <main>
              <Routes>
                <Route path="/seller/:id" element={<SellerScreen />}></Route>
                <Route path="/cart" element={<CartScreen />}></Route>
                <Route path="/cart/:id" element={<CartScreen />}></Route>
                <Route
                  path="/product/:id"
                  element={<ProductScreen />}
                  exact
                ></Route>
                <Route
                  path="/product/:id/edit"
                  element={<ProductEditScreen />}
                  exact
                ></Route>
                <Route path="/signin" element={<SigninScreen />}></Route>
                <Route path="/register" element={<RegisterScreen />}></Route>
                <Route path="/aboutus" element={<AboutUsScreen />}></Route>
                <Route
                  path="/shipping"
                  element={<ShippingAddressScreen />}
                ></Route>
                <Route
                  path="/payment"
                  element={<PaymentMethodScreen />}
                ></Route>
                <Route
                  path="/placeorder"
                  element={<PlaceOrderScreen />}
                ></Route>
                <Route path="/order/:id" element={<OrderScreen />}></Route>
                <Route
                  path="/orderhistory"
                  element={<OrderHistoryScreen />}
                ></Route>
                <Route
                  path="/search/name"
                  element={<SearchScreen />}
                  exact
                ></Route>
                <Route
                  path="/search/name/:name"
                  element={<SearchScreen />}
                  exact
                ></Route>
                <Route
                  path="/search/category/:category"
                  element={<SearchScreen />}
                  exact
                ></Route>
                <Route
                  path="/search/category/:category/name/:name"
                  element={<SearchScreen />}
                  exact
                ></Route>
                <Route
                  path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
                  element={<SearchScreen />}
                  exact
                ></Route>

                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <ProfileScreen />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/map"
                  element={
                    <PrivateRoute>
                      <MapScreen />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/productlist"
                  element={
                    <AdminRoute>
                      <ProductListScreen />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/productlist/pageNumber/:pageNumber"
                  element={
                    <AdminRoute>
                      <ProductListScreen />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/orderlist"
                  element={
                    <AdminRoute>
                      <OrderListScreen />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/userlist"
                  element={
                    <AdminRoute>
                      <UserListScreen />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/user/:id/edit"
                  element={
                    <AdminRoute>
                      <UserEditScreen />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <AdminRoute>
                      <DashboardScreen />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/support"
                  element={
                    <AdminRoute>
                      <SupportScreen />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/productlist/seller"
                  element={
                    <SellerRoute>
                      <ProductListScreen />
                    </SellerRoute>
                  }
                />
                <Route
                  path="/orderlist/seller"
                  element={
                    <SellerRoute>
                      <OrderListScreen />
                    </SellerRoute>
                  }
                />

                <Route path="/" element={<HomeScreen />} exact></Route>
              </Routes>
            </main>
            <footer className="row center">
              {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
              <div>
                All right reserved dglinks 2021
                <br />
                <div className="row center">
                  <Link to="/">
                    <i className="fa fa-facebook" />
                  </Link>
                  <Link to="/">
                    <i className="fa fa-twitter" />
                  </Link>
                  <Link to="/">
                    <i className="fa fa-google" />
                  </Link>
                </div>
              </div>{" "}
            </footer>
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
