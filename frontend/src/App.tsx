import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Results } from './pages/Results';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { VerifyEmail } from './pages/auth/VerifyEmail';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { Features } from './pages/Features';
import { AuthProvider } from './context/AuthContext';
import { OptimizationProvider } from './context/OptimizationContext';
import { ThemeProvider } from './context/ThemeContext';
import { About } from './pages/About';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <OptimizationProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Public Routes */}
              <Route index element={<Landing />} />
              <Route path="features" element={<Features />} />
              <Route path="about" element={<About />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="verify-email" element={<VerifyEmail />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
              
              {/* Patient Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={['patient', 'admin']} />}>
                <Route path="dashboard" element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />
                <Route path="results" element={<Results />} />
              </Route>

              {/* Pharmacy Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={['pharmacy', 'admin']} />}>
                {/* We'll create this later, mapping to a placeholder for now */}
                <Route path="pharmacy-dashboard" element={<div className="text-white p-20 text-3xl">Pharmacy Dashboard Coming Soon</div>} />
              </Route>

              {/* Admin Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="admin" element={<div className="text-white p-20 text-3xl">Admin Dashboard Coming Soon</div>} />
              </Route>
            </Route>
          </Routes>
        </Router>
        </OptimizationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
