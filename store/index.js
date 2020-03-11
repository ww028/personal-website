export const state = () => ({
  dialog_login: false,
  login_status: false,
  username: '',
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
