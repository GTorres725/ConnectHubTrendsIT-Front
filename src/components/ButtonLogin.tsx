import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function ButtonLogin({children, className, ...props}: ButtonProps) {
    return (
        <button
            className={`cursor-pointer rounded-lg bg-sky-600 p-3 font-semibold text-white transition hover:bg-sky-700 ${className ?? ""}`}
            {...props}
        >
            {children}
        </button>
    )
}