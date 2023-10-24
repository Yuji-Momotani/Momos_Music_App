<template>
  <div class="">
    
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      menuShow: false,
    }
  },
  methods: {
    
  },
  components: {
  },
  mounted: function() {
    let redirect_url = '/MusicSearch'
    let thisPage_url = '/login'
    if (this.$route.hash) {
      this.$router.push(this.$route.fullPath.replace(thisPage_url+'#',redirect_url+'?'))
    }
  }
}
</script>
