<template>
  <div class="post-page">
    <article class="post-content glass" v-if="post">
      <router-link to="/" class="back-link">← Back to home</router-link>
      <span class="card-tag">{{ post.tag }}</span>
      <h1>{{ post.title }}</h1>
      <div class="card-meta">
        <span>{{ post.date }}</span>
        <span>{{ post.readTime }}</span>
      </div>
      <div class="body" v-html="rendered"></div>
    </article>
    <div class="post-content glass not-found" v-else>
      <router-link to="/" class="back-link">← Back to home</router-link>
      <h1>Post not found</h1>
      <p>Hmm, that page doesn't seem to exist.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { posts } from '../data/posts.js'

const route = useRoute()
const post = computed(() => posts.find((p) => p.id === Number(route.params.id)))

const rendered = computed(() => {
  if (!post.value) return ''
  return marked(post.value.content)
})
</script>
