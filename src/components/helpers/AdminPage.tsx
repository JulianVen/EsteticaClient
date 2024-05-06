import { auth } from "@/auth";

export default async function AdminPage({ children }: { children: React.ReactDOM }) {
    const session = await auth();

    if (session?.user.role != "admin") {
        return <div>Not authenticated</div>
    }

    return (
        { children }
    );
}