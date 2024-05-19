'use client'

import Image from "next/image";

import { Button, Input } from "@nextui-org/react";
import React from "react";

import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const ref = React.useRef<HTMLFormElement>(null);

    const registerHandler = async (form: FormData) => {

        const res = await signIn("credentials", {
            "username": form.get("username"),
            "password": form.get("password"),
            redirect: false
        });

        if (res?.error) {
            toast.error("Invalid credentials");
            return;
        }

        router.push("/home");
        toast.success("Success Login");

    }

    return (
        <>
            <div className="flex flex-col lg:flex-row mt-[100px] justify-center items-center w-full">
                <div className="w-[300px] max-w-[450px]">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-700 to-red-500 lg:p-4"> ¡Hey, Hey! </h1>
                    <p className="text-md md:text-xl text-slate-600 px-5 mb-5">
                        Es increible volverte a ver.
                    </p>

                    <form ref={ref} action={registerHandler} className="flex flex-col gap-2">
                        <Input name="username" type="text" label="Usuario" autoComplete="off" color="secondary" isRequired />
                        <Input name="password" type="password" label="Contraseña" autoComplete="off" color="secondary" isRequired />

                        <Button type="submit" color="secondary" > Iniciar Sesión </Button>
                    </form>
                </div>

                <Image src="/login.png" width={600} height={600} quality={100} alt="barber image" />
            </div>
        </>
    )
}