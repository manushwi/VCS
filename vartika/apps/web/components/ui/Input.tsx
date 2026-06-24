"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = "", ...props }, ref) => (
    <div className="flex-1">
      {label && (
        <label className="block text-xs tracking-widest uppercase text-ink3 mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full h-12 bg-bg border border-bd2 rounded-8 px-4 text-[15px] text-ink outline-none transition-border focus:border-accent focus:shadow-[0_0_0_3px_rgba(61,89,72,0.1)] placeholder:text-ink4 ${className}`}
        {...props}
      />
    </div>
  )
);

Input.displayName = "Input";
export default Input;
