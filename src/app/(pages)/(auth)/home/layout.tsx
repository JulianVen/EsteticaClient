import { auth } from "@/auth"
import UnauthorizedPage from "@/components/helpers/UnauthorizedPage";
import AdminNavbar from "@/components/navbar/admin";
import UserNavbar from "@/components/navbar/user";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if (!session) {
        return <UnauthorizedPage />
    }

    return (
        <>
            {
                !session ? (
                    <UnauthorizedPage />
                ) : (
                    <>
                        {
                            session.user.role == "admin" ? <AdminNavbar /> : <UserNavbar />
                        }
                        {children}
                    </>
                )
            }
        </>
    );
}