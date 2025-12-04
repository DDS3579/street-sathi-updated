import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import RedirectBackend from "./pages/ext-home";
import DashboardLayout from "./app/dashboard/layout";
import Admin from "./app/dashboard/admin/Admin";
import User from "./app/dashboard/user/User";
import Rescuer from "./app/dashboard/rescuer/Rescuer";
import Users from "./app/dashboard/admin/Users";
import Rescuers from "./app/dashboard/admin/Rescuers";
import Analytics from "./app/dashboard/admin/Analytics";
import Logs from "./app/dashboard/admin/Logs";
import Settings from "./app/dashboard/admin/Settings";
import NewRequest from "./app/dashboard/user/NewRequest";
import Requests from "./app/dashboard/user/Requests";
import History from "./app/dashboard/user/History";
import Contacts from "./app/dashboard/user/Contacts";
import Locations from "./app/dashboard/user/Locations";
import Profile from "./app/dashboard/user/Profile";
import ActiveMissions from "./app/dashboard/rescuer/ActiveMissions";
import AvailableRequests from "./app/dashboard/rescuer/AvailableRequests";
import Stats from "./app/dashboard/rescuer/Stats";
import Protocols from "./app/dashboard/rescuer/Protocols";
import Chat from "./app/dashboard/rescuer/Chat";
import RescuerProfile from "./app/dashboard/rescuer/Profile";
import Landing from "./pages/home";
import Login from "./auth/Login";
import RegisterUser from "./auth/RegisterUser";
import RegisterRescuer from "./auth/RegisterRescuer";
import OTPPage from "./auth/OTPPage";
import "./App.css";
import { ExternalLink } from "lucide-react";

function RoleRedirect() {
  const { user } = useAuth();
  return <Navigate to={`/dashboard/${user.role}`} replace />;
}

function App() {
  return (
    <Routes>
      {/* Temporary Path for Hackathon fix later on */}
      <Route
        path="/"
        element={<RedirectBackend />}
      />
      {/* Temporary Path end */}

      {/* <Route path="/" element={<Landing />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/registerUser" element={<RegisterUser />} />
      <Route path="/registerRescuer" element={<RegisterRescuer />} />
      <Route path="/verify-otp" element={<OTPPage />} />
      <Route path="/otp" element={<OTPPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<RoleRedirect />} />
          <Route path="admin">
            <Route index element={<Admin />} />
            <Route path="users" element={<Users />} />
            <Route path="rescuers" element={<Rescuers />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="logs" element={<Logs />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="user">
            <Route index element={<User />} />
            <Route path="new-request" element={<NewRequest />} />
            <Route path="requests" element={<Requests />} />
            <Route path="history" element={<History />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="locations" element={<Locations />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="rescuer">
            <Route index element={<Rescuer />} />
            <Route path="active" element={<ActiveMissions />} />
            <Route path="available" element={<AvailableRequests />} />
            <Route path="stats" element={<Stats />} />
            <Route path="protocols" element={<Protocols />} />
            <Route path="chat" element={<Chat />} />
            <Route path="profile" element={<RescuerProfile />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
