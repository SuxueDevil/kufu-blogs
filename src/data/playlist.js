// type: 'local' → put MP3 in /public/music/
// type: 'netease' → get song ID from share link (e.g. music.163.com/song?id=XXXXX)
export const playlist = [
  {
    title: '晴天',
    artist: '周杰伦',
    type: 'netease',
    neteaseId: '186016',
  },
  {
    title: '起风了',
    artist: '买辣椒也用券',
    type: 'netease',
    neteaseId: '1336856846',
  },
  {
    title: 'Lofi Morning',
    artist: 'Local Demo',
    type: 'local',
    src: '/music/lofi-morning.mp3',
  },
]
