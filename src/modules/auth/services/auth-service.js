import apollo, { onLogin } from "@/plugins/apollo"
import LoginMutation from "../graphql/Login.graphql"
import SignUpMutation from "../graphql/SignUp.graphql"
import UserQuery from "../graphql/User.graphql"

const login = async variables => {
  const response = await apollo.mutate({
    mutation: LoginMutation,
    variables
  })
  await onLogin(apollo, response.data.login.token)
  return response.data.login
}

const signup = async variables => {
  const response = await apollo.mutate({
    mutation: SignUpMutation,
    variables
  })
  await onLogin(apollo, response.data.signup.token)
  return response.data.signup
}

const user = async ( options = {} ) => {
  const response = await apollo.query({
    query: UserQuery,
    ...options
  })
  return response.data.user //nome da query em UserQuery
}

export default {
  login,
  signup,
  user
}

