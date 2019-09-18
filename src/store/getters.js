const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  position: state => state.user.position,
  department: state => state.user.department,
  totalNum: state => state.user.totalNum,
  totalMoney: state => state.user.totalMoney,
  rank: state => state.user.rank,
  pick_quota_remain: state => state.user.pick_quota_remain,
  pick_quota_today: state => state.user.pick_quota_today,
  adminId: state => state.user.adminId,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes
}
export default getters
