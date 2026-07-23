import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string
    click: () => void;
}


export function ButtonNavDash({label, click, value}: Props) {
    return(
        <button onClick={click} value={value} className="cursor-pointer bg-transparent hover:bg-black text-black font-medium hover:text-white py-1 px-1 border border-black hover:border-transparent rounded w-36 max-w-52 mx-auto">
            {label}
        </button>
    )
} 