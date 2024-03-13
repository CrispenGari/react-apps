import {
  withDangerTheme,
  withPrimaryTheme,
  withSecondaryTheme,
} from "./hoc/theme";

export const Button = ({ title, color, backgroundColor, onClick }) => (
  <button
    style={{
      backgroundColor,
      color,
      border: "none",
    }}
    className="btn"
    onClick={onClick}
  >
    {title}
  </button>
);

export const PrimaryButton = withPrimaryTheme(Button);
export const SecondaryButton = withSecondaryTheme(Button);
export const DangerButton = withDangerTheme(Button);
