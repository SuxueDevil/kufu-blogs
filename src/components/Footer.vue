<template>
  <footer class="footer">
    <p>&copy; {{ year }} Kafu's Blog — Made with love & Vue</p>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
