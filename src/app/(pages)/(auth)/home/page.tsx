import { auth } from "@/auth";
import AdminServicePage from "@/components/Pages/adminServicesPage";
import ClientAppointmentPage from "@/components/Pages/clientAppointmentPage";

export default async function HomePage() {
    const session = await auth();

    return (
        <>
            {
                session?.user.role === "admin" ? (
                    <AdminServicePage />
                ) : (
                    <ClientAppointmentPage />
                )
            }
        </>
    );
}