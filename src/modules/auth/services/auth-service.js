import apollo, { onLogin } from "@/plugins/apollo"
import LoginMutation from "../graphql/Login.gql"
import SignUpMutation from "../graphql/SignUp.gql"

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

export default {
  login,
  signup
}

