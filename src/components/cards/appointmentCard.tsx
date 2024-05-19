'use client'

import React from 'react';

import { Appointment } from "@/lib/types/appointment";
import { Button } from "@nextui-org/react";
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export default function AppointmentCard({
    data,
    load
}: {
    data: Appointment,
    load: () => void
}
) {
    const { data: session } = useSession();

    const cancelAppointment = React.useCallback(async ({ clientId, appointmentId }: { clientId: number, appointmentId: number }) => {
        if (session) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/appointment/client/${clientId}/appointment/${appointmentId}/cancel`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${session.user.token}`,
                        "Content-Type": "application/json"
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    toast.success(data.message);
                    load();
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        }

    }, [session]);

    const acceptAppointment = React.useCallback(async ({ clientId, appointmentId }: { clientId: number, appointmentId: number }) => {
        if (session) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/appointment/client/${clientId}/appointment/${appointmentId}/accept`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${session.user.token}`,
                        "Content-Type": "application/json"
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    toast.success(data.message);
                    load();
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        }

    }, [session]);

    return (
        <div className={`relative p-6 border rounded-lg min-h-[250px] w-full text-black`}>
            <h3 className="text-2xl leading-none"> {data.date}</h3>
            <h4 className="text-lg text-slate-500 leading-none"> {data.time}</h4>

            <div className="mt-5 w-full">
                <div>
                    <p className="text-xl"> {data.service.title} </p>
                    <p className="text-md leading-none" > {data.service.description}</p>
                </div>

                {
                    session?.user.role === "admin" && (
                        <>
                            <div className='mt-2'>
                                <p className="text-xl"> {data.client.firstName} </p>
                                <p className="text-md leading-none" > {data.client.email}</p>
                                <p className="text-md leading-none" > {data.client.phone}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Button onPress={() => { cancelAppointment({ clientId: data.client.id, appointmentId: data.id }) }} className="mt-5"> Cancelar </Button>
                                <Button color="secondary" onPress={() => { acceptAppointment({ clientId: data.client.id, appointmentId: data.id }) }} className="mt-5"> Aceptar </Button>
                            </div>
                        </>
                    )
                }

                {
                    data.canceled === false && data.accepted === false && session?.user.role === "user" && (
                        <div className="flex flex-wrap gap-2">
                            <Button onPress={() => { cancelAppointment({ clientId: data.client.id, appointmentId: data.id }) }} className="mt-5"> Cancelar </Button>
                        </div>
                    )
                }
            </div>

            {/* Label  */}
            <div className="absolute top-4 right-4 text-lg">
                {
                    data.canceled && !data.accepted && (
                        <p className="p-2 text-red-700 rounded-lg"> Cancelado </p>
                    )
                }

                {
                    !data.canceled && data.accepted && (
                        <p className="p-2 text-indigo-700 rounded-lg">  Registrado </p>
                    )
                }

                {
                    !data.canceled && !data.accepted && (
                        <p className="p-2 text-amber-700 rounded-lg">  Pendiente </p>
                    )
                }
            </div>
        </div>
    )

}