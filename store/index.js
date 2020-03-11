export const state = () => ({
  dialog_login: false,
})

export const mutations = {
  dialogLogin(state, pamars) {
    state.dialog_login = pamars
  }
}
