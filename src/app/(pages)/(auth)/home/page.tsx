import { auth } from "@/auth";
import AdminAppointmentPage from "@/components/Pages/adminAppointmentPage";
import AdminServicePage from "@/components/Pages/adminAppointmentPage";
import ClientAppointmentPage from "@/components/Pages/clientAppointmentPage";

export default async function HomePage() {
    const session = await auth();

    return (
        <>
            {
                session?.user.role === "admin" ? (
                    <AdminAppointmentPage />
                ) : (
                    <ClientAppointmentPage />
                )
            }
        </>
    );
}