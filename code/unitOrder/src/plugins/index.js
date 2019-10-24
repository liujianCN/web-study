//全局jquery  (未使用) "jquery": "^1.11.1"
//window.jQuery = window.$ = require('jquery/dist/jquery.min.js');

import Axios from 'axios'
//axios全局配置
//Axios.defaults.baseURL = 'http://react.aiplat.com';
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

import FastClick from 'fastclick'
FastClick.attach(document.body)

export default window;