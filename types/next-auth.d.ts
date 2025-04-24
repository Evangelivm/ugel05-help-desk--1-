import "next-auth";

declare module "next-auth" {
  interface User {
    alf_num: string;
    user: string;
    email: string;
    id_rol: number;
    user_firstname: string;
    user_lastname: string;
  }

  interface Session {
    user: {
      alf_num: string;
      user: string;
      email: string;
      id_rol: number;
      user_firstname: string;
      user_lastname: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    alf_num: string;
    user: string;
    email: string;
    id_rol: number;
    user_firstname: string;
    user_lastname: string;
  }
}
