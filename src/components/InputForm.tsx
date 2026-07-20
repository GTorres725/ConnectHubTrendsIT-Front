import { InputHTMLAttributes } from "react"

type InputFormProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string
}


export function InputForm({id, type, placeholder, label, ...props}: InputFormProps) {
    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={id}
                className="font-medium">
                    {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className="rounded-lg border p-3 outline-none focus:border-blue-500"
                {...props}
            />
        </div>
    )

}