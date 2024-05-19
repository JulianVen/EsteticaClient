'use client'

import { MdDelete } from "react-icons/md";


import { Service } from "@/lib/types/appointment";
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useState } from "react";

export default function ServiceAdminCard({
    data,
    load
}: {
    data: Service,
    load: () => void
}
) {
    const { data: session } = useSession();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);
    const [price, setPrice] = useState(String(data.price));
    const [imageUrl, setImageUrl] = useState(data.imageUrl);

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

    const modifyAppointment = async (form: FormData) => {
        if (session) {

            const service = {
                title: form.get("title"),
                description: form.get("description"),
                price: Number(form.get("price")),
                imageUrl: form.get("imageUrl")
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/service/${data.id}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${session.user.token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(service)
                });

                const res = await response.json();
                if (response.ok) {
                    toast.success(res.message);
                    load();
                } else {
                    toast.error(res.message);
                }
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        }

    };

    const deleteAppointment = async () => {
        if (session) {

            console.log("aqui");

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/service/${data.id}/delete`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${session.user.token}`,
                        "Content-Type": "application/json"
                    },
                });

                const res = await response.json();
                if (response.ok) {
                    toast.success(res.message);
                    load();
                } else {
                    toast.error(res.message);
                }
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        }

    };

    return (
        <>
            <div className={`relative mx-10 shadow-md flex flex-col justify-between rounded-lg w-auto bg-gradient-to-r overflow-hidden min-w-[300px]`}>
                <p className="absolute text-4xl bg-white text-black p-2 rounded-lg top-2 right-2"> $ {data.price} </p>
                <img src={data.imageUrl} alt={`${data.id} image`} className="h-[300px] w-[300px] object-fill rounded-t-lg" />

                <div className="flex flex-col justify-between max-w-[300px] p-5 h-full">
                    <div className="h-full flex flex-col justify-center">
                        <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-700 to-red-500"> {data.title}</p>
                        <p className="text-lg text-black/80 leading-none"> {data.description}</p>
                    </div>

                    <div className="flex gap-2">
                        <Button isIconOnly className='mt-10' onPress={() => { deleteAppointment() }}>  <MdDelete className="h-5 w-5" /> </Button>
                        <Button color='secondary' className='mt-10 w-full' onPress={onOpen}> Modificar </Button>
                    </div>
                </div>
            </div>

            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <div>
                                    <p className="text-3xl font-bold">Modificar servicio</p>
                                    <p className='text-md font-light leading-none'>Modifica un servicio aquí.</p>
                                </div>
                            </ModalHeader>
                            <ModalBody>
                                <form action={modifyAppointment}>
                                    <div className="flex flex-col w-full gap-4">
                                        <div>
                                            <p> Titulo </p>
                                            <Input
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                name="title"
                                                type="text"
                                                isRequired
                                            />
                                        </div>

                                        <div>
                                            <p> Descripción </p>
                                            <Input
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                name="description"
                                                type="text"
                                                isRequired
                                            />
                                        </div>

                                        <div>
                                            <p> Precio </p>
                                            <Input
                                                name="price"
                                                type="number"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                placeholder="0.00"
                                                labelPlacement="outside"
                                                startContent={
                                                    <div className="pointer-events-none flex items-center">
                                                        <span className="text-default-400 text-small">$</span>
                                                    </div>
                                                }
                                                isRequired
                                            />
                                        </div>

                                        <div>
                                            <p> URL de imágen </p>
                                            <Input
                                                name="imageUrl"
                                                type="url"
                                                value={imageUrl}
                                                onChange={(e) => setImageUrl(e.target.value)}
                                                placeholder="image.png"
                                                startContent={
                                                    <div className="pointer-events-none flex items-center">
                                                        <span className="text-default-400 text-small">https://</span>
                                                    </div>
                                                }
                                                isRequired
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-5">
                                        <Button variant="light" onPress={onClose}>
                                            Cerrar
                                        </Button>
                                        <Button color="secondary" type="submit">
                                            Modificar
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