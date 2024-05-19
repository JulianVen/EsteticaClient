'use client'

import ServiceAdminCard from "@/components/cards/serviceAdminCard";
import { Service } from "@/lib/types/appointment";
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Spinner, useDisclosure } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React from 'react';
import { toast } from "sonner";

export default function ServicesPage() {
    const { data: session } = useSession();

    const [isLoading, setIsLoading] = React.useState(true);
    const [services, setServices] = React.useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure();

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

    const createServiceHandler = async (form: FormData) => {
        if (session) {
            const service = {
                title: form.get("title"),
                description: form.get("description"),
                price: form.get("price"),
                imageUrl: form.get("imageUrl")
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/service`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${session.user.token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(service)
                });

                const data = await response.json();
                if (response.ok && data) {
                    toast.success(data.message);
                    loadServices();
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error("Error adding service:", error);
            }
        };
    }

    return (
        <>
            <div >
                <div className="flex justify-between items-left w-full p-10 mt-5">
                    <div>
                        <h1 className="block font-bold text-2xl md:text-4xl"> Servicios💡</h1>
                        <p className="text-md md:text-xl text-slate-600">
                            ¿Cómo sorprenderás a tus clientes ahora?
                        </p>
                    </div>

                    <Button color="secondary" onPress={onOpen}> Agregar </Button>
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
                                    <ServiceAdminCard key={service.id} data={service} load={loadServices} />
                                ))
                            ) : (
                                <p className="mx-10 mt-[-40px] bg-slate-100 w-full rounded-xl px-5 py-10"> No hay servicios de momento </p>
                            )
                        }
                    </div>
                )}
            </div>

            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <div>
                                    <p className="text-3xl font-bold">Nuevo servicio</p>
                                    <p className='text-md font-light leading-none'>Registra aquí un nuevo registro</p>
                                </div>
                            </ModalHeader>
                            <ModalBody>
                                <form action={createServiceHandler}>
                                    <div className="flex flex-col w-full gap-4">
                                        <div>
                                            <p> Titulo </p>
                                            <Input
                                                name="title"
                                                type="text"
                                                isRequired
                                            />
                                        </div>

                                        <div>
                                            <p> Descripción </p>
                                            <Input
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
                                    <div className="flex gap-2 justify-end mt-5">
                                        <Button variant="light" onPress={onClose}>
                                            Cerrar
                                        </Button>
                                        <Button color="secondary" type="submit">
                                            Agregar
                                        </Button>
                                    </div>

                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>

    );
}