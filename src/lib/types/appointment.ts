export type Client = {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string
}

export type Service = {
    id: number,
    title: string,
    description: string,
    imageUrl: string,
    price: number,
    deleted: boolean
}

export type Appointment = {
    id: number,
    date: string,
    time: string,
    client: Client,
    service: Service,
    accepted: boolean,
    canceled: boolean;
}

export type AppointmentProp = {
    data : Appointment[]
}