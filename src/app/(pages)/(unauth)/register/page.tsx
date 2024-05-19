'use client'

import HomeNavbar from "@/components/navbar/home";

import Image from "next/image";

import { Button, Input } from "@nextui-org/react";
import { toast } from "sonner";
import React from "react";

export default function RegisterPage() {
    const ref = React.useRef<HTMLFormElement>(null);

    const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);

        const client = {
            "username": form.get("username"),
            "password": form.get("password"),
            "firstName": form.get("firstName"),
            "lastName": form.get("lastName"),
            "email": form.get("email"),
            "phone": form.get("phone"),
            "role": "user"
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(client)
        })

        const data = await res.json();
        if (res.ok && data) {
            ref.current?.reset();
            toast.success(data.message);
            return;
        }

        toast.error(data.message);
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row mt-[60px] justify-center items-center w-full">
                <div className="w-[300px] max-w-[450px]">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-700 to-red-500 lg:p-4"> ¡Hola! </h1>
                    <p className="text-md md:text-xl text-slate-600 px-5 mb-5">
                        Bienvenido, estamos contentos de contar contigo.
                    </p>

                    <form ref={ref} onSubmit={registerHandler} className="flex flex-col gap-2">
                        <Input name="username" type="text" label="Usuario" autoComplete="off" color="secondary" isRequired />
                        <Input name="password" type="password" label="Contraseña" autoComplete="off" color="secondary" isRequired />
                        <Input name="firstName" type="text" label="Nombre" autoComplete="off" color="secondary" isRequired />
                        <Input name="lastName" type="text" label="Apellido" autoComplete="off" color="secondary" isRequired />
                        <Input name="email" type="email" label="Correo" autoComplete="off" color="secondary" isRequired />
                        <Input name="phone" type="phone" label="Teléfono" autoComplete="off" color="secondary" isRequired />

                        <Button type="submit" color="secondary" > Registrar </Button>
                    </form>
                </div>

                <Image src="/register.png" width={600} height={600} quality={100} alt="barber image" />
            </div>
        </>
    )
}