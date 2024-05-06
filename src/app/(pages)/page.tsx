import HomeNavbar from "@/components/navbar/home";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <HomeNavbar />

      <div className="flex flex-col lg:flex-row mt-[150px] justify-center items-center text-center w-full">
        <div className="flex flex-col justify-center items-center max-w-[500px]">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-700 to-red-500 mb-2 lg:p-4"> Estética Regina </h1>
          <p className="block font-bold text-2xl md:text-4xl px-5">¡Bienvenido a nuestra estética! </p>
          <p className="text-md md:text-xl text-slate-600 px-5">
            Sumérgete en un oasis de cuidado personal, donde cada detalle está diseñado para consentirte y realzar tu belleza natural. Descubre un mundo de tratamientos innovadores, atención personalizada y un ambiente relajante que te invita a renovarte por dentro y por fuera. ¡Te damos la bienvenida a tu destino de belleza y bienestar!
          </p>
        </div>

        <Image src="/barber.png" width={600} height={600} quality={100} alt="barber image" />
      </div>
    </>
  );
}