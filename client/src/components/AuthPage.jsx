import { motion } from "framer-motion";
import useAuthStore from "../store/authStore";
import OrangeBubble from "./OrangeBubble";
import AuthForm from "./AuthForm";
import "./AuthPage.css";

const panelTransition = {
  duration: 0.7,
  ease: [0.65, 0, 0.35, 1],
};

export default function AuthPage() {
  const { mode } = useAuthStore();
  const isLogin = mode === "login";

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Orange Panel — slides between left and right */}
        <motion.div
          className="orange-panel"
          layout
          transition={panelTransition}
          animate={{
            left: isLogin ? "0%" : "55%",
            borderRadius: isLogin ? "0px 80px 80px 0px" : "80px 0px 0px 80px",
            scale: [1, 1.03, 1],
          }}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "45%",
          }}
        >
          <OrangeBubble />
        </motion.div>

        {/* Form Panel — opposite side of the orange panel */}
        <motion.div
          className={`form-panel ${isLogin ? "form-right" : "form-left"}`}
          layout
          transition={panelTransition}
        >
          <AuthForm />
        </motion.div>
      </div>
    </div>
  );
}
