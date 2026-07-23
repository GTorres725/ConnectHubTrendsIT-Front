import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function ButtonLogin({children, className, ...props}: ButtonProps) {
    return (
        <button
            className={
                `className="
                    cursor-pointer
                    rounded-xl
                    border
                    border-zinc-800
                    bg-transparent
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-blue-700
                    transition-all
                    duration-200    
                    hover:border-blue-800
                    hover:bg-blue-500/5 ${className ?? ""}`
            }
            {...props}
        >
            {children}
        </button>
    )
}