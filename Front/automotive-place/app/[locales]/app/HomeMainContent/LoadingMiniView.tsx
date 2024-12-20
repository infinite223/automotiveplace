export const LoadingMiniView = () => {
  return (
    <div className="flex flex-col items-center w-full py-2 gap-3 mb-2">
      <nav className="flex items-center w-full gap-2 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full animate-pulse bg-amp-800 dark:bg-amp-100"></div>
          <div className="flex flex-col gap-1">
            <div className="h-3.5 w-[70px] rounded-md animate-pulse bg-amp-800 dark:bg-amp-100"></div>
            <div className="h-3.5 w-[200px] rounded-md animate-pulse bg-amp-800 dark:bg-amp-100"></div>
          </div>
        </div>
        <div className="h-7 w-4 rounded-md animate-pulse bg-amp-800 dark:bg-amp-100"></div>
      </nav>
      <div className="flex gap-2 w-full">
        <div className="rounded-md w-[250px] h-[150px] animate-pulse bg-amp-800 dark:bg-amp-100"></div>
        <div className="flex flex-col gap-1 w-full">
          <div className="rounded-md w-[130px] h-6 animate-pulse bg-amp-800 dark:bg-amp-100"></div>
          <div className="rounded-md w-full h-full animate-pulse bg-amp-800 dark:bg-amp-100"></div>
          <div className="rounded-md w-[220px] h-6 animate-pulse bg-amp-800 dark:bg-amp-100"></div>
          <div className="rounded-md w-full h-6 animate-pulse bg-amp-800 dark:bg-amp-100"></div>
        </div>
      </div>

      <footer className="flex items-center gap-2 w-full justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-14 rounded-md animate-pulse bg-amp-800 dark:bg-amp-100"></div>
          <div className="h-8 w-[200px] rounded-md animate-pulse bg-amp-800 dark:bg-amp-100"></div>
        </div>
        <div className="h-8 w-[50px] rounded-md animate-pulse bg-amp-800 dark:bg-amp-100"></div>
      </footer>
    </div>
  );
};
