<template>
  <article class="blog-card glass" @click="$router.push(`/post/${post.id}`)">
    <span class="card-tag">{{ post.tag }}</span>
    <h2 class="card-title">{{ post.title }}</h2>
    <p class="card-excerpt">{{ post.excerpt }}</p>
    <div class="card-meta">
      <span>{{ post.date }}</span>
      <span>{{ post.readTime }}</span>
    </div>
  </article>
</template>

<script setup>
defineProps({
  post: { type: Object, required: true },
})
</script>
