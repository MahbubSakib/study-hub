import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Assignments from "../pages/Assignments/Assignments";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import CreateAssignments from "../pages/CreateAssignments/CreateAssignments";
import MyAttemptedAssignments from "../pages/MyAttemptedAssignments/MyAttemptedAssignments";
import PrivateRoute from "./PrivateRoute";
import AssignmentUpdate from "../pages/Assignments/AssignmentUpdate";
import AssignmentDetails from "../pages/Assignments/AssignmentDetails";
import PendingAssignments from "../pages/PendingAssignments/PendingAssignments";
import Error404 from "../pages/Error/Error404";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/assignments',
                element: <Assignments></Assignments>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/create-assignments',
                element: <PrivateRoute><CreateAssignments></CreateAssignments></PrivateRoute>
            },
            {
                path: '/assignmentUpdate/:id',
                element: <PrivateRoute><AssignmentUpdate></AssignmentUpdate></PrivateRoute>
            },
            {
                path: '/assignmentDetails/:id',
                element: <PrivateRoute><AssignmentDetails></AssignmentDetails></PrivateRoute>
            },
            {
                path: '/update-assignments/:id',
                element: <PrivateRoute><CreateAssignments></CreateAssignments></PrivateRoute>
            },
            {
                path: '/my-attempted-assignments',
                element: <PrivateRoute><MyAttemptedAssignments></MyAttemptedAssignments></PrivateRoute>
            },
            {
                path: '/pending-assignments',
                element: <PrivateRoute><PendingAssignments></PendingAssignments></PrivateRoute>
            },
        ]
    },
    {
        path: "*",
        element: <Error404></Error404>
    }
]);


export default Router;