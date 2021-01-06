const state = {
  posts: []
};

const actions = {
  applyPostData({commit}, data) {
    commit('apply', data);
  },
  removePostById({commit}, id) {
    commit('removeById', id);
  },
  addPost({commit}, data) {
    commit('addData', data);
  },
  editPost({commit}, data) {
    commit('editPost', data);
  }
};

const mutations = {
  apply(state, data) {
    state.posts = data;
  },
  removeById(state, id) {
    state.posts = state.posts.filter((post) => post.id !== id);
  },
  addData(state, data) {
    data.id = (state.posts.length - 9) + 100;
    state.posts = [data, ...state.posts]
  },
  editPost(state, data) {
    state.posts = state.posts.map((post) => {
      if (post.id === data.id) {
        post = data;
      }
      return post;
    });
  }
};

const getters = {
  getPosts(state) {
    return state.posts
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}