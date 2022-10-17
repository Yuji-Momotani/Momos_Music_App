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
    console.log('test2')
    console.log('test3')
    console.log(this.$route.hash)
    let redirect_url = '/MusicSearch'
    let thisPage_url = '/login'
    console.log(this.$route.hash)
    if (this.$route.hash) {
      this.$router.push(this.$route.fullPath.replace(thisPage_url+'#',redirect_url+'?'))
    }
  }
}
</script>
