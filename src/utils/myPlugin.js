let myPlugin = {

    checkLogin() {
        return true;
    },
    checkWallet() {
        if (getToken("bacaWallet")) {
            return true;
        } else {
            return false;
        }
    },
    // 一般插件内的对象要提供一个install方法
    install(Vue) {
        Vue.prototype.$checkLogin = myPlugin.checkLogin;
        Vue.prototype.$checkWallet = myPlugin.checkWallet;
    }
}
export default myPlugin;
