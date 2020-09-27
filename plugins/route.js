import * as store from "@/store/index.js"

export default ({ app }) => {
  app.router.beforeEach((to, from) => {
    store.commit('hideHeader')
  })
}