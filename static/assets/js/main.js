document.addEventListener('DOMContentLoaded', () => {
  // Add a click event on each of them
  document.querySelectorAll('.navbar-burger').forEach(($el) => {
    $el.addEventListener('click', () => {
      let target = $el.dataset.target
      let $target = document.getElementById(target)
      $el.classList.toggle('is-active')
      $target.classList.toggle('is-active')
    })
  })

  getJSON('unifi', json => updateConnectedUsers(json))
})

const getJSON = (path, callback) => {
  return fetch(`/api/v1/${path}`)
    .then(res => {
      return res.json()
    })
    .then(json => callback(json))
    .catch(err => {
      throw err
    })
}

const updateConnectedUsers = (json) => {
  document.querySelectorAll('#connected_users').forEach(el => {
    el.innerHTML = json.data.connected_users
  })
}
