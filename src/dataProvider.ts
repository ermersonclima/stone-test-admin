import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = "https://my-imaginary-api.net";//absent API
const httpClient = fetchUtils.fetchJson;

const dataProvider = {
    getList: (resource:string, params:{pagination:{page:number, perPage:number}, sort:{field?:number, order?:number}, filter?:number}) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get("content-range").split("/").pop(), 10),
        }));
    },

    getOne: (resource:string, params:{id:number}) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource:string, params:{ids:string}) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource:string, params:{pagination:{page:number, perPage:number},sort:{field?:number, order:number}, filter?:Object, target:number, id:number}) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get("content-range").split("/").pop(), 10),
        }));
    },

    update: (resource:string, params:{id:number, data?:Object}) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource:string, params:{ids:string, data?:Object}) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource:string, params:{data?:Object}) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: "POST",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    delete: (resource:string, params:{id:number}) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "DELETE",
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource: string, params:{ids:string}) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: "DELETE",
        }).then(({ json }) => ({ data: json }));
    }
};

export default dataProvider;