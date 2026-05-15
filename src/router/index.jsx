import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";

import Dashboard from "../pages/Dashboard";
import CreateJourney from "../pages/CreateJourney";
import EditJourney from "../pages/EditJourney";
import About from "../pages/About";
import Journey from "../pages/Journey";

export const router = createBrowserRouter([

    /* PUBLIC */
    {
        path: "/",
        element: <Home />,
    },

    {
        path: "/login",
        element: <Login />,
    },

    {
        path: "/jornada/:slug",
        element: <Journey />,
    },
    {
        path: "/sobre",
        element: <About />,
    },

    /* PROTECTED */
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },

    {
        path: "/dashboard/journeys/new",
        element: (
            <ProtectedRoute>
                <CreateJourney />
            </ProtectedRoute>
        ),
    },

    {
        path: "/dashboard/journeys/:id/edit",
        element: (
            <ProtectedRoute>
                <EditJourney />
            </ProtectedRoute>
        ),
    },

]);