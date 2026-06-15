import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="flex w-full bg-linear-to-br from-blue-600 to-indigo-200 text-white">
        <div className="py-5 md:py-20 px-4 md:px-10">
          <h1 className="text-lg md:text-5xl font-bold mb-3 max-w-4xl mx-auto text-left">
            Buat Kuis Menyenangkan, Tantang Teman, dan Rayakan Momen
            Kebersamaan!
          </h1>
          <p className="text-left text-[0.7rem] mb-10 max-w-3xl md:my-10 md:text-2xl">
            Quizy membantu kamu membuat kuis seru dalam hitungan menit. Ayo
            ciptakan tawa dan kebersamaan bersama teman-temanmu!
          </p>
          <div className="flex flex-row gap-10">
            <Link
              href="#"
              className="z-1 px-5 py-2 text-sm md:text-lg md:px-6 md:py-3 bg-linear-to-br from-emerald-500 to-green-400 
                font-bold rounded-md drop-shadow-sm hover:bg-linear-t-rb hover:from-white
                hover:to-white hover:text-emerald-400 transition-colors duration-500"
            >
              Buat Kuis
            </Link>

            <Link
              href="#"
              className="z-1 px-5 py-2 text-sm md:text-lg md:px-6 md:py-3 bg-linear-to-br from-indigo-600 to-indigo-400 
                font-bold rounded-md drop-shadow-sm hover:bg-linear-t-r hover:from-white
                hover:to-white hover:text-indigo-400 transition-colors duration-500"
            >
              Coba kuis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
