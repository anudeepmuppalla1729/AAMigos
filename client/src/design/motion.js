/* Centralized Motion Config */
const ease = [0.22, 1, 0.36, 1];

const motion = {
  page: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
    transition: { duration: 0.35, ease },
  },
  card: {
    initial: { opacity: 0, y: 30, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 },
    transition: { duration: 0.4, ease },
  },
  inputFocus: {
    scale: 1.01,
    transition: { duration: 0.2, ease },
  },
  button: {
    hover: { scale: 1.02, transition: { duration: 0.2, ease } },
    tap: { scale: 0.97, transition: { duration: 0.1, ease } },
  },
  stagger: {
    animate: { transition: { staggerChildren: 0.06 } },
  },
  item: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease } },
  },
};

export default motion;
