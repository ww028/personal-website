export const state = () => ({
  login: false,
  username: '',
})

export const mutations = {
  loginInfo(state, pamars){
    state.login = pamars.login
    state.username = pamars.username

    let login_info = {
      login: pamars.login,
      username: pamars.username
    }
    localStorage.setItem('login_info', JSON.stringify(login_info))
  }
}
