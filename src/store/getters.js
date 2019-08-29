const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  position: state => state.user.position,
  department: state => state.user.department,
  achievement: state => state.user.achievement,
  pick_quota_remain: state => state.user.pick_quota_remain,
  pick_quota_today: state => state.user.pick_quota_today
}
export default getters
