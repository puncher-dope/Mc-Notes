
import { NotFoundPage, LoginPage, AuthPage, TodoListPage } from "pages";
import { createBrowserRouter } from "react-router-dom";
import { MainLayout, ProtectedRoute } from "shared/ui";



export const router = createBrowserRouter([
  {
    path: "/register",
    element: <LoginPage />,
  },
  {
    path:'/auth',
    element:<AuthPage />
  },
  {
    element: <ProtectedRoute/>,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <TodoListPage />,
          }
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
