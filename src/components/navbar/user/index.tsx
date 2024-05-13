'use client'

import React from "react";
import { HiScissors } from "react-icons/hi2";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";

export default function UserNavbar() {
    const menuItems = [
        {
            title: "Mis citas",
            href: "/home"
        },
        {
            title: "Agendar cita",
            href: "/home/schedule"
        }
    ];

    return (
        <Navbar disableAnimation isBordered>
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <HiScissors className="mr-2" />
                    <p className="font-bold text-inherit">Estética</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="end">
                <NavbarBrand>
                    <HiScissors className="mr-2" />
                    <p className="font-bold text-inherit">Estética</p>
                </NavbarBrand>
                <NavbarItem>
                    <Link color="foreground" href="/home">
                        Mis citas
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/home/schedule">
                        Agendar cita
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <Button color="secondary" onPress={() => { signOut() }} variant="flat">
                        Log out
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={index}>
                        <Link href={item.href} color="secondary">
                            {item.title}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
