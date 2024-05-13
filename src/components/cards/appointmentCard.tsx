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

    return (
        <div className={`p-6 shadow-md rounded-lg min-h-[250px] w-[300px] bg-gradient-to-r  ${data.canceled === true ? "from-red-700 to-orange-500" : "from-indigo-700 to-blue-500"} text-white`}>
            <h3 className="text-4xl leading-none"> {data.date}</h3>
            <h4 className="text-xl text-slate-200 leading-none"> {data.time}</h4>

            <div className="mt-5 w-full">
                <div>
                    <p className="text-2xl"> {data.service.title} </p>
                    <p className="text-lg leading-none" > {data.service.description}</p>
                </div>

                {
                    data.canceled === false && (
                        <div>
                            <Button onPress={() => { cancelAppointment({ clientId: data.client.id, appointmentId: data.id }) }} className="bg-slate-200 mt-5"> Cancelar </Button>
                        </div>
                    )
                }
            </div>
        </div>
    )

}