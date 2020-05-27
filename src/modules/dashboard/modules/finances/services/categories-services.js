import apollo from "@/plugins/apollo"
import { from } from "rxjs"
import { map } from "rxjs/operators"

import CategoriesQuery from "../graphql/Categories.graphql"
import CreateCategoryMutation from "../graphql/CategoryCreate.graphql"

const categories = ({ operation } = {}) => {
  const queryRef = apollo.watchQuery({
    query: CategoriesQuery,
    variables: { operation: operation ? operation.toUpperCase() : operation }
  })
  return from(queryRef).pipe(map(response => response.data.categories))
}

const createCategory = async variables => {
  const response = await apollo.mutate({
    mutation: CreateCategoryMutation,
    variables,
    update: (proxy, { data: { createCategory } }) => {

      try {
        const variables = { operation: createCategory.operation }

        const categoryData = proxy.readQuery({
          query: CategoriesQuery,
          variables
        })

        categoryData.categories = [...categoryData.categories, createCategory]

        proxy.writeQuery({
          query: CategoriesQuery,
          variables,
          data: categoryData
        })


      } catch (error) {
        console.log("Erro ao criar uma categoria", error.message)
      }
    }
  })
  return response.data.createCategory
}

export default {
  categories,
  createCategory
}