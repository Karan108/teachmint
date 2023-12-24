import { lazy, Suspense } from "react";
import "./App.css";
// import Error from "./components/Error";
// import UserDetails from "./components/UserDetails";
// import Users from "./components/Users";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Users = lazy(() => import("./components/Users"));
const Error = lazy(() => import("./components/Error"));
const UserDetails = lazy(() => import("./components/UserDetails"));

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<h1>Loading....</h1>}>
          <Users />
        </Suspense>
      ),
      errorElement: <Error />,
    },
    {
      path: "/users/:userId",
      element: (
        <Suspense fallback={<h1>Loading....</h1>}>
          <UserDetails />
        </Suspense>
      ),
    },
  ]);
  return <RouterProvider router={appRouter} />;
}

export default App;
