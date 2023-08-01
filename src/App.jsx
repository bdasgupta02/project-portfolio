import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CircularProgress } from "@mui/material"
/* Pages */
import Cover from "./pages/Cover"
import Project from "./pages/Project"

const router = createBrowserRouter([
    {
        path: "/",
        Component() {
            return <Cover />
        },
    },
    {
        path: "/project/:pid",
        Component() {
            return <Project />
        },
    },
])

const App = () => {
    return (
        <RouterProvider
            router={router}
            fallbackElement={<CircularProgress color="#292929" />}
        />
    )
}

export default App
