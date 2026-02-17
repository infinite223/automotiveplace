import { LoadingSpinner } from "@/app/components/loading/LoadingSpinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-amp-900 dark:bg-black">
      <LoadingSpinner />
    </div>
  );
}
