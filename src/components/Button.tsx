import { ButtonHTMLAttributes } from "react";

type ButtonVariant =
  | "accent"
  | "primary"
  | "secondary"
  | "outline-spruce"
  | "outline-white"
  | "ghost"
  | "ghost-amber";

type ButtonSize = "sm" | "default" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  pulse?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  accent:
    "bg-[var(--amber)] text-white border-transparent hover:shadow-[0_6px_20px_rgba(212,135,63,0.3)]",
  primary:
    "bg-[var(--spruce)] text-white border-transparent hover:shadow-[0_6px_20px_rgba(45,106,79,0.3)]",
  secondary:
    "bg-[var(--dark-navy)] text-white border-transparent hover:shadow-[0_6px_20px_rgba(40,44,62,0.3)]",
  "outline-spruce":
    "bg-transparent text-[var(--spruce)] border-[var(--spruce)] hover:bg-[var(--spruce)] hover:text-white",
  "outline-white":
    "bg-transparent text-white border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.5)]",
  ghost:
    "bg-[var(--spruce-pale)] text-[var(--spruce)] border-transparent hover:bg-[var(--spruce)] hover:text-white",
  "ghost-amber":
    "bg-[var(--amber-pale)] text-[var(--amber)] border-transparent hover:bg-[var(--amber)] hover:text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-[11px]",
  default: "px-8 py-3.5 text-[13px]",
  lg: "px-10 py-[18px] text-[14px]",
};

export function Button({
  variant = "primary",
  size = "default",
  href,
  pulse = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    font-semibold tracking-[0.5px] uppercase
    border-2 cursor-pointer
    transition-all duration-300
    hover:-translate-y-0.5
  `;

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${pulse ? "pulse-glow" : ""} ${className}`.trim();

  const style = {
    fontFamily: "var(--font-heading)",
    borderRadius: "var(--radius-button)",
    transitionTimingFunction: "var(--fox-ease)",
  };

  if (href) {
    return (
      <a href={href} className={classes} style={style}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} style={style} {...props}>
      {children}
    </button>
  );
}
