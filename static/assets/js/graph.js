/* global ApexCharts getJSON */
const PIHOLE_TABLE_DOMAINS = document.querySelector('#table-pihole-domains')
const PIHOLE_TABLE_ADS = document.querySelector('#table-pihole-ads')
const PIHOLE_GENERAL = [
  'dns_queries_today',
  'ads_blocked_today',
  'ads_percentage_today'
]
let STATS_LIST = []

document.addEventListener('DOMContentLoaded', () => {
  getJSON('pihole/topitems', json => drawTopItems(json))
  getJSON('pihole/history', json => drawHistory(json))
  getJSON('pihole/querytypes', json => drawQueryTypes(json))
  getJSON('unifi/aps', json => drawHeatmap(json))
  getJSON('pihole', json => updatePi(json))
  getJSON('unifi', json => updateUnifi(json))
})

const updatePi = (json) => {
  PIHOLE_GENERAL.forEach(stat => {
    document.querySelector(`#${stat}`).innerHTML = stat === 'ads_percentage_today' ? `${json.data[stat].toFixed(2)}%` : json.data[stat]
  })
}

const updateUnifi = (json) => {
  document.querySelector(`#total_users`).innerHTML = json.data.total_users
}

const drawQueryTypes = (json) => {
  let values = Object.values(json.data.querytypes).filter(x => x >= 1)

  let options = {
    chart: {
      width: 380,
      type: 'pie'
    },
    labels: Object.keys(json.data.querytypes),
    series: values,
    colors: [
      '#008FFB',
      '#00E396',
      '#FEB019',
      '#FF4560',
      '#775DD0',
      '#4CAF50'
    ]
  }

  let chart = new ApexCharts(
    document.querySelector('#graph-pihole-queries'),
    options)
  chart.render()
  STATS_LIST.push('querytypes', chart)
}

const drawTopItems = (json) => {
  let domains = json.data.top_queries
  let ads = json.data.top_ads

  let i = 0
  PIHOLE_TABLE_DOMAINS.innerHTML = ''

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
  PIHOLE_TABLE_ADS.innerHTML = ''
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
}

const drawHistory = (json) => {
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
      labels: {
        formatter: (timestamp) => {
          let date = new Date(timestamp)
          return date.toLocaleTimeString()
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
  STATS_LIST.push('history', chart)
}

const drawHeatmap = (json) => {
  let data = []
  Object.keys(json.data).forEach(key => {
    data.push({
      name: key,
      data: json.data[key]
    })
  })

  var options = {
    chart: {
      height: 500,
      type: 'heatmap'
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,

        colorScale: {
          ranges: [{
              from: 0,
              to: 25,
              name: 'low',
              color: '#00A100'
            },
            {
              from: 26,
              to: 75,
              name: 'medium',
              color: '#128FD9'
            },
            {
              from: 76,
              to: 100,
              name: 'high',
              color: '#FFB200'
            },
            {
              from: 77,
              to: 100,
              name: 'extreme',
              color: '#FF0000'
            }
          ]
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    series: data

  }

  var chart = new ApexCharts(
    document.querySelector("#graph-unifi-heatmap"),
    options
  );

  chart.render();
}
