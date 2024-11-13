"use client";

import useFetchData from "@/app/hooks/useFetchData";
import { getProject } from "@/app/services/project";
import { TProject } from "@/app/utils/types/project";

export default function Project({ params }: { params: { id: string } }) {
  const { data, loading, error } = useFetchData<TProject>(() =>
    getProject(params.id)
  );

  if (loading)
    return (
      <div className="flex w-full min-h-screen bg-black justify-center items-center">
        Loading...
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="flex w-full min-h-screen bg-black text-custom-primary flex-col items-center gap-2">
      {data && data.images?.[0] && (
        // <Image src={data.images[0]} alt="car-image" width={300} height={200} /> // TODO - add storage images to nextjs config
        <img
          src="https://www.vcentrum.pl/wp-content/uploads/2024/02/DSC09433.jpg"
          className="w-full h-[250px] object-cover"
          alt="car-image"
        />
      )}

      <nav className="flex items-center justify-between w-full">
        <h1 className="text-xl font-semibold gap-2 flex">
          <span>{data?.carMake}</span>
          <span>{data?.carModel}</span>
        </h1>

        {/* Options and statistics data */}
      </nav>

      <div className="flex w-full flex-col gap-2">
        {/* TODO - create gallery component */}
        <h3 className="text-sm opacity-85">Galeria projektu</h3>
        <div>
          {data && data.images?.[0] && (
            // <Image src={data.images[0]} alt="car-image" width={300} height={200} /> // TODO - add storage images to nextjs config
            <img
              src="https://www.vcentrum.pl/wp-content/uploads/2024/02/DSC09433.jpg"
              className="w-[100px]"
              alt="car-image"
            />
          )}
        </div>
      </div>
    </main>
  );
}
