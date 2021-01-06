const generateAPI = (category) => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const url = baseURL + category;
  const apis = {
    url,
    get(config = { params: '', headers: {}, useCredentials: true }) {
      const { params, headers = {} } = config;
      if (!('Content-Type' in headers)) {
        headers['Content-Type'] = 'application/json';
      }

      if (!('Accept' in headers)) {
        headers.Accept = 'application/json';
      }

      return fetch(`${url}/${params}`, {
        method: 'GET',
        headers,
        params
      });
    },

    post(config = { params: '', payload: {}, headers: {}}) {
      const { params = '', payload, headers = {} } = config;
      if (!('Content-Type' in headers)) {
        headers['Content-Type'] = 'application/json';
      }
      if (!('Accept' in headers)) {
        headers.Accept = 'application/json';
      }
      const body = JSON.stringify(payload);

      return fetch(`${url}/${params}`, {
        method: 'POST',
        headers,
        body,
        params
      });
    },

    put(config = { params: '', payload: {}, headers: {} }) {
      const { params = '', payload, headers = {} } = config;
      if (!('Content-Type' in headers)) {
        headers['Content-Type'] = 'application/json';
      }
      if (!('Accept' in headers)) {
        headers.Accept = 'application/json';
      }

      const body = JSON.stringify(payload);

      return fetch(`${url}/${params}`, {
        method: 'PUT',
        headers,
        body
      });
    },

    delete(config = { params: '', headers: {} }) {
      const { params = '', headers = {} } = config;
      if (!('Content-Type' in headers)) {
        headers['Content-Type'] = 'application/json';
      }
      if (!('Accept' in headers)) {
        headers.Accept = 'application/json';
      }

      return fetch(`${url}/${params}`, {
        method: 'DELETE',
        headers,
        params
      });
    }

  };
  return apis;
};

export default generateAPI;
