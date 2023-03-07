import { httpPost } from "../../utils/RestTemplate";

export const createPost = (
    payload: any,
    authorization: any
  ) => {
    return httpPost(
      `/article`,
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