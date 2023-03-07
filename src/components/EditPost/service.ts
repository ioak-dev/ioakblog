import { httpGet, httpPost } from "../../utils/RestTemplate";

export const getPostById = (id: string
) => {
    return httpGet(
        `/article/${id}`,
        null
    )
        .then((response) => {
            if (response.status === 200) {
                return Promise.resolve({...response.data, id: response.data._id});
            }
            return Promise.resolve([]);
        })
        .catch((error) => {
            return Promise.resolve([]);
        });
};