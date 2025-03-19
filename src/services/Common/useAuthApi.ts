import useApiService from "../../helpers/apiService";
import { ILoginUser } from "../../models/User/IUser";

const useAuthApi = () => {
  const api = useApiService<ILoginUser>("users");

  return {
    loginByName: async (user: ILoginUser): Promise<ILoginUser | null> => {
      const result = await api.getItem(`?username=${user.name}&password=${user.password}`);
      //fuad note: need a good Way to cast this code should be removed
      if (Array.isArray(result) && result.length === 0) {
        return null;
      }
      return result;
    },
    loginByEmail: async (user: ILoginUser): Promise<ILoginUser | null> => {
      const result = await api.getItem(`?email=${user.email}&password=${user.password}`);

      //fuad note: need a good Way to cast this code should be removed

      if (Array.isArray(result) && result.length === 0) {
        return null;
      } else if (Array.isArray(result) && result.length > 0) {
        return result[0];

      }
      return result;
    },
  };
};

export default useAuthApi;
