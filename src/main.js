/* jshint esversion: 6 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import api from './net/http';
import store from './store';
import global from '@/config/net';
import ElementUI from 'element-ui';
import  'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css';
import Vcharts from 'v-charts';
import axios from 'axios'
import Router from 'vue-router';
import './assets/style/index.css';
import './utils/iframe';
import './utils/formatter';
import VueClipboard from 'vue-clipboard2';

const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error);
};

Vue.directive('waves', {
    bind(el, binding) {
        el.addEventListener('click', e => {
            const customOpts = Object.assign({}, binding.value);
            const opts = Object.assign({
                ele: el, // 波纹作用元素
                type: 'hit', // hit点击位置扩散center中心点扩展
                color: 'rgba(0, 0, 0, 0.15)' // 波纹颜色
            }, customOpts);
            const target = opts.ele;
            if (target) {
                target.style.position = 'relative';
                target.style.overflow = 'hidden';
                const rect = target.getBoundingClientRect();
                let ripple = target.querySelector('.waves-ripple');
                if (!ripple) {
                    ripple = document.createElement('span');
                    ripple.className = 'waves-ripple';
                    ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
                    target.appendChild(ripple);
                } else {
                    ripple.className = 'waves-ripple';
                }
                switch (opts.type) {
                    case 'center':
                        ripple.style.top = (rect.height / 2 - ripple.offsetHeight / 2) + 'px';
                        ripple.style.left = (rect.width / 2 - ripple.offsetWidth / 2) + 'px';
                        break;
                    default:
                        ripple.style.top = (e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop) + 'px';
                        ripple.style.left = (e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft) + 'px';
                }
                ripple.style.backgroundColor = opts.color;
                ripple.className = 'waves-ripple z-active';
                return false;
            }
        }, false);
    }
});

Vue.directive('enterNumber', {
    inserted: function (el) {
      el.addEventListener("keypress",function(e){
        e = e || window.event;
        let charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode;
        let re = /\d/;
        if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
          if(e.preventDefault){
            e.preventDefault();
          }else{
            e.returnValue = false;
          }
        }
      });
    }
});  

Vue.use(ElementUI);
Vue.use(api);
Vue.use(Vcharts);
Vue.prototype.Observer = new Vue()
Vue.prototype.$axios = axios
Vue.prototype.global = global;
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
