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
      <div className={`auth-card ${isLogin ? "is-login" : "is-signup"}`}>
        {/* Orange Panel — swaps position via flex-direction driven by parent class */}
        <motion.div
          className="orange-panel"
          layout
          transition={panelTransition}
          // The pop-out scale effect is maintained
          animate={{
            scale: [1, 1.03, 1],
          }}
        >
          <OrangeBubble />
        </motion.div>

        {/* Form Panel — automatically fills remaining space and swaps position */}
        <motion.div className="form-panel" layout transition={panelTransition}>
          <AuthForm />
        </motion.div>
      </div>
    </div>
  );
}
