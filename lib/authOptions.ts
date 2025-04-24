import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/app/api/lib/db";
import User from "@/app/models/user";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        user: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDB();

          const userFromDb = await User.findOne({
            user: credentials?.user,
          }).select("+password");

          if (!userFromDb) {
            throw new Error("Usuario no encontrado");
          }

          const passwordMatch = await bcrypt.compare(
            credentials?.password || "",
            userFromDb.password
          );

          if (!passwordMatch) {
            throw new Error("Contraseña incorrecta");
          }

          return {
            id: userFromDb._id.toString(),
            alf_num: userFromDb.alf_num,
            user: userFromDb.user,
            email: userFromDb.email,
            id_rol: userFromDb.id_rol,
            user_firstname: userFromDb.user_firstname,
            user_lastname: userFromDb.user_lastname,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.alf_num = user.alf_num;
        token.user_firstname = user.user_firstname;
        token.user_lastname = user.user_lastname;
        token.email = user.email;
        token.id_rol = user.id_rol;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.alf_num = token.alf_num as string;
        session.user.user_firstname = token.user_firstname as string;
        session.user.user_lastname = token.user_lastname as string;
        session.user.email = token.email as string;
        session.user.id_rol = token.id_rol as number;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 horas
  },
  secret: process.env.NEXTAUTH_SECRET,
};
