import { userData } from "@/types/common.type";

export interface userSliceData {
  isLoggedIn: boolean;
  userData: userData | null;
}

export interface globalStateInterface {
  counter: number;
}
