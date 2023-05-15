import { NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'
import Logo from "../Logo/Logo"
import { useState } from "react"
import Modal from "../Modal"

export default function Navbar() {
    const user = useSelector(state => state.user.user)
    const cart = useSelector(state => state.order.cart)
    const [showNav, setShowNav] = useState(false)
    
  return (
    <>
    <Logo />

    <svg onClick={() => setShowNav(true)} xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>

    {showNav && <Modal clickHandler={() => setShowNav(false)} />}

    <nav className={showNav ? 'navIn' : 'navOut'}>
        <svg onClick={() => setShowNav(false)} xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" ><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>

        <ul>
            <li>
                <NavLink onClick={() => setShowNav(false)} to='/store' end>Products</NavLink>
            </li>

            {user && user.role === 'user' && <li>
                <NavLink onClick={() => setShowNav(false)} to='orders'>Orders</NavLink>
            </li>}

            {user && user.role === 'admin' && <li>
                <NavLink onClick={() => setShowNav(false)} to='admin/all-users'>All Users</NavLink>
            </li>}

            {user && user.role === 'admin' && <li>
                <NavLink onClick={() => setShowNav(false)} to='admin/all-orders'>All Orders</NavLink>
            </li>}

            {user && user.role === 'user' && <li>
                    <NavLink onClick={() => setShowNav(false)} to='cart'>
                        Cart
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"></path><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle></svg>
                        {cart.length > 0 && <p>{cart.length}</p>}
                    </NavLink> </li>}

            {user ? <li>
                <NavLink onClick={() => setShowNav(false)} to='/logout'>Logout</NavLink>
            </li> : <li>
                <NavLink onClick={() => setShowNav(false)} to='/login'>Login</NavLink>
            </li>}
        </ul>
    </nav>
    </>
  )
}
