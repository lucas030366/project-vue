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

export {
  formatError,
  errorHandler
}