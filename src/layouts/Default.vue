<template>
    <div class="layout">
        <header class="header">
            <NavBar/>
        </header>
        <slot/>
    </div>
</template>

<script>
  import NavBar from '../components/NavBar'

  export default {
    components: {
      NavBar,
    },
  }
</script>
<style lang="scss">
    html {
        body.has-navbar-fixed-top {
            padding-top: 0;
        }
    }
</style>
