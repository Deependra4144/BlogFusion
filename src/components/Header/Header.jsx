import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Themechanger from '../Themechanger'
import { IoMdMenu } from 'react-icons/io'
import Sidebar from '../../Sidebar'
function Header() {

  const authStatus = useSelector((state) => state.auth.status)
  const [toglaer, setToglaer] = useState(false)
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

  const menuToglaer = () => {
    setToglaer(prev => !prev)
  }
  return (
    <header className='py-3 shadow bg-gray-500 sticky top-0 z-10'>
      <Container>
        <nav className='flex'>
          <div className='mr-4 '>
            <Link to="/">
              <Logo width={100} />
            </Link>
          </div>
          <ul className='flex ml-auto space-x-2'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className='hidden md:block'>
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
              <li className='hidden md:block'>
                <LogoutBtn />
              </li>
            )}
            <li className='hidden md:inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
              <Themechanger />
            </li>
            <li className="block md:hidden">
              <IoMdMenu className="text-white" fontSize={26} onClick={menuToglaer} />
            </li>
          </ul>
          {toglaer && <Sidebar toglaer={toglaer} />}
        </nav>
      </Container>
    </header>
  )
}

export default Header
