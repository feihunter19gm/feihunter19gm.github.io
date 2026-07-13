(() => {
  const fetchList = async url => {
    try {
      const response = await fetch(url)
      return response.ok ? response.json() : []
    } catch {
      return []
    }
  }

  const setupMusic = async () => {
    const player = document.querySelector('.makyo-music__player')
    const select = document.querySelector('.makyo-music__select')
    const title = document.querySelector('.makyo-music__meta strong')
    const buttons = document.querySelectorAll('.makyo-music__nav button')
    if (!player || !select) return

    const tracks = await fetchList('/music/playlist.json')
    if (!tracks.length) {
      select.innerHTML = '<option>暂无音乐，请上传到 source/music/</option>'
      return
    }

    let index = 0
    select.innerHTML = tracks.map((track, position) => `<option value="${position}">${track.title}</option>`).join('')
    select.disabled = false
    buttons.forEach(button => { button.disabled = false })

    const choose = position => {
      index = (position + tracks.length) % tracks.length
      const track = tracks[index]
      select.value = String(index)
      title.textContent = track.title
      player.src = track.src
    }

    choose(0)
    select.addEventListener('change', () => choose(Number(select.value)))
    buttons[0].addEventListener('click', () => choose(index - 1))
    buttons[1].addEventListener('click', () => choose(index + 1))
    player.addEventListener('ended', () => choose(index + 1))
  }

  const setupGallery = async () => {
    const gallery = document.querySelector('.makyo-gallery')
    if (!gallery) return
    const image = gallery.querySelector('img')
    const link = gallery.querySelector('.makyo-gallery__image')
    const empty = gallery.querySelector('.makyo-gallery__empty')
    const caption = gallery.querySelector('.makyo-gallery__caption')
    const previous = gallery.querySelector('.makyo-gallery__prev')
    const next = gallery.querySelector('.makyo-gallery__next')
    const images = await fetchList(gallery.dataset.manifestUrl)
    if (!images.length) return

    let index = 0
    const show = position => {
      index = (position + images.length) % images.length
      const item = images[index]
      image.src = item.src
      image.alt = item.title
      image.hidden = false
      link.href = item.src
      empty.hidden = true
      caption.textContent = `${index + 1} / ${images.length} · ${item.title}（点击查看大图）`
    }

    previous.disabled = false
    next.disabled = false
    previous.addEventListener('click', () => show(index - 1))
    next.addEventListener('click', () => show(index + 1))
    show(0)
  }

  const escapeHtml = value => String(value || '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]))

  const setupLeaderboard = async () => {
    const rank = document.querySelector('.makyo-rank')
    if (!rank) return
    const body = rank.querySelector('.makyo-rank__body')
    const rows = await fetchList(rank.dataset.rankUrl)
    if (!Array.isArray(rows) || !rows.length) {
      body.innerHTML = '<div class="makyo-rank__empty">暂无排名，编辑 source/games/leaderboard.json 后会显示。</div>'
      return
    }

    body.innerHTML = rows
      .slice()
      .sort((a, b) => Number(b.score || 0) - Number(a.score || 0))
      .slice(0, 10)
      .map((item, index) => `
        <div class="makyo-rank__row">
          <span class="makyo-rank__place">#${index + 1}</span>
          <span>${escapeHtml(item.player)}</span>
          <span>${escapeHtml(item.game)}</span>
          <span class="makyo-rank__score">${Number(item.score || 0).toLocaleString()}</span>
          <span>${escapeHtml(item.date)}</span>
        </div>
      `)
      .join('')
  }

  setupMusic()
  setupGallery()
  setupLeaderboard()
})()
