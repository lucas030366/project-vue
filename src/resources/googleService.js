import axios from "axios"

const apiClient = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/geocode/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
})

const getEndereco = dados => {
  const logradouro = dados.logradouro.split(" ").join("+");
  const key = "AIzaSyDe4nn2DY_NSI4901lconIQk44fkee95g"


  let teste = apiClient.get(`json?address=${logradouro},${dados.numero},${dados.cidade},${dados.estado}&key=${key}`)
    .then(response => {
      return response.data.results[0].geometry.location;
    })
    .catch(error => {
      return error.message
    })

  // let teste = axios
  //   .get('https://api.coindesk.com/v1/bpi/currentprice.json')
  //   .then(response => {
  //     console.log(response.data.bpi)
  //     return response.data.bpi
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })

  return teste
}


export default {
  getEndereco
}