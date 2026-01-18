import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Repos from "./pages/Repos";
import Activity from "./pages/Activity";
import DashboardLayout from "./component/DashboardLayout";
import Footer from "./component/Footer";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/repos"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Repos />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/activity"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Activity />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* <Footer /> */}

    </>

  );
}

export default App;
