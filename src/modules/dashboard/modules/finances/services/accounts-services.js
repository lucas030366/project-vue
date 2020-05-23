import apollo from "@/plugins/apollo"
import { from } from "rxjs"
import { map } from "rxjs/operators"

import AccountsQuery from "../graphql/Accounts.graphql"
import AccountCreateMutation from "../graphql/AccountCreate.graphql"

const accounts = () => {
  const queryRef = apollo.watchQuery({
    query: AccountsQuery
  })
  return from(queryRef).pipe(map(response => response.data.accounts))
}

const createAccount = async variables => {
  const response = await apollo.mutate({
    mutatation: AccountCreateMutation,
    variables,
    update: (proxy, { data: { createAccount } }) => {

      try {
        const data = proxy.readQuery({
          AccountsQuery
        })

        data.accounts = [...data.accounts, createAccount]

        proxy.writeQuery({
          query: AccountsQuery,
          data
        })

      } catch (error) {
        console.log("Account create ainda nao foi lida", error.message)
      }
    }
  })
  return response.data.createAccount
}

export default {
  accounts,
  createAccount
}