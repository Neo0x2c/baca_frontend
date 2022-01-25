<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <Footer></Footer>

  </div>
</template> 
<script>
import Header from "./views/header/header"
import Footer from "./views/footer/footer"

export default {
  name: 'App',
  components: {
    Header, Footer
  },
  mounted () {
    this.currPath = this.$route.path
  }
}
</script>
 
