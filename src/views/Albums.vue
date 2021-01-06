<template>
  <div id="album">
    <Loader v-if="showLoadingInit" />
    <div v-else class="albums-list-container">
      <div class="toolbar-album">
        <p class="title">Albums By {{username}}</p>
        <button title="add" class="btn btn-small" @click="initAddAlbum">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div class="album-lists">
        <Album v-for="(album, index) in albums" :key="index" :album="album" />
      </div>
    </div>
    <div v-if="albumDialog" class="modal">
      <AlbumForm v-on:close="albumDialog = false" />
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue';
import Album from '@/components/Album.vue';
import AlbumForm from '@/components/AlbumForm.vue';
import albumsAPI from '@/API/albums';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UserAlbums',
  components: {
    Loader,
    Album,
    AlbumForm
  },
  props: {
    username: String
  },
  data() {
    return {
      showLoadingInit: true,
      albumDialog: false,
      album: {
        title: ''
      }
    }
  },
  methods: {
    ...mapActions('albums', ['applyAlbumData', 'removePostById']),
    async getAlbumByUserId() {
      const response = await albumsAPI.get({ params: `?userId=${this.$route.params.id}`})
      const data = await response.json();
      this.applyAlbumData(data);
      this.showLoadingInit = false;
    },
    initAddAlbum() {
      this.album = {
        title: ''
      }
      this.albumDialog = true;
    }
  },
  computed: {
    ...mapGetters({
      albums: 'albums/getAlbums'
    }),
  },
  created() {
    this.getAlbumByUserId();
  }
}
</script>

<style scoped lang="scss">
.albums-list-container {
  max-width: 450px;
  .toolbar-album {
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      margin: .5rem 0;
    }
  }
  .album-lists {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media only screen and (max-width: 500px) {
      justify-content: center;
    }
  }
}
</style>