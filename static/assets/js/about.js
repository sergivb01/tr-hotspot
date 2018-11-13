/* global getJSON */
document.addEventListener('DOMContentLoaded', () => {
  const docs = document.querySelectorAll('#wp-post')
  getJSON('wp', json => {
    let i = 0
    docs.forEach(el => {
      let title = document.createElement('p')
      title.textContent = json.data[i].title
      title.className = 'title'

      let subtitle = document.createElement('p')
      subtitle.textContent = json.data[i].descriptionStripped
      subtitle.className = 'subtitle'

      let link = document.createElement('a')
      link.classList.add('button')
      link.classList.add('is-white')
      link.innerHTML = 'Llegir més'
      link.href = json.data[i].link

      el.appendChild(title)
      el.appendChild(subtitle)
      el.appendChild(link)

      i++
    })
  })
})
