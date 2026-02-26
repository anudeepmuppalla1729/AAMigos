import "./ProgressBar.css";

export default function ProgressBar({ current, total }) {
  const pct = (current / total) * 100;
  return (
    <div className="ob-progress">
      <div className="ob-progress__bar">
        <div className="ob-progress__fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="ob-progress__text">
        Step {current} of {total}
      </span>
    </div>
  );
}
