import apollo from "@/plugins/apollo"

import AccountsQuery from "../graphql/Accounts.graphql"

const accounts = async () => {
  const response = await apollo.query({
    query: AccountsQuery
  })
  return response.data.accounts
}

export default {
  accounts
}