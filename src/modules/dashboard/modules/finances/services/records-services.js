import apollo from "@/plugins/apollo"
import moment from "moment"
import { from } from "rxjs"
import { map } from "rxjs/operators"

import RecordCreateMutation from "../graphql/RecordCreate.graphql"

import RecordsQuery from "../graphql/Records.graphql"
import TotalBalanceQuery from "../graphql/TotalBalance.graphql"

const records = (variables) => {
  const queryRef = apollo.watchQuery({
    query: RecordsQuery,
    variables
  })
  return from(queryRef).pipe(
    map(response => response.data.records)
  )
}

const createRecord = async (variables) => {
  const response = await apollo.mutate({
    mutation: RecordCreateMutation,
    variables,
    update: (proxy, { data: { createRecord } }) => {
      const month = moment(createRecord.date).format("MM-YYYY")
      const variables = { month }

      try {
        const recordsData = proxy.readQuery({
          query: RecordsQuery,
          variables
        })

        recordsData.records = [...recordsData.records, createRecord]

        proxy.writeQuery({
          query: RecordsQuery,
          variables,
          data: recordsData
        })

      } catch (error) {
        console.log("Query Records não foi lida", error.message)
      }
    }
  })
  return response.data.createRecord
}

const totalBalance = async () => {
  const response = await apollo.query({
    query: TotalBalanceQuery,
    variables: {
      date: moment().format("YYYY-MM-DD")
    }
  })
  return response.data.totalBalance
}

export default {
  records,
  totalBalance,
  createRecord
}