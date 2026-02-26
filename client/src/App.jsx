import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import OnboardingLayout from "./onboarding/OnboardingLayout";
import ProfilePage from "./onboarding/pages/ProfilePage";
import AddressPage from "./onboarding/pages/AddressPage";
import VerificationPage from "./onboarding/pages/VerificationPage";

function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0e1117",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#e6edf3",
        fontFamily: "'Poppins', sans-serif",
        fontSize: "1.2rem",
      }}
    >
      🎉 Dashboard — Onboarding Complete!
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />

        {/* Role-based onboarding: /customer/onboarding/... or /agent/onboarding/... */}
        <Route path="/:role/onboarding" element={<OnboardingLayout />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="address" element={<AddressPage />} />
          <Route path="verification" element={<VerificationPage />} />
        </Route>

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
