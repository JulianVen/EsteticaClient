'use client'

import { CiClock1 } from "react-icons/ci";

import React from 'react';

import { Service } from "@/lib/types/appointment";
import { Button, DatePicker, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, TimeInput, useDisclosure } from '@nextui-org/react';
import { getLocalTimeZone, today, Time } from "@internationalized/date";
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export default function ServiceCard({
    data
}: {
    data: Service
}
) {
    const { data: session } = useSession();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const scheduleAppointment = async (form: FormData) => {
        if (session) {
            const appointment = {
                "date": form.get("date"),
                "time": form.get("time"),
                "client": session.user.id,
                "service": data.id
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/appointment`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${session.user.token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(appointment)
                });

                const data = await response.json();
                if (response.ok) {
                    toast.success(data.message);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        }

    };

    return (
        <>
            <div className={`relative mx-10 shadow-md rounded-lg w-auto bg-gradient-to-r overflow-hidden min-w-[300px]`}>
                <p className="absolute text-4xl bg-white text-black p-2 rounded-lg top-2 right-2"> $ {data.price} </p>
                <img src={data.imageUrl} alt={`${data.id} image`} className="h-[300px] w-[300px] object-fill rounded-t-lg" />

                <div className="flex flex-col max-w-[300px] p-5">
                    <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-700 to-red-500"> {data.title}</p>
                    <p className="text-lg text-black/80 leading-none"> {data.description}</p>
                    <Button color='secondary' className='mt-10 w-full' onPress={onOpen}> Agendar </Button>
                </div>
            </div>

            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <div>
                                    <p className="text-3xl font-bold">{data.title}</p>
                                    <p className='text-md font-light leading-none'>{data.description}</p>
                                </div>
                            </ModalHeader>
                            <ModalBody>
                                <form action={scheduleAppointment}>
                                    <div className="flex flex-col w-full gap-4">
                                        <div>
                                            <p> Fecha </p>
                                            <DatePicker
                                                name="date"
                                                aria-label="date"
                                                minValue={today(getLocalTimeZone())}
                                                isRequired
                                            />
                                        </div>

                                        <div>
                                            <p> Hora </p>
                                            <TimeInput
                                                id="time"
                                                aria-label="time"
                                                labelPlacement="outside"
                                                defaultValue={new Time(11, 45)}
                                                startContent={(
                                                    <CiClock1 className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-5">
                                        <Button variant="light" onPress={onClose}>
                                            Cerrar
                                        </Button>
                                        <Button color="secondary" type="submit">
                                            Agendar
                                        </Button>
                                    </div>

                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>

    )

}