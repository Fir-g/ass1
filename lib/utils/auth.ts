import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "../prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        fullname: {
          label: "Full Name",
          type: "text",
          placeholder: "Enter your full name",
        },
        email: {
          label: "Email",
          type: "text",
          placeholder: "user@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials: any) {
        let hashedPassword = "";
        bcrypt.hash(credentials.password, 10, (err, hash) => {
          if (err) {
            console.error(err);
            return;
          }
          hashedPassword = hash;
        });

        try {
          const existingUser = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (existingUser) {
            const passwordMatch = await bcrypt.compare(
              credentials.password,
              existingUser.password
            );
            if (passwordMatch) {
              return {
                id: existingUser.id,
                email: existingUser.email,
                role: existingUser.role,
                fullname: existingUser.fullName,
              };
            } else {
              return null;
            }
          }
        } catch (error) {
          throw new Error("Error in finding user");
        }

        try {
          const user = await prisma.user.create({
            data: {
              fullName: credentials.fullname,
              email: credentials.email,
              password: hashedPassword,
              role: "USER",
            },
          });

          return {
            id: user.id.toString(),
            email: user.email,
            role: user.role,
            fullName: user.fullName,
          };
        } catch (e) {
          console.error(e);
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
};
