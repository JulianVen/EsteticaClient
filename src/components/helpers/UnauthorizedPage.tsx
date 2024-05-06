import { Button, Link } from "@nextui-org/react";
import { signIn } from "next-auth/react"

export default function UnauthorizedPage() {
    return (
        <div className="grid h-screen place-content-center bg-white px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-gray-200">403</h1>

                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

                <p className="mt-4 text-gray-500"> Parece que no has iniciado sesión. </p>

                <Button as={Link} href="/" variant="ghost" className="border-none">
                    Regresar
                </Button>
                <Button color="primary" onPress={signIn} className="m-5 p-5">
                    Inicar Sesión
                </Button>
            </div>
        </div>
    );
}