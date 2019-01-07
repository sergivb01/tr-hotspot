const unifiClient = require('node-unifiapi')
const unifi = unifiClient({
  baseUrl: process.env.UNIFI_URL, // https://192.168.1.200:8443
  username: process.env.UNIFI_USER,
  password: process.env.UNIFI_PASSWORD,
  debug: false,
  debugNet: false
})
/* eslint-disable */

const authMAC = mac => {
  return new Promise((resolve, reject) => {
    unifi.netsite('/cmd/stamgr', {
        cmd: 'authorize-guest',
        mac: mac,
        minutes: process.env.AUTH_TIME
      }, {}, 'POST', 'default')
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

module.exports = {
  authMAC
}
