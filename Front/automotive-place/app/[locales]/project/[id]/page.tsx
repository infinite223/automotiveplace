"use client";

import { AMPCarStatsItem } from "@/app/components/shared/AMPCarStatsItem";
import useFetchData from "@/app/hooks/useFetchData";
import { getProject } from "@/app/services/project";
import { getCurrentStage } from "@/app/utils/helpers";
import { TProject } from "@/app/utils/types/project";
import { useTranslations } from "next-intl";

export default function Project({ params }: { params: { id: string } }) {
  const t = useTranslations();

  const { data, loading, error } = useFetchData<TProject>(() =>
    getProject(params.id)
  );

  const lastStage = data ? getCurrentStage(data) : undefined;

  if (loading)
    return (
      <div className="flex w-full min-h-screen bg-black justify-center items-center">
        Loading...
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="flex w-full min-h-screen bg-amp-900 dark:bg-amp-0 flex-col items-center gap-2 text-black dark:text-white">
      <div className="w-full bg-amp-700 dark:bg-amp-0 pb-32 flex justify-center">
        <div className="max-w-screen-2xl w-full h-[250px]">
          {data && data.images?.[0] && (
            // <Image src={data.images[0]} alt="car-image" width={300} height={200} /> // TODO - add storage images to nextjs config
            <img
              src={data.images?.[0]}
              className="w-full h-full object-cover rounded-b-lg blur-sm opacity-80"
              alt="car-image"
            />
          )}

          <nav className="flex flex-col gap-2 justify-between w-full top-[-60px] relative px-4">
            <h1 className="text-3xl font-semibold gap-2 flex items-center">
              {data && (
                <img
                  src={data.images?.[0]}
                  className="w-20 h-20 object-cover rounded-full mr-4"
                  alt="car-image"
                />
              )}
              <span>{data?.carMake}</span>
              <span>{data?.carModel}</span>
              <span className="">- {lastStage?.name}</span>
            </h1>

            {lastStage && (
              <div className="flex flex-wrap gap-4 w-full">
                <AMPCarStatsItem
                  typeValue={t("Core.Hp").toUpperCase()}
                  value={lastStage.hp.toString()}
                  title="Moc silnika"
                />
                <AMPCarStatsItem
                  typeValue="NM"
                  value={lastStage.nm.toString()}
                  title="Moment obrotowy"
                />
                <AMPCarStatsItem
                  typeValue="s"
                  subTitle={"0-100km/h"}
                  value={lastStage.acc_0_100.toString()}
                  title="Przyśpieszenie"
                />
                <AMPCarStatsItem
                  typeValue="s"
                  subTitle={"100-200km/h"}
                  value={lastStage.acc_100_200.toString()}
                  title="Przyśpieszenie"
                />
                <AMPCarStatsItem
                  typeValue="s"
                  subTitle={"50-150km/h"}
                  value={lastStage.acc_50_150.toString()}
                  title="Przyśpieszenie"
                />
                {lastStage.sl_100_0 && (
                  <AMPCarStatsItem
                    typeValue="s"
                    subTitle={"100-0km/h"}
                    value={lastStage.sl_100_0.toString()}
                    title="Droga hamowania"
                  />
                )}

                {lastStage.sl_150_50 && (
                  <AMPCarStatsItem
                    typeValue="s"
                    subTitle={"150-50km/h"}
                    value={lastStage.sl_150_50.toString()}
                    title="Droga hamowania"
                  />
                )}
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* TODO: remove back button or change to global component */}
      {/* <Link
        href={"../app"}
        className="absolute left-5 top-5 rounded-full p-2 bg-black/70 hover:opacity-65 transition-transform-opacity"
      >
        <MdArrowBackIosNew />
      </Link> */}

      {/* <div className="flex w-full flex-col gap-2">
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
      </div> */}

      <div className="flex w-full flex-col gap-2 items-center">
        {/* TODO - create gallery component */}
        <h3 className="text-sm opacity-85">Etapy modyfikacji projektu</h3>
        <div>
          {data && data.stages?.[0] && (
            // <Image src={data.images[0]} alt="car-image" width={300} height={200} /> // TODO - add storage images to nextjs config
            <div>{data.stages?.[0].name}</div>
          )}
        </div>
      </div>
    </main>
  );
}
