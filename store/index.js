/*
 * @Author: 魏微
 * @Date: 2020-10-18 23:55:42
 * @LastEditTime: 2021-02-18 13:43:48
 * @FilePath: /personal-website/store/index.js
 */
export const state = () => ({
  dialog_login: false,
  login_status: false,
  username: ''
})

export const mutations = {
  dialogLogin(state, pamars) {
    state.dialog_login = pamars
  },

  loginInfo(state, pamars){
    state.login_status = pamars.status
    state.username = pamars.username
  }
}
