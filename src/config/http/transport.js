import httpHandler from './axios';

const API_DOMAIN = {
  INTERNSHIP: "https://wealthy-bite-production.up.railway.app"
}

function get(domain, url, config = {}) {
  return httpHandler(domain).get(`${url}`, config);
}

function post(domain, url, data, config = {}) {
  return httpHandler(domain).post(`${url}`, data, config);
}

function put(domain, url, data, config = {}) {
  return httpHandler(domain).put(`${url}`, data, config);
}
function patch(domain, url, data, config = {}) {
  return httpHandler(domain).patch(`${url}`, data, config);
}
function del(domain, url, config = {}) {
  return httpHandler(domain).delete(`${url}`, config);
}

export const internshipTransport = {
  get: (url, config = {}) => {
    return get(API_DOMAIN.INTERNSHIP, url, config);
  },
  post: (url, data, config = {}) => {
    return post(API_DOMAIN.INTERNSHIP, url, data, config);
  },
  put: (url, data, config = {}) => {
    return put(API_DOMAIN.INTERNSHIP, url, data, config);
  },
  patch: (url, data, config = {}) => {
    return patch(API_DOMAIN.INTERNSHIP, url, data, config);
  },
  delete: (url, config = {}) => {
    return del(API_DOMAIN.INTERNSHIP, url, config);
  },
};


