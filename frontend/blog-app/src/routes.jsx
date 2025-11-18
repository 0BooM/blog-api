import MainLayout from "./MainLayout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Post from "./pages/Post";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
const routes = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "posts/:id", element: <Post /> },
    ],
  },
];

export default routes;
