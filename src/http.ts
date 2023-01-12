import axios from "axios";

interface Params {
  baseUrl: string;
  headers: any;
  method: string;
}

const getConfig: Params = {
  baseUrl: "http://127.0.0.1:8080/v1/api",
  headers: {
    "Content-Type": "application/json",
  },
  method: "get",
};

const deleteConfig: Params = {
  baseUrl: "http://127.0.0.1:8080/v1/api",
  headers: {
    "Content-Type": "application/json",
  },
  method: "delete",
};

const postConfig: Params = {
  baseUrl: "http://127.0.0.1:8080/v1/api",
  headers: {
    "Content-Type": "application/json",
  },
  method: "post",
};

const putConfig: Params = {
  baseUrl: "http://127.0.0.1:8080/v1/api",
  headers: {
    "Content-Type": "application/json",
  },
  method: "put",
};

export const getAllEventsAPI = async (url: string): Promise<any> => {
  return await axios({
    ...getConfig,
    url: `${getConfig.baseUrl}/${url}/`,
  })
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        status: error.status,
        data: error.response,
      };
    });
};

export const deleteEventAPI = async (
  url: string,
  event_id: string
): Promise<any> => {
  return await axios({
    ...deleteConfig,
    url: `${deleteConfig.baseUrl}/${url}/${event_id}/delete/`,
  })
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        status: error.status,
        data: error.response,
      };
    });
};

export const postEventAPI = async (url: string, data: any): Promise<any> => {
  return await axios({
    ...postConfig,
    url: `${postConfig.baseUrl}/${url}/create/`,
    data,
  })
    .then((response) => {
      console.log(response);
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        status: error.status,
        data: error.response,
      };
    });
};

export const putEventApi = async (url: string, data: any): Promise<any> => {
  return await axios({
    ...putConfig,
    url: `${putConfig.baseUrl}/${url}/update/`,
    data,
  })
    .then((response) => {
      console.log(response);
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        status: error.status,
        data: error.response,
      };
    });
};
