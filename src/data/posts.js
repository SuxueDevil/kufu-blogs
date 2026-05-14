export const posts = [
  {
    id: 1,
    title: 'My First Blog Post',
    tag: 'Life',
    excerpt: 'Welcome to my cute little corner of the internet. Here I share thoughts on life, code, and everything in between.',
    content: `## Hello World 🌸

Welcome to my first blog post! This is a space where I share my thoughts and experiences.

I believe in keeping things simple and beautiful. This blog is built with Vue and designed with a glassmorphism aesthetic — soft, clean, and easy on the eyes.

Stay tuned for more posts about technology, design, and daily life.`,
    date: '2026-05-01',
    readTime: '2 min read',
  },
  {
    id: 2,
    title: 'The Beauty of Glassmorphism',
    tag: 'Design',
    excerpt: 'Exploring the frosted glass UI trend — why it looks so good and how to use it tastefully.',
    content: `## What is Glassmorphism?

Glassmorphism is a design style that mimics frosted glass. Key elements include:

- **Translucency** — elements let the background show through
- **Blur** — backdrop-filter creates the frosted effect
- **Subtle borders** — light edges define the glass edges
- **Layered depth** — overlapping elements create visual hierarchy

The effect works best on colorful, gradient backgrounds where the blur has something interesting to reveal.`,
    date: '2026-05-03',
    readTime: '4 min read',
  },
  {
    id: 3,
    title: 'Vue 3 Composition API Tips',
    tag: 'Tech',
    excerpt: 'A few practical patterns I picked up while building projects with Vue 3 composition API.',
    content: `## Vue 3 Composition API

The Composition API is a powerful way to organize component logic. Here are a few tips:

- Use composables for reusable logic
- Leverage \`<script setup>\` for cleaner code
- Prefer \`ref\` for primitives, \`reactive\` for objects
- Extract complex logic into separate composable files

Clean, readable, maintainable — that's the goal.`,
    date: '2026-05-08',
    readTime: '5 min read',
  },
  {
    id: 4,
    title: 'Building a Personal Blog with Vue',
    tag: 'Tech',
    excerpt: 'A walkthrough of how this blog was built — project structure, components, and design decisions.',
    content: `## Project Structure

\`\`\`
src/
├── components/   # reusable UI pieces
├── views/        # page-level components
├── data/         # static content (blog posts)
├── styles/       # global CSS
├── App.vue       # root layout shell
└── main.js       # entry point + router setup
\`\`\`

Keeping things separated makes the project easy to navigate and maintain.`,
    date: '2026-05-10',
    readTime: '6 min read',
  },
  {
    id: 5,
    title: 'Why I Love Minimalist Design',
    tag: 'Life',
    excerpt: 'Less is more — reflections on simplicity, whitespace, and letting content breathe.',
    content: `## Minimalism in Design

Good design is as little design as possible. Removing clutter lets the content shine.

- Use ample whitespace
- Limit your color palette
- Choose one or two fonts
- Let the message be the hero

Minimalism isn't about being boring — it's about being intentional.`,
    date: '2026-05-11',
    readTime: '3 min read',
  },
]
