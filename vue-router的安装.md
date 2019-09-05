# vue-router的安装



## 1，安装挂载

1. **从vue-router中导入路由对象Router,调用vue.use**

   ```javascript
   import Vue from 'vue';
   import Router from 'vue-router';
   Vue.use(Router);
   
   ```

   

2. **创建路由实例，传入路由映射配置**
 ```javascript
   const router = new Router({
     routes: [
       ...baseRouter
     ]
   });
   //可选配置全局路由守卫
   /**
    * 拦截路由，设置头部标题
    */
   router.beforeEach((to, from, next) => {
     //判断前进还是后退
     if (to.meta.hasOwnProperty("pageIndex") && from.meta.hasOwnProperty("pageIndex")) {
       let isBack = to.meta.pageIndex < from.meta.pageIndex;
       store.dispatch("setIsBack", isBack);
     }
     //判断当前页面是否由Iframe页面进入,login返回场景为后面追加，setFromIframe的action名字不完全符合
     if (from.name === "iframe" || from.name === "login" || from.name === "danger_Notice") {
       store.dispatch("setFromIframe", true);
     } else {
       store.dispatch("setFromIframe", false);
     }
   
     // console.log(to);
   
     // 重定向回查询页
     let goHome = () => {
       router.replace({ path: "/" });
       store.dispatch("setPath","CS_CheckInQuery");
     };
   
     //检测状态管理必要参数
     if (to.name === "CS_QueryResult") {
       let {inputInfo,flightSegList} = store.getters.getter_checkInSeat_queryResult;
       if (Object.keys(inputInfo).length < 1 || (flightSegList && flightSegList.length < 1)) { goHome(); }
     } else if (to.name === "CS_SeatMap") {
       if (Object.keys(store.state.checkInSeat.seatInfo).length < 1) { goHome(); }
     } else if (to.name === "CS_SMSVerification") {
       let {flightSeg,passengers} = store.state.checkInSeat;
       // console.log(flightSeg,inputInfo,passengers)
       if (Object.keys(flightSeg).length < 1 || passengers.length < 1) { goHome(); }
     } else if (to.name === "CS_BoardingPass") {
       if (Object.keys(store.getters.getter_checkInSeat_checkInDetail).length < 1) { goHome(); }
     }
   
   
     //设置头部标题
     store.dispatch("setHeaderName", to.meta.headerName);
     //设置导航状态
     store.dispatch("setHeaderType", to.meta.headerType);
     //设置导航组
     store.dispatch("setHeaderEnabled", to.meta.HeaderEnabled);
     //设置当前路由的别名 name
     store.dispatch("setPath", to.name);
   
     /**
        * 同步自由行Header头部标题给Native端
        * **/
     //let {
     //  channel,
     //  headerName
     //} = store.state.base;
     //(channel === "IOS" || channel === "ANDROID") &&
     //  setTimeout(() => { //解决100毫秒内发出两次消息，iframe无法删除的问题
     //  	Vue.prototype.$bridge.callHandler("setMessage",{
     //  		type: "Header",
     //  		headerName: headerName
     //  	},res => {});
     //  }, 500);
   
     next();
   });
   
   //导出路由实例
   export default router
 ```

3. **在Vue实例中挂载创建的路由实例**

   ```javascript
   const vm = new Vue({
     router,
     store,
     render: h => h(App)
   }).$mount("#app");
   ```




## 2，创建步骤

1. 创建组件

   ```javascript
   <template>
    
   </template>
   <script>
   export default {
     name: 'jetair-switch',
     props: {
       
     },
     methods: {
      
     }
   };
   </script>
   <style lang="scss" scoped>
   
   </style>
   ```

   

2. 配置路由映射

3. 使用路由