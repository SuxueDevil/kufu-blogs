<template>
  <div class="music-player" :class="{ expanded: isExpanded, hidden: !hasTracks }">
    <button class="player-toggle glass" @click="isExpanded = !isExpanded" v-if="!isExpanded">
      <span class="toggle-icon">🎵</span>
    </button>

    <div class="player-panel glass" v-if="isExpanded">
      <div class="player-header">
        <span class="player-title">{{ isNetease ? '网易云音乐' : 'Now Playing' }}</span>
        <button class="btn-icon" @click="isExpanded = false">×</button>
      </div>

      <!-- Track info (shared) -->
      <div class="track-info">
        <div class="track-name text-ellipsis">{{ currentTrack.title || 'No track' }}</div>
        <div class="track-artist">{{ currentTrack.artist || '' }}</div>
      </div>

      <!-- LOCAL mode -->
      <template v-if="!isNetease">
        <div class="player-visual">
          <div class="visual-bars" :class="{ playing: isPlaying }">
            <span v-for="i in 5" :key="i" class="bar" :style="{ '--i': i }"></span>
          </div>
        </div>

        <div class="progress-bar" @click="seek">
          <div class="progress-track" ref="progressTrack">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            <div class="progress-thumb" :style="{ left: progress + '%' }"></div>
          </div>
          <div class="progress-time">
            <span>{{ formatTime(currentTime) }}</span>
            <span>{{ formatTime(duration) }}</span>
          </div>
        </div>

        <div class="player-controls">
          <button class="btn-icon" @click="prevTrack" :disabled="!hasPrev">⏮</button>
          <button class="btn-play glass" @click="togglePlay">
            {{ isPlaying ? '⏸' : '▶' }}
          </button>
          <button class="btn-icon" @click="nextTrack" :disabled="!hasNext">⏭</button>
        </div>

        <div class="audio-error" v-if="hasError">⚠ Failed to load audio</div>

        <audio ref="audioEl"
          @timeupdate="onTimeUpdate" @loadedmetadata="onLoaded"
          @ended="onEnded" @error="onError"
          @canplay="onCanPlay"
          preload="auto"></audio>
      </template>

      <!-- NetEase mode -->
      <template v-else>
        <div class="netease-container">
          <iframe class="netease-iframe" :src="neteaseSrc" frameborder="0" allow="autoplay"></iframe>
        </div>
      </template>

      <!-- Playlist -->
      <div class="playlist" v-if="playlist.length > 1">
        <div v-for="(track, i) in playlist" :key="i"
          class="playlist-item" :class="{ active: i === current }"
          @click="playTrack(i)">
          <span class="pl-index">{{ i + 1 }}</span>
          <span class="pl-type">{{ track.type === 'netease' ? '☁️' : '📁' }}</span>
          <div class="pl-info">
            <span class="pl-title text-ellipsis">{{ track.title }}</span>
            <span class="pl-artist">{{ track.artist }}</span>
          </div>
          <span class="pl-playing" v-if="i === current && isPlaying">♫</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import { playlist } from '../data/playlist.js'

const audioEl = ref(null)
const progressTrack = ref(null)
const isExpanded = ref(false)
const isPlaying = ref(false)
const current = ref(0)
const currentTime = ref(0)
const duration = ref(0)
const hasError = ref(false)
let pendingPlay = false

const hasTracks = computed(() => playlist.length > 0)
const currentTrack = computed(() => playlist[current.value] || {})
const isNetease = computed(() => currentTrack.value.type === 'netease')
const progress = computed(() => duration.value ? (currentTime.value / duration.value) * 100 : 0)
const hasPrev = computed(() => current.value > 0)
const hasNext = computed(() => current.value < playlist.length - 1)

const neteaseSrc = computed(() => {
  const id = currentTrack.value.neteaseId || ''
  return `https://music.163.com/outchain/player?type=2&id=${id}&auto=1&height=66`
})

const togglePlay = () => {
  const a = audioEl.value
  if (!a) return
  if (isPlaying.value) {
    a.pause()
    isPlaying.value = false
  } else {
    a.play().then(() => { isPlaying.value = true }).catch(() => { hasError.value = true })
  }
}

const playTrack = (i) => {
  if (i === current.value && !hasError.value) return
  current.value = i
  hasError.value = false
  if (playlist[i].type === 'netease') {
    isPlaying.value = true
    return
  }
  const a = audioEl.value
  if (!a) return
  a.src = playlist[i].src
  isPlaying.value = false
  pendingPlay = true
  a.load()
}

const onCanPlay = () => {
  if (!pendingPlay) return
  pendingPlay = false
  audioEl.value?.play().then(() => { isPlaying.value = true }).catch(() => { hasError.value = true })
}

