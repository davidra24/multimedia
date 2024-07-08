import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { AddContent } from '../app/main/AddContent';
import { Home } from '../app/main/Home';
import { Login } from '../app/users/Login';
import { Register } from '../app/users/Register';
import { ProtectedRoute } from './ProtectedRoute';
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "", element:
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
            },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            {
                path: "/crear", element:
                    <ProtectedRoute>
                        <AddContent />
                    </ProtectedRoute>
            },
        ],
    },
]);