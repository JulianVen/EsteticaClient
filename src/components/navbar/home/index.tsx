'use client'

import React from "react";
import { signIn, useSession } from "next-auth/react";

import { HiScissors } from "react-icons/hi2";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export default function HomeNavbar() {
    const { data: session, status } = useSession();

    return (
        <Navbar shouldHideOnScroll>
            <NavbarBrand>
                <HiScissors className="mr-2" />
                <p className="font-bold text-inherit">Estética</p>
            </NavbarBrand>
            {
                !session ? (
                    <NavbarContent justify="end">
                        <NavbarItem>
                            <Button onPress={() => { signIn() }} variant="ghost" className="border-none">
                                Login
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="secondary" href="#" variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </NavbarContent>
                ) : (
                    <NavbarContent justify="end">
                        <NavbarItem className="hidden lg:flex">
                            <Button as={Link} color="secondary" href="/home" variant="flat">
                                Ir a dashboard
                            </Button>
                        </NavbarItem>
                    </NavbarContent>
                )
            }
        </Navbar>
    );
}