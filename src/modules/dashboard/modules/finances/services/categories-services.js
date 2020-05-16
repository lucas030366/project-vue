import apollo from "@/plugins/apollo"

import CategoriesQuery from "../graphql/Categories.graphql"

const categories = async ({operation}) => {
  const response = await apollo.query({
    query: CategoriesQuery,
    variables: {operation: operation.toUpperCase()}
  })

  return response.data.categories //nome da query em Graphql
}

export default {
  categories
}