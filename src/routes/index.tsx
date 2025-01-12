import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Layout from '../layout'
import Home from '../pages/home'
import Login from '../pages/login'
import { useAuthentication } from '../context/authenticationContext'

const AppRoutes = () => {
    const { isAuthentication } = useAuthentication()

    return (
        <Router>
            <Routes>
            <Route 
                    path="/login" 
                    element={
                        isAuthentication ? (
                            <Navigate to="/" />
                        ) : (
                            <Login />
                        )
                    } 
                />
                
                <Route
                    path="/"
                    element={
                        isAuthentication ? (
                            <Layout />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                >
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes