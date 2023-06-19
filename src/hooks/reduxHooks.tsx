import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { decrypto, encrypto } from "@/helpers/encryption";
import { IUser } from "@/types/user";
import { setUser } from "@/redux/auth.slice";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useGetUser = () => {
  const userData = useAppSelector((state) => state.auth.user);
  if (userData) {
    return decrypto<IUser>(userData);
  } else {
    return null;
  }
};

export const saveUserToState = (userData: IUser) => {
  const encryptedUserData = encrypto(userData);
  if (encryptedUserData) {
    setUser(encryptedUserData);
  } else {
    setUser(null);
  }
};
