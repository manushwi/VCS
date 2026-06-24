"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

const variants = {
  primary:
    "bg-accent text-white px-7 py-3.5 shadow-[0_4px_20px_rgba(61,89,72,0.2)] hover:bg-accent2 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(61,89,72,0.3)]",
  outline:
    "bg-transparent text-ink px-7 py-3 border border-bd2 hover:border-accent hover:text-accent hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-ink3 px-6 py-3 hover:text-ink",
  wa: "bg-[#25D366] text-white px-7 py-3.5 hover:bg-[#20c059] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(37,211,102,0.3)]",
};

type Variant = keyof typeof variants;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, ...props }, ref) => (
    <button
      ref={ref}
      className={`btn inline-flex items-center gap-2 text-sm font-medium tracking-wider rounded-full transition-all cursor-pointer ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";
export default Button;
