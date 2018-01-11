const Login = resolve => require(['../views/Login.vue'], resolve);
const adminApi = require('../api').admin;

let routes = [

    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    }
];


export default routes;
