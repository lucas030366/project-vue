import apollo from "@/plugins/apollo"
import moment from "moment"

import RecordsQuery from "../graphql/Records.graphql"
import TotalBalanceQuery from "../graphql/TotalBalance.graphql"

const records = async ( variables ) =>{
  const response = await apollo.query({
    query: RecordsQuery,
    variables
  })
  return response.data.records
}

const totalBalance = async () => {
  const response = await apollo.query({
    query: TotalBalanceQuery,
    variables:{
      date: "2020-06-07"
      // date: moment().format("YYYY-MM-DD")
    }
  })
  console.log(response)
  return response.data.totalBalance
}

export default {
  records,
  totalBalance
}