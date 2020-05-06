import { currencyFormater } from "@/utils"

export default {
  methods:{
    formatCurrency(value){
      return currencyFormater().format(value)
    }
  }
}