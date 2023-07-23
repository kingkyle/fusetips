export type ISessionUser =
  | ({
      id: string;
    } & {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
      role?: string;
    })
  | undefined;
