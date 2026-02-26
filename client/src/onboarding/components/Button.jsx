import { motion } from "framer-motion";
import motionConfig from "../../design/motion";
import "./Button.css";

export default function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
}) {
  return (
    <motion.button
      className={`ob-btn ob-btn--${variant}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      whileHover={disabled ? undefined : motionConfig.button.hover}
      whileTap={disabled ? undefined : motionConfig.button.tap}
    >
      {children}
    </motion.button>
  );
}
