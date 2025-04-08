import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { LogoutBtn } from './components'
import Themechanger from './components/Themechanger'

function Sidebar({ toglaer }) {
    const authStatus = useSelector((state) => state.auth.status)
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
    return (

        <ul className={`
            h-screen bg-gray-400 text-white absolute top-16 right-0
            ${toglaer ? 'w-1/4' : 'w-0'}
            transition-all duration-500 ease-in overflow-hidden
            flex flex-col ml-auto space-y-4
        `}>
            {navItems.map((item) =>
                item.active ? (
                    <li key={item.name}>
                        <NavLink
                            to={item.slug}
                            // onClick={() => nevigate(item.slug)}
                            className={({ isActive }) => isActive ? 'inline-block px-6 py-2 bg-blue-100 rounded-full font-bold' : 'inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'}
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ) : null
            )}
            {authStatus && (
                <li>
                    <LogoutBtn />
                </li>
            )}
            <Themechanger />
        </ul>
    )
}

export default Sidebar
