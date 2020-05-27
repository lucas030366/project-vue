import actions from "./actions"
import mutations from "./mutation"

const state = {
  filters: null,
  isFiltering: false,
  month: null
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}