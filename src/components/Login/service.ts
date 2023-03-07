import { httpPost } from "../../utils/RestTemplate";

export const userSignin = (
    payload: any
  ) => {
    return httpPost(
      `/auth/signin`,
      payload,
      null
    )
      .then((response) => {
        if (response.status === 200) {
          return Promise.resolve(response.data);
        }
        return Promise.resolve([]);
      })
      .catch((error) => {
        return Promise.resolve([]);
      });
  };