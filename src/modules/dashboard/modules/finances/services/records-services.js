import apollo from "@/plugins/apollo"
import moment from "moment"
import { from } from "rxjs"
import { map } from "rxjs/operators"

import RecordCreateMutation from "../graphql/RecordCreate.graphql"

import RecordsQuery from "../graphql/Records.graphql"
import TotalBalanceQuery from "../graphql/TotalBalance.graphql"

const records = ( variables ) =>{
  const queryRef = apollo.watchQuery({
    query: RecordsQuery,
    variables
  })
  return from(queryRef).pipe(
    map(res => res.data.records)
  )
}

const totalBalance = async () => {
  const response = await apollo.query({
    query: TotalBalanceQuery,
    variables:{
      date: moment().format("YYYY-MM-DD")
    }
  })
  return response.data.totalBalance
}

const createRecord = async (variables) => {
  const response = await apollo.mutate({
    mutation: RecordCreateMutation,
    variables
  })
  return response.data.createRecord
}

export default {
  records,
  totalBalance,
  createRecord
}