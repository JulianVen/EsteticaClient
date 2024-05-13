'use client'

import { useSession } from "next-auth/react";

import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { HiScissors } from "react-icons/hi2";

export default function HomeNavbar() {
    const { data: session, status } = useSession();

    return (
        <Navbar shouldHideOnScroll>
            <NavbarBrand>
                <Link href="/" className="text-purple-700">
                    <HiScissors className="mr-2" />
                    <p className="font-bold text-inherit">Estética</p>
                </Link>
            </NavbarBrand>
            {
                !session ? (
                    <NavbarContent justify="end">
                        <NavbarItem>
                            <Button as={Link} href="/login" variant="ghost" className="border-none">
                                Login
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="secondary" href="/register" variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </NavbarContent>
                ) : (
                    <NavbarContent justify="end">
                        <NavbarItem className="lg:flex">
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