import Vue from 'vue'

// 注册
Vue.filter('dict', function (val,val1) {  
   return __dict.showDictValue(val,val1);
})

// time
Vue.filter('timeFormat', function (val) {      
   return __utils.time(val) || null;
})
