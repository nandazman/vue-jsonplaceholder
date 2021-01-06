const state = {
  todos: []
};

const actions = {
  applyTodoData({commit}, data) {
    commit('apply', data);
  },
  removeTodoById({commit}, id) {
    commit('removeById', id);
  },
  addTodo({commit}, data) {
    commit('addData', data);
  },
};

const mutations = {
  apply(state, data) {
    state.todos = data;
  },
  addData(state, data) {
    data.id = (state.todos.length - 9) + 200;
    state.todos = [data, ...state.todos]
  },
  removeById(state, id) {
    state.todos = state.todos.filter((todo) => todo.id !== id);
  },
};

const getters = {
  getTodos(state) {
    return state.todos
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}