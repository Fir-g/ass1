import { authOptions } from "@/lib/auth-options";
import nextAuth from "next-auth";

export const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
