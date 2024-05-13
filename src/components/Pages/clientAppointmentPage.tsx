'use client'

import React from 'react';
import AppointmentCard from "@/components/cards/appointmentCard";
import { Appointment } from "@/lib/types/appointment";
import { useSession } from "next-auth/react";
import { Spinner } from '@nextui-org/react';

export default function ClientAppointmentPage() {
    const { data: session } = useSession();
    const [appointments, setAppointments] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true); // Nuevo estado de carga

    React.useEffect(() => {
        loadAppointments();
    }, [session]);

    const loadAppointments = async () => {
        if (session) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/appointment/client/${session.user.id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${session.user.token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setAppointments(data.response);
                } else {
                    setAppointments([]);
                    console.error("Error fetching appointments:", response.statusText);
                }
            } catch (error) {
                setAppointments([]);
                console.error("Error fetching appointments:", error);
            } finally {
                setIsLoading(false);
            }
        };
    }

    return (
        <div >
            <div className="flex flex-col justify-center items-left w-full p-10 mt-5">
                <h1 className="block font-bold text-2xl md:text-4xl"> Próxima citas 🖐️ </h1>
                <p className="text-md md:text-xl text-slate-600">
                    ¡Aquí encontrarás todas tus citas!
                </p>
            </div>

            {isLoading ? (
                <div className="w-full flex justify-center">
                    <Spinner color='default' />
                </div>
            ) : (
                <div className="w-full flex flex-wrap gap-5 justify-left px-10 rounded-xl">
                    {appointments.length !== 0 ? (
                        appointments.map((appointment: Appointment) => (
                            <AppointmentCard key={appointment.id} data={appointment} load={loadAppointments} />
                        ))
                    ) : (
                        <p className="mx-10 mt-[-40px] bg-slate-100 w-full rounded-xl px-5 py-10"> No hay citas de momento </p>
                    )}
                </div>
            )}

        </div>
    );
}