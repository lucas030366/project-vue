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

const currencyFormater = ({locale, currency} = {locale: "pt-BR", currency: "BRL"}) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  })
}

// Reduce:
// [1,2,3,4].reduce((atual, numero) => atual + numero, 0) /*0 é o "atual inicial" p/ comecar*/

const groupBy = (array, key, makeCurrencyKey) => {
  return array.reduce( (accumulated, item) => {
    const currencyKey = makeCurrencyKey(item, key)
    return{
      ...accumulated,
      [currencyKey]:[
        ...(accumulated[currencyKey] || []),
        item
      ]
    }
  }, {})
}

export {
  formatError,
  errorHandler,
  currencyFormater,
  groupBy
}