const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  position: state => state.user.position,
  department: state => state.user.department,
  achievement: state => state.user.achievement
}
export default getters
