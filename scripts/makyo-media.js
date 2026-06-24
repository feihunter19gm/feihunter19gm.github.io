'use strict'

const fs = require('fs')
const path = require('path')

const mediaExtensions = new Set(['.mp3', '.ogg', '.wav', '.m4a', '.flac'])
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])

const collectMedia = (directory, extensions) => {
  if (!fs.existsSync(directory)) return []

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const absolutePath = path.join(directory, entry.name)
    if (entry.isDirectory()) return collectMedia(absolutePath, extensions).map(item => path.join(entry.name, item))
    return extensions.has(path.extname(entry.name).toLowerCase()) ? [entry.name] : []
  })
}

hexo.extend.generator.register('makyo-media-manifests', () => {
  const music = collectMedia(path.join(hexo.source_dir, 'music'), mediaExtensions).map(file => ({
    title: path.basename(file, path.extname(file)).replace(/^\d+\s*[-_.]?\s*/, ''),
    src: `/music/${file.split(path.sep).map(encodeURIComponent).join('/')}`
  }))
  const images = collectMedia(path.join(hexo.source_dir, 'gallery'), imageExtensions).map(file => ({
    title: path.basename(file, path.extname(file)),
    src: `/gallery/${file.split(path.sep).map(encodeURIComponent).join('/')}`
  }))

  return [
    { path: 'music/playlist.json', data: JSON.stringify(music) },
    { path: 'gallery/manifest.json', data: JSON.stringify(images) }
  ]
})
