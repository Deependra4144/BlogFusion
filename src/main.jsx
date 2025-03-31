import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout, Login } from "./components/index.js"
import Addpost from './pages/Addpost.jsx'
import AllPost from './pages/AllPost.jsx'
import Home from './pages/Home.jsx'
import Signup from "./pages/Signup.jsx"
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <AuthLayout authentication={false}>
            <Home />
          </AuthLayout>
        )
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: '/all-posts',
        element: (
          <AuthLayout authentication={true}>
            <AllPost />
          </AuthLayout>
        )
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout authentication={true}>
            <Addpost />
          </AuthLayout>
        )
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication={true}>
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path: '/post/:slug',
        element: <Post />
      }

    ]
  }
])
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       {
//         path: '/',
//         element: (
//           <AuthLayout authentication={false}>
//             <Home />
//           </AuthLayout>
//         )
//       },
//       {
//         path: '/login',
//         element: (
//           <AuthLayout authentication={false}>
//             <Login />
//           </AuthLayout>
//         )
//       },
//       {
//         path: '/signup',
//         element: (
//           <AuthLayout authentication={false}>
//             <Signup />
//           </AuthLayout>
//         )
//       },
//       {
//         path: '/all-posts',
//         element: (
//           <AuthLayout authentication={true}> {/* Protected Route */}
//             <AllPost />
//           </AuthLayout>
//         )
//       },
//       {
//         path: '/add-post',
//         element: (
//           <AuthLayout authentication={true}> {/* Protected Route */}
//             <Addpost />
//           </AuthLayout>
//         )
//       },
//       {
//         path: '/edit-post/:slug',
//         element: (
//           <AuthLayout authentication={true}> {/* Protected Route */}
//             <EditPost />
//           </AuthLayout>
//         )
//       },
//       {
//         path: '/post/:slug',
//         element: <Post /> // No authentication required
//       }
//     ]
//   }
// ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
