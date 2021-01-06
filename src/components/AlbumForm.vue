<template>
  <div class="content">
    <h2 class="title">Album Form</h2>
    <div class="form">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" v-model="album.title" placeholder="title" autocomplete="off">
      </div>
    </div>
    <div class="action">
      <button title="cancel" class="btn btn-small" @click="closeDialog">
        Cancel
      </button>
      <button title="edit" class="btn btn-small" @click="initAddAlbum">
        <i v-if="showLoading" class="fas fa-spinner fa-spin"></i>
        <span v-else>Create</span>
      </button>
    </div>
  </div>
</template>

<script>
import {  mapActions } from 'vuex';
import albumAPI from '@/API/albums';

export default {
  name: 'AlbumForm',
  data() {
    return {
      showLoading: false,
      album: {
        title: ''
      }
    }
  },
  methods: {
    ...mapActions('albums', ['addAlbum']),
    closeDialog() {
      this.$emit('close');
    },
    async initAddAlbum() {
      this.showLoading = true;
      const response = await albumAPI.post({ payload: this.album });
      const data = await response.json();
      this.addAlbum(data);
      this.showLoading = false;
      this.$emit('close');
    }
  }
}
</script>
