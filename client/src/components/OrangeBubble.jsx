import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "../store/authStore";
import "./OrangeBubble.css";

const textVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: "easeIn" } },
};

export default function OrangeBubble() {
  const { mode, role, toggleMode, toggleRole } = useAuthStore();

  const isLogin = mode === "login";
  const isAgent = role === "agent";

  return (
    <div className="orange-panel__content">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${mode}-${role}`}
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 className="orange-panel__heading">
            {isAgent ? "Hola, Agent" : "Hola, AAmigos"}
          </h2>
          <p className="orange-panel__subtext">
            {isLogin
              ? isAgent
                ? "New here? Create your agent account"
                : "Not a User?"
              : "Already have an account?"}
          </p>
          <button className="orange-panel__btn" onClick={toggleMode}>
            {isLogin ? "Register" : "Log In"}
          </button>
        </motion.div>
      </AnimatePresence>

      <button className="orange-panel__switch" onClick={toggleRole}>
        {isAgent ? "Are You A Customer ?" : "Are You An Agent ?"}
      </button>
    </div>
  );
}
