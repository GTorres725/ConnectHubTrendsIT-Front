import axios from "axios";

export function getErrorMessage(err: unknown) {
    if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message;

        if (Array.isArray(message)) {
            return alert(message.join("\n"));
        }

        if (typeof message === "string") {
            return alert(message);
        }
    }

    return alert('Um erro inesperado ocorreu. Por favor, tente novamente.');
}