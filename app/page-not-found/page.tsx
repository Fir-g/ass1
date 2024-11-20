import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col gap-10 items-center h-screen w-full justify-center">
      <h1 className="text-3xl font-semibold">These Pages are not yet implemented</h1>
      <Button className="bg-[#0A512F] hover:bg-[#0A512F]/90">
        <Link href={'/dashboard'}>
            Go back to Dashboard
        </Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
