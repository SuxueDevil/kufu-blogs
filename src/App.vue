<template>
  <div class="app-shell">
    <NavBar />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
    <MusicPlayer />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import MusicPlayer from './components/MusicPlayer.vue'
</script>
