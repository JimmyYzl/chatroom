const axios = require('axios');
const baseUrl = 'http://127.0.0.1:3000';
const api = {

}

// 用户名登录
api.login = (data, cb, ecb) => {
    axios.post('/api/post-user-name', data)
    .then(cb)
    .catch(ecb);
};

module.exports = api;
