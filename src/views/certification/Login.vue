<template>
  <div class="">
    
  </div>
</template>

<script>
export default {
  name: 'Certification',
  data() {
    return {
      menuShow: false,
      test:''
    }
  },
  methods: {
    
  },
  components: {
  },
  mounted: function() {
    console.log('test')
    let redirect_url = "/MusicSearch"
    let thisPage_url = "/login"
    if (this.$route.hash) {
      this.$router.push(this.$route.fullPath.replace(thisPage_url+'#',redirect_url+'?'))
    }
  }
}
</script>
