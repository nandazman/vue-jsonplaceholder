const state = {
  users: []
};

const actions = {
  applyUserData({commit}, data) {
    commit('apply', data);
  },
  removeUserById({commit}, id) {
    commit('removeById', id);
  },
  addUser({commit}, data) {
    commit('addData', data);
  },
  editUser({commit}, data) {
    commit('editUser', data);
  }
};

const mutations = {
  apply(state, data) {
    state.users = data;
  },
  removeById(state, id) {
    state.users = state.users.filter((user) => user.id !== id);
  },
  addData(state, data) {
    data.id = state.users.length + 1;
    state.users = [data, ...state.users]
  },
  editUser(state, data) {
    state.users = state.users.map((user) => {
      if (user.id === data.id) {
        user = data;
      }
      return user;
    });
  }
};

const getters = {
  getUsers(state) {
    return state.users
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}