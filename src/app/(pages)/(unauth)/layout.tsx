import HomeNavbar from "@/components/navbar/home";

export default async function UnauthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <HomeNavbar />
            {children}
        </>
    )
}