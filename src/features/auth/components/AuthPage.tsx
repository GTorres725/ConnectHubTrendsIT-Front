"use client";

import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export function AuthPage () {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <section className="w-full max-w-sm rounded-xl bg-white p8 shadow-lg">
                <h1 className="mb-2 text-center text-3xl font-bold">Connect Hub</h1>
                <p className="mb-8 text-center text-gray-500">Sistema de gerenciamento de chamados</p>

                {isLogin ? <LoginForm/> : <RegisterForm/>}

                <button onClick={() => setIsLogin(!isLogin)} className="mt-6 w-full text-sm text-blue-600 hover:underline cursor-pointer">
                    {isLogin ? `Registre-se aqui!` : "Realizar login"}
                </button>
            </section>
        </main>
    )
}