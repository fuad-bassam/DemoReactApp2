import { useAuth } from "../Context/AuthContext";
import { ILoginUser } from "../models/User/IUser";
import useAuthApi from "../services/Common/useAuthApi";
import { clearCache as clearSessionCache } from "./CachingSessionService";
import { clearCache as clearLocalStorageCache } from "./CachingLocalStorageService";


const useAuthService = () => {
  const authApi = useAuthApi();
  const { setLoginUserInformation } = useAuth();

  const login = async (loginUser: ILoginUser): Promise<ILoginUser | null> => {
    try {
      let data: ILoginUser | null;
      if (loginUser.email) {
        data = await authApi.loginByEmail(loginUser);
      } else if (loginUser.name) {
        data = await authApi.loginByName(loginUser);
      } else {
        return null;
      }
      setLoginUserInformation(data);
      return data

    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    clearSessionCache();
    clearLocalStorageCache();
    setLoginUserInformation(null);
  };

  return { login, logout };
};

export default useAuthService;
