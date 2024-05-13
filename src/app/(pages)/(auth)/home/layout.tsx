import { auth } from "@/auth"
import AdminNavbar from "@/components/navbar/admin";
import UserNavbar from "@/components/navbar/user";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    return (
        <>
            {
                session?.user.role == "admin" ? <AdminNavbar /> : <UserNavbar />
            }
            {
                children
            }
        </>
    );
}