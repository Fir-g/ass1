import prisma from "@/lib/prisma";
import { UserCircle } from "lucide-react";
import { getServerSession } from "next-auth";

const UserName = async () => {
//   const session = await getServerSession();
//   const userName = await prisma.user.findUnique({
//     where: {
//       email: session?.user?.email ?? "",
//     },
//     select: {
//       fullName: true,
//     },
//   });
  return (
    <div className="flex items-center gap-2 px-2 text-[#ADCF1A] border-b-2 my-4 pb-4 shadow-lg">
      <UserCircle />
      Ganesh
    </div>
  );
};

export default UserName;
