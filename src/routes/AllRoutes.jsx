import {  Route, Routes } from "react-router-dom"
import PublicRoutes from "./PublicRoutes"
import Signin from "../pages/Signin"
import Signup from "../pages/Sigup"
import PrivateRoutes from "./PrivateRoutes"
import Home from "../components/Home"
import CreatePost from "../components/CreatePost"
import EditPost from "../components/EditPost"
import MyPosts from "../components/MyPosts"

const AllRoutes = () => {
  return (
      <Routes>

        <Route element={<PublicRoutes />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/edit-post/:postId" element={<EditPost />} />
        </Route>

      </Routes>
  )
}

export default AllRoutes