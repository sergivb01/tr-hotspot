/* global ApexCharts fetch */
const PIHOLE_TABLE_DOMAINS = document.querySelector('#table-pihole-domains')
const PIHOLE_TABLE_ADS = document.querySelector('#table-pihole-ads')
const UNIFI_GENERAL = [
  'total_clients',
  'current_connected'
]
const PIHOLE_GENERAL = [
  'dns_queries_today',
  'ads_blocked_today',
  'ads_percentage_today'
]

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

document.addEventListener('DOMContentLoaded', () => {
  getJSON('pihole/querytypes', json => {
    let options = {
      chart: {
        width: 380,
        type: 'pie'
      },
      labels: Object.keys(json.data.querytypes),
      series: Object.values(json.data.querytypes),
      colors: [
        '#008FFB',
        '#00E396',
        '#FEB019',
        '#FF4560',
        '#775DD0',
        '#4CAF50'
      ]
    }

    new ApexCharts(
      document.querySelector('#graph-pihole-queries'),
      options
    ).render()
  })

  getJSON('pihole/history', json => {
    let domains = json.data.domains_over_time
    let ads = json.data.ads_over_time

    let allowedDomains = []
    let blockedDomains = []

    Object.keys(domains).forEach(time => {
      allowedDomains.push([
        parseInt(time * 1000),
        domains[time]
      ])

      blockedDomains.push([
        parseInt(time * 1000),
        ads[time]
      ])
    })

    let options = {
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      plotOptions: {
        line: {
          curve: 'smooth'
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      series: [{
        name: 'Allowed domains',
        data: allowedDomains
      }, {
        name: 'Blocked domains',
        data: blockedDomains
      }],
      markers: {
        size: 0,
        style: 'full'
      },
      // colors: ['#0165fc'],
      fill: {
        gradient: {
          enabled: true,
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      xaxis: {
        // type: 'datetime',
        labels: {
          formatter: (timestamp) => {
            let date = new Date(timestamp)
            return date.toLocaleTimeString()
            // return new Date(timestamp).getHours() + new Date(timestamp).getMinutes()
          }
        }
      },
      tooltip: {
        shared: true
      }
    }

    let chart = new ApexCharts(
      document.querySelector('#graph-pihole-history'),
      options
    )

    chart.render()
  })

  getJSON('pihole', json => {
    PIHOLE_GENERAL.forEach(stat => {
      document.querySelector(`#${stat}`).innerHTML = stat === 'ads_percentage_today' ? `${json.data[stat].toFixed(2)}%` : json.data[stat]
    })
  })

  getJSON('pihole/topitems', json => {
    let domains = json.data.top_queries
    let ads = json.data.top_ads

    PIHOLE_TABLE_DOMAINS.append()
    /*
    <tr>
      <th>pos</th>
      <td>domain</td>
      <td>hits</td>
    </tr>
    */

    let i = 0
    Object.keys(domains).forEach(domain => {
      let hits = domains[domain]
      let doc = document.createElement('tr')
      doc.innerHTML = `
      <tr>
        <th>${++i}</th>
        <td>${domain}</td>
        <td>${hits}</td>
      </tr>
      `

      PIHOLE_TABLE_DOMAINS.append(doc)
    })

    i = 0
    Object.keys(ads).forEach(ad => {
      let hits = ads[ad]
      let doc = document.createElement('tr')
      doc.innerHTML = `
      <tr>
        <th>${++i}</th>
        <td>${ad}</td>
        <td>${hits}</td>
      </tr>
      `

      PIHOLE_TABLE_ADS.append(doc)
    })
  })
})
