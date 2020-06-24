import colors from "vuetify/es5/util/colors"

const formatError = message => {
  const messageSplit = message.split(":")
  return messageSplit[messageSplit.length - 1].trim()
}

const errorHandler = (error, vm, info) => {

  const jwtErrors = ["jwt malformed", "jwt expired", "jwt not active", "invalid token"]

  if (jwtErrors.some(jwtError => error.message.includes(jwtError))) {
    vm.$route.push({
      path: "/login",
      query: {
        redirect: vm.$route.path
      }
    })
  }
}

const currencyFormater = ({ locale, currency } = { locale: "pt-BR", currency: "BRL" }) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  })
}

// Reduce:
// [1,2,3,4].reduce((atual, numero) => atual + numero, 0) /*0 é o "atual inicial" p/ comecar*/

const groupBy = (array, key, makeCurrencyKey) => {
  return array.reduce((accumulated, item) => {
    const currencyKey = makeCurrencyKey(item, key)
    return {
      ...accumulated,
      [currencyKey]: [
        ...(accumulated[currencyKey] || []),
        item
      ]
    }
  }, {})
}

const registerVuexModule = (rootStore, moduleName, store) => {
  if (!(moduleName in rootStore._modules.root._children)) {
    rootStore.registerModule(moduleName, store)
  }
}

const idX = (object, keyPath) => { //record.category.user.name
  const keys = keyPath.split(".") // ["record","category","user","name"]
  return keys.reduce((obj, current) =>
    obj && obj[current] != null ? obj[current] : null
    , object)
}

const generateChartData = ({ items, keyToGroup, keyOfValue, aliases, type, bgColor }) => {
  const grouped = groupBy(items, keyToGroup, idX)
  const response = {}

  for (let key in grouped) {
    response[(aliases && aliases[key]) || key] =
      grouped[key].reduce((acc, item) => acc + item[keyOfValue], 0)
  }

  const labels = Object.keys(response)

  switch (type) {
    
    case "bar":

      return {
        datasets: labels.map((label, indice) => ({
          label: `${label}: ${currencyFormater().format(response[label])}`,
          data: [response[label] >= 0 ? response[label] : -response[label]],
          backgroundColor: bgColor[indice],
          borderWidth: 0
        })),
        labels: [""]
      }

    case "doughnut":
      return {
        datasets: [{
          data: labels.map(label => response[label] >= 0 ? response[label] : -response[label]),
          backgroundColor: bgColor || generateColors(labels.length),
          borderWidth: 0
        }],
        labels: items.length > 0 ? labels : []
      }
  }
}

const generateChartOptions = (type) => {

  let tooltips = {}

  switch (type) {
    case "bar":
      tooltips = {
        callbacks: {
          title() { },
          label(tooltip, data) {
            return data.datasets[tooltip.datasetIndex].label
          }
        }
      }
      break;
    
    case "doughnut":
      tooltips = {
        callbacks: {
          label(tooltip, data){
            const label = data.labels[tooltip.index]
            const value = currencyFormater().format(data.datasets[tooltip.datasetIndex].data[tooltip.index])
            return `${label}: ${value}`
          }
        }
      }
    break;

    default:
      break;
  }

  const scales = {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }

  return {
    scales,
    tooltips
  }
}

const generateChartJsConfig = opts => {
  const { type } = opts
  const data = generateChartData(opts)
  const options = generateChartOptions(type)

  return {
    type,
    data,
    options
  }
}

const generateColors = length => {
  const pallets = Object.keys(colors).filter(cores => cores != "shades").sort()
  const tones = ["base", "darken1", "lighten1"]
  let currentPallet = 0
  let currentTone = 0

  return Array(length).fill().map((item,indice) => {
    const color = colors[pallets[currentPallet]][tones[currentTone]]
    currentPallet++
    if((indice+1) % pallets.length == 0){
      currentPallet = 0
      currentTone++
    }
    return color 
  })
}

export {
  formatError,
  errorHandler,
  currencyFormater,
  groupBy,
  registerVuexModule,
  generateChartJsConfig
}