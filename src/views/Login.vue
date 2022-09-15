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
    let redirect_url = "/MusicSearch"
    let thisPage_url = "/login"
    if (this.$route.hash) {
      // let convert_path = this.$route.fullPath.replace(thisPage_url+'#', redirect_url + '?')
      // let convert_path = this.$route.fullPath.replace(thisPage_url+'#', thisPage_url + '?')
      this.$router.push(this.$route.fullPath.replace(thisPage_url+'#',redirect_url+'?'))
    }
    // }else{
    //   let authorize_access_tokun = this.$route.token_type + ' ' + this.$route.access_token
    //   alert(authorize_access_tokun)
    //   this.$router.push({name:'MusicSearch',params:{AuthorizeTokun: authorize_access_tokun}})
    // }
  }
}
</script>
