export const state = () => ({
  dialog_login: false,
  login_status: false,
  username: '',
  header_show: false
})

export const mutations = {
  headerShow(state, pamars) {
    state.header_show = pamars
  },

  dialogLogin(state, pamars) {
    state.dialog_login = pamars
  },

  loginInfo(state, pamars){
    state.login_status = pamars.status
    state.username = pamars.username
  }
}
