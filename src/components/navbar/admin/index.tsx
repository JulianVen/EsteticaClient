'use client'

import React from "react";
import { HiScissors } from "react-icons/hi2";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";

export default function UserNavbar() {
    const { data: session } = useSession();

    const exportClient = async () => {
        if (session) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/client/report`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${session.user.token}`,
                        "Content-Type": "application/octet-stream"
                    }
                });

                // Verificar si la respuesta es exitosa (código 200)
                if (response.ok) {
                    // Convertir la respuesta en un blob
                    const blob = await response.blob();

                    // Obtener la fecha y hora actual
                    const now = new Date();
                    const formattedDate = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
                    const formattedTime = `${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;

                    // Nombre del archivo con el formato deseado
                    const fileName = `client-report-${formattedDate}${formattedTime}.xlsx`;

                    // Crear un enlace temporal
                    const url = window.URL.createObjectURL(blob);

                    // Crear un elemento <a> para iniciar la descarga
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();

                    // Liberar el objeto URL
                    window.URL.revokeObjectURL(url);
                } else {
                    console.error("Error en la petición fetch:", response.status);
                }
            } catch (error) {
                console.error("Error exportando datos:", error);
            }
        };
    }

    const exportRevenues = async () => {
        if (session) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/service/report`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${session.user.token}`,
                        "Content-Type": "application/octet-stream"
                    }
                });

                // Verificar si la respuesta es exitosa (código 200)
                if (response.ok) {
                    // Convertir la respuesta en un blob
                    const blob = await response.blob();

                    // Obtener la fecha y hora actual
                    const now = new Date();
                    const formattedDate = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
                    const formattedTime = `${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;

                    // Nombre del archivo con el formato deseado
                    const fileName = `revenues-report-${formattedDate}${formattedTime}.xlsx`;

                    // Crear un enlace temporal
                    const url = window.URL.createObjectURL(blob);

                    // Crear un elemento <a> para iniciar la descarga
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();

                    // Liberar el objeto URL
                    window.URL.revokeObjectURL(url);
                } else {
                    console.error("Error en la petición fetch:", response.status);
                }
            } catch (error) {
                console.error("Error exportando datos:", error);
            }
        };
    }

    const menuItems = [
        {
            title: "Citas",
            href: "/home"
        },
        {
            title: "Servicios",
            href: "/home/services"
        },
        {
            title: "Reporte ganancias",
            action: () => { exportRevenues() }
        },
        {
            title: "Reporte clientes",
            action: () => { exportClient() }
        }
    ];

    return (
        <Navbar disableAnimation isBordered>
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <Link href="/" className="text-purple-700">
                        <HiScissors className="mr-2" />
                        <p className="font-bold text-inherit">Estética</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="end">
                <NavbarBrand>
                    <Link href="/" className="text-purple-700">
                        <HiScissors className="mr-2" />
                        <p className="font-bold text-inherit">Estética</p>
                    </Link>
                </NavbarBrand>
                <NavbarItem>
                    <Link color="foreground" href="/home">
                        Citas
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/home/services">
                        Servicios
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" onPress={() => { exportRevenues() }}>
                        Reportes Ganancias
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" onPress={() => { exportClient() }}>
                        Reportes Clientes
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <Button color="secondary" onPress={() => {
                        signOut();
                    }} variant="flat">
                        Log out
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={index}>
                        <Link href={item.href} onPress={item.action} color="secondary">
                            {item.title}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