const prevTrack = () => { if (hasPrev.value) playTrack(current.value - 1) }
const nextTrack = () => { if (hasNext.value) playTrack(current.value + 1) }

const seek = (e) => {
  const a = audioEl.value
  const track = progressTrack.value
  if (!a || !duration.value || !track) return
  const rect = track.getBoundingClientRect()
  a.currentTime = ((e.clientX - rect.left) / rect.width) * duration.value
}

const onTimeUpdate = () => { if (audioEl.value) currentTime.value = audioEl.value.currentTime }
const onLoaded = () => { if (audioEl.value) duration.value = audioEl.value.duration }
const onEnded = () => {
  isPlaying.value = false
  if (hasNext.value) nextTrack()
}
const onError = () => { isPlaying.value = false; hasError.value = true }

onBeforeUnmount(() => {
  const a = audioEl.value
  if (a) {
    a.pause()
    a.src = ''
    a.load()
  }
})

const formatTime = (s) => {
  if (!s || !isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  return `${m}:${Math.floor(s % 60).toString().padStart(2, '0')}`
}
</script>

<style scoped>
.music-player { position: fixed; bottom: 24px; right: 24px; z-index: 200; font-family: var(--font); }
.music-player.hidden { display: none; }

.player-toggle {
  width: 48px; height: 48px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; border: 1px solid var(--glass-border); color: var(--text);
  transition: transform 0.2s;
}
.player-toggle:hover { transform: scale(1.1); }
.toggle-icon { font-size: 1.2rem; }

.player-panel { width: 280px; padding: 20px; border: 1px solid var(--glass-border); }

.player-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.player-title { font-size: 0.85rem; font-weight: 600; color: var(--text-light); }

.btn-icon { background: none; border: none; cursor: pointer; font-size: 1.1rem; color: var(--text); opacity: 0.6; padding: 4px; }
.btn-icon:hover:not(:disabled) { opacity: 1; }
.btn-icon:disabled { opacity: 0.25; cursor: default; }

.player-visual { display: flex; justify-content: center; margin-bottom: 14px; }
.visual-bars { display: flex; gap: 5px; align-items: flex-end; height: 36px; }
.bar { width: 5px; border-radius: 3px; background: var(--pink-light); height: 8px; transition: height 0.3s; }
.visual-bars.playing .bar { animation: bounce 0.8s ease-in-out infinite; animation-delay: calc(var(--i) * 0.15s); }

@keyframes bounce {
  0%, 100% { height: 8px; background: var(--pink-light); }
  50% { height: 32px; background: var(--pink); }
}

.track-info { text-align: center; margin-bottom: 14px; }
.track-name { font-size: 0.95rem; font-weight: 600; color: var(--text); }
.track-artist { font-size: 0.8rem; color: var(--text-light); margin-top: 2px; }

.progress-bar { margin-bottom: 10px; cursor: pointer; }
.progress-track { height: 4px; background: rgba(180,160,200,0.2); border-radius: 2px; position: relative; margin-bottom: 4px; }
.progress-fill { height: 100%; background: var(--pink); border-radius: 2px; transition: width 0.1s linear; }
.progress-thumb { position: absolute; top: -4px; width: 12px; height: 12px; border-radius: 50%; background: var(--pink); transform: translateX(-50%); opacity: 0; transition: opacity 0.15s; }
.progress-bar:hover .progress-thumb { opacity: 1; }
.progress-time { display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-light); }

.player-controls { display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 14px; }
.btn-play { width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.1rem; }

.audio-error { text-align: center; font-size: 0.8rem; color: #e88; margin-bottom: 10px; }

.netease-container { margin-bottom: 10px; }
.netease-iframe { width: 100%; height: 66px; border-radius: 12px; }

.playlist { max-height: 120px; overflow-y: auto; border-top: 1px solid rgba(180,160,200,0.15); padding-top: 8px; }
.playlist-item { display: flex; align-items: center; gap: 8px; padding: 7px 8px; border-radius: 10px; cursor: pointer; transition: background 0.15s; }
.playlist-item:hover, .playlist-item.active { background: rgba(248,165,194,0.1); }
.pl-index { width: 18px; font-size: 0.75rem; color: var(--text-light); text-align: center; }
.pl-type { font-size: 0.75rem; }
.pl-info { flex: 1; min-width: 0; }
.pl-title { font-size: 0.82rem; font-weight: 500; display: block; }
.pl-artist { font-size: 0.72rem; color: var(--text-light); }
.pl-playing { color: var(--pink); font-size: 0.9rem; }

@media (max-width: 640px) {
  .music-player { bottom: 16px; right: 16px; }
  .player-panel { width: 260px; padding: 16px; }
}
</style>
