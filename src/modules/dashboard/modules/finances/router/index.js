const RecordsHome = () => import("../views/RecordsHome")

export default [
  {
    path: "records",
    component: RecordsHome,
    meta: { requiresAuth: true },
    alias: ["home", ""]
  }
]