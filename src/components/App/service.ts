import { httpGet, httpPost } from "../../utils/RestTemplate";

export const getAllUsers = (
) => {
    return httpGet(
        `/member`,
        null
    )
        .then((response) => {
            if (response.status === 200) {
                return Promise.resolve(response.data.map((item: any) => ({ ...item, id: item._id })));
            }
            return Promise.resolve([]);
        })
        .catch((error) => {
            return Promise.resolve([]);
        });
};