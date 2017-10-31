<template>
  <div id="app">
    <router-link to="/">Login</router-link>
    <router-link to="/chat">Chat</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  
}
</script>


