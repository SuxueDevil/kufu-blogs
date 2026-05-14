<template>
  <div class="home">
    <section class="hero glass">
      <h1 class="hero-title">Welcome to my blog <span class="wave">🌸</span></h1>
      <p class="hero-sub">A cozy space for thoughts, code & cute things</p>
    </section>
    <section class="post-list">
      <BlogCard v-for="post in posts" :key="post.id" :post="post" />
    </section>
  </div>
</template>

<script setup>
import { posts } from '../data/posts.js'
import BlogCard from '../components/BlogCard.vue'
</script>
