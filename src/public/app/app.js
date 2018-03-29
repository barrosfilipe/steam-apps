new Vue({
  el: '#app',
  data: {
    games: null
  },
  methods: {
    getAllGames: function() {
      axios.get('/api/apps').then(response => {
        this.games = response.data.games
      })
    }
  },
  mounted() {
    this.getAllGames()
  }
})