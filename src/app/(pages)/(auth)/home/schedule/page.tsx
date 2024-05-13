'use client'

import ServiceCard from "@/components/cards/serviceCard";
import { Service } from "@/lib/types/appointment";
import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React from 'react';

export default function SchedulePage() {
    const { data: session } = useSession();

    const [isLoading, setIsLoading] = React.useState(true);
    const [services, setServices] = React.useState([]);

    React.useEffect(() => {
        loadServices();
    }, [session]);

    const loadServices = async () => {
        if (session) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/service`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${session.user.token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setServices(data.response);
                } else {
                    setServices([]);
                    console.error("Error fetching appointments:", response.statusText);
                }
            } catch (error) {
                setServices([]);
                console.error("Error fetching appointments:", error);
            } finally {
                setIsLoading(false);
            }
        };
    }

    return (
        <div >
            <div className="flex flex-col justify-center items-left w-full p-10 mt-5">
                <h1 className="block font-bold text-2xl md:text-4xl"> Servicios💡</h1>
                <p className="text-md md:text-xl text-slate-600">
                    ¿Qué estás buscando?
                </p>
            </div>

            {isLoading ? (
                <div className="w-full flex justify-center">
                    <Spinner color='default' />
                </div>
            ) : (
                <div className="w-full flex flex-wrap gap-5 justify-left py-5 rounded-xl">
                    {
                        services.length !== 0 ? (
                            services.map((service: Service) => (
                                <ServiceCard key={service.id} data={service} />
                            ))
                        ) : (
                            <p className="mx-10 mt-[-40px] bg-slate-100 w-full rounded-xl px-5 py-10"> No hay servicios de momento </p>
                        )
                    }
                </div>
            )}
        </div>
    );
}