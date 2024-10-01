import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/auth";
import { useEffect } from "react";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPassword from "./pages/ResetPassword";


//protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const{ isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />
  }
  return children;
};

// redirect authenticated user to homePage
const RedirectAuthenticatedUser = ({ children }) => {
  const{ isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />
  }

  return children;
};

function App() {

  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);
  
  const location = useLocation();
  const hideNavbarRoutes = ["/signup", "/login", "/verify-email", "/forgot-password", "/reset-password/:token"];

  return (
    <>
      
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<ProtectedRoute>
          <HomePage />
        </ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute>
          <CreatePage />
        </ProtectedRoute>} />
        <Route path="/signup" element={<RedirectAuthenticatedUser>
          <SignUpPage />
        </RedirectAuthenticatedUser>
        } 
        />
        <Route path="/profile" element={<ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
        />
        <Route path="/login" element={<RedirectAuthenticatedUser>
          <LoginPage />
        </RedirectAuthenticatedUser>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/forgot-password" element={<RedirectAuthenticatedUser>
          <ForgotPassword />
        </RedirectAuthenticatedUser>} />
        <Route path="/reset-password/:token"
        element={
          <RedirectAuthenticatedUser>
          <ResetPassword />
        </RedirectAuthenticatedUser>  }
        />
        {/* catch all routes */}
        <Route path='*'
        element={
          <Navigate to='/' replace />
        }
        />
      </Routes>
    </>
  )
}

export default App
