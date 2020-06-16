const RecordsHome = () => import("../views/RecordsHome")
const RecordsAdd = () => import("../views/RecordsAdd")
const ReportsHome = () => import("../views/ReportsHome")

export default [
  {
    path: "records",
    component: RecordsHome,
    meta: { requiresAuth: true },
    alias: ["home", ""]
  },
  {
    path: "records/add",
    component: RecordsAdd,
    meta: { requiresAuth: true },
    name: "recordsAdd"
  },
  {
    path: "reports",
    component: ReportsHome,
    meta: { requiresAuth: true },
  }
]