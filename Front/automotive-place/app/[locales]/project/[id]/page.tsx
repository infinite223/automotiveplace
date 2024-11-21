"use client";

import { AMPCarStatsItem } from "@/app/components/shared/AMPCarStatsItem";
import useFetchData from "@/app/hooks/useFetchData";
import { getProject } from "@/app/services/project";
import { getCurrentStage } from "@/app/utils/helpers";
import { TProject } from "@/app/utils/types/project";

export default function Project({ params }: { params: { id: string } }) {
  const { data, loading, error } = useFetchData<TProject>(() =>
    getProject(params.id)
  );

  const lastStage = data ? getCurrentStage(data) : undefined;
  console.log(lastStage, "lastStage");
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

      <nav className="flex flex-col gap-2 justify-between w-full top-[-150px] relative px-20">
        <h1 className="text-3xl font-semibold gap-2 flex">
          <span>{data?.carMake}</span>
          <span>{data?.carModel}</span>
        </h1>

        {lastStage && (
          <div className="flex flex-wrap gap-2 w-full">
            <AMPCarStatsItem
              title={"HP"}
              value={lastStage.hp.toString()}
              subTitle="Moc silnika"
            />
            <AMPCarStatsItem
              title={"NM"}
              value={lastStage.nm.toString()}
              subTitle="Moment obrotowy"
            />
            <AMPCarStatsItem
              title={"0-100km/h"}
              value={lastStage.acc_0_100.toString()}
              subTitle="Przyśpieszenie"
            />
            <AMPCarStatsItem
              title={"100-200km/h"}
              value={lastStage.acc_100_200.toString()}
              subTitle="Przyśpieszenie"
            />
            <AMPCarStatsItem
              title={"50-150km/h"}
              value={lastStage.acc_50_150.toString()}
              subTitle="Przyśpieszenie"
            />
            {lastStage.sl_100_0 && (
              <AMPCarStatsItem
                title={"100-0km/h"}
                value={lastStage.sl_100_0.toString()}
                subTitle="Droga hamowania"
              />
            )}

            {lastStage.sl_150_50 && (
              <AMPCarStatsItem
                title={"150-50km/h"}
                value={lastStage.sl_150_50.toString()}
                subTitle="Droga hamowania"
              />
            )}
          </div>
        )}
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
