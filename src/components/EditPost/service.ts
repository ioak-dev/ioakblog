import { httpGet, httpPost, httpPut } from "../../utils/RestTemplate";

export const updatePost = (
    id: string,
    payload: any
  ) => {
    return httpPut(
      `/article/${id}`,
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