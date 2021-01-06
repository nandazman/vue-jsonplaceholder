const state = {
  albums: []
};

const actions = {
  applyAlbumData({commit}, data) {
    commit('apply', data);
  },
  removeAlbumById({commit}, id) {
    commit('removeById', id);
  },
  addAlbum({commit}, data) {
    commit('addData', data);
  },
};

const mutations = {
  apply(state, data) {
    state.albums = data;
  },
  addData(state, data) {
    data.id = (state.albums.length - 9) + 100;
    state.albums = [data, ...state.albums]
  },
  removeById(state, id) {
    state.albums = state.albums.filter((album) => album.id !== id);
  },
};

const getters = {
  getAlbums(state) {
    return state.albums
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}