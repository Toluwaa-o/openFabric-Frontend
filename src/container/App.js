import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Page from './Page'
import Products from '../pages/Products/Products'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Store from '../pages/Store/Store'
import RouteProtection from '../pages/routeProtection'
import AdminRoutes from '../pages/AdminRoutes'
import Orders from '../pages/Orders/Orders'
import Order from '../pages/Orders/Order'
import AllOrders from '../pages/Orders/AllOrders'
import User from '../pages/User/User'
import AllUsers from '../pages/User/AllUsers'
import Cart from '../pages/Orders/Cart/Cart'
import ExpandedProduct, { getData } from '../pages/Products/ExpandedProduct'
import Reviews, {fetchRev} from '../pages/Reviews/Reviews'
import Logout from '../components/Auth/Logout'
import Error from '../components/Errors/Popup'
import { memo } from 'react'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Page />} errorElement={<Error />} >
      <Route path='store' element={<Store />} >
        <Route index element={<Products />} />
        <Route path='product/:id/reviews' element={<Reviews />} loader={fetchRev} />
        <Route path='product/:id' element={<ExpandedProduct />} loader={getData} />

        {/* admin only routes */}
        <Route path='admin/all-users' element={<AdminRoutes><AllUsers /></AdminRoutes>} />
        <Route path='admin/all-orders' element={<AdminRoutes><AllOrders /></AdminRoutes>} />

        {/* Logged in user only routes */}
        <Route path='orders' element={<RouteProtection><Orders /></RouteProtection>} />
        <Route path='cart' element={<RouteProtection><Cart /></RouteProtection>} />
        <Route path='user' element={<RouteProtection><User /></RouteProtection>} />
        <Route path='orders/:id' element={<RouteProtection><Order /></RouteProtection>} />

      </Route>
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Register />} />
      <Route path='logout' element={<Logout />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default memo(App)