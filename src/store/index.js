import Vue from 'vue'
import Vuex from 'vuex'
import user from './user';
import permission from './permission'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    roles: state => state.user.roles,
    hasRoles: state => state.user.roles && state.user.roles.length > 0,
    permission_routes: state => state.permission.routes
  },
  mutations: {
  },

  actions: {
  },
  modules: {
    user, permission
  }
})
