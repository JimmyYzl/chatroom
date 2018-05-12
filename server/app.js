const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app     = express();
const userList = [];

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.post('/api/post-user-name', (req, res) => {
    const username = req.body.username;
    console.log(req);
    if(!username) {
        res.json({"static": "error", "code": 1, "data": "无效用户名"});
    }else if(userList.indexOf(username) >= 0){
        res.json({"static": "error", "code": 2, "data": "用户重复"})
    }else {
        userList.push(username);
        req.session.username = username;
        res.json({"static": "sucess", "code": 0, "data": username});
    }
});

app.use(express.static(path.resolve(__dirname, '../views')));
app.use(history());

app.listen(3000);

/*
    error Code
    0 ==> ok
    1 ==> 用户名不存在
    2 ==> 用户重复
*/