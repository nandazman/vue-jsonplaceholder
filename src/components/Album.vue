<template>
  <div class="album-list">
    <textarea class="edit" v-if="editAlbum" v-model="album.title"></textarea>
    <span v-else>{{album.title}}</span>
    <div class="action">
      <button v-if="editAlbum" title="edit" class="btn btn-small" @click="updateAlbum">
        <i v-if="showLoadingEdit" class="fas fa-spinner fa-spin"></i>
        <i v-else class="fas fa-check"></i>
      </button>
      <button v-else title="edit" class="btn btn-small" @click="editAlbum = true">
        <i class="fas fa-edit"></i>
      </button>
      <button title="delete" class="btn btn-small" @click="deleteAlbum">
        <i v-if="showLoadingDelete" class="fas fa-spinner fa-spin"></i>
        <i v-else class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>
import albumsAPI from '@/API/albums';
import { mapActions } from 'vuex';

export default {
  name: 'Album',
  components: {
  },
  props: {
    album: Object
  },
  data() {
    return {
      showLoadingDelete: false,
      editAlbum: false,
      showLoadingEdit: false
    }
  },
  methods: {
    ...mapActions('albums', ['removeAlbumById']),
    async updateAlbum() {
      this.showLoadingEdit = true;
      if (this.album.id < 100) {
        await albumsAPI.put({ params: this.album.id, payload: this.album });
      }
      this.showLoadingEdit = false;
      this.editAlbum = false;
    },
    async deleteAlbum() {
      this.showLoadingDelete = true;
      await albumsAPI.delete({ params: this.album.id });
      this.removeAlbumById(this.album.id);
      this.showLoadingDelete = false;
    }
  }
}
</script>


<style scoped lang="scss">
.album-list {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: capitalize;
  border: 1px solid #e3e3e3;
  padding: .5rem;
  margin-bottom: 1rem;
  transition: all 250ms;
  position: relative;
  &:hover {
    background: #7d09b8;
    color: #fff;
  }
  .edit {
    width: 100%;
    height: 45%;
    overflow: hidden;
    outline: none;
    resize: none;
  }
  .action {
    position: absolute;
    top: 5px;
    right: 0;
  }
}
</style>
