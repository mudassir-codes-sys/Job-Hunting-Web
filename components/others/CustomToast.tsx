import Link from "next/link";
import { toast } from "sonner";

const customToast = () => {
  toast.custom(
    (t) => (
      <div className="bg-zinc-900 text-white p-4 rounded-lg w-[320px]">
        <p className="font-semibold">Access Denied</p>
        <p className="text-sm text-zinc-400 mt-1">
          You need to subscribe to a premium plan to post premium content.
        </p>

        <div className="mt-3 flex gap-2">
          <Link
            href="/pricing"
            className="px-3 py-1.5 font-semibold text-sm bg-white text-black rounded"
          >
            Upgrade Plan
          </Link>

          <button
            onClick={() => toast.dismiss(t)}
            className="px-3 py-1.5 text-sm border border-zinc-600 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    { position: "top-center" }
  );
};

export default customToast;
