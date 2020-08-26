import axios from 'axios';

const ROOT_URL = '/api';

const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  };

const get = (endpoint) => (
    axios({
        method: 'get',
        headers,
        url: `${ROOT_URL}/${endpoint}`
    })
);

const post = (endpoint, data) => (
    axios({
        method: 'post',
        headers,
        url: `${ROOT_URL}/${endpoint}`,
        data: data
    })
);

const search = (endpoint, query) => {
    let url = `${ROOT_URL}/${endpoint}`;
    if(url.split('?').length - 1 ) {
        url += `&search=${query}`
    } else {
        url += `?search=${query}`
    }
    return axios({
        method: 'get',
        url
    })
};

export { get, post, search }