import { login, getInfo, getAchievement } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import avatarUrl from '@/assets/rabbit.gif'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  position: '',
  department: '',
  totalNum: '',
  totalMoney: '',
  rank: '',
  pick_quota_remain: '',
  pick_quota_today: '',
  roles: [],
  adminId: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_POSITION: (state, position) => {
    state.position = position
  },
  SET_DEPARTMENT: (state, department) => {
    state.department = department
  },
  SET_TOTALNUM: (state, totalNum) => {
    state.totalNum = totalNum
  },
  SET_TOTALMONEY: (state, totalMoney) => {
    state.totalMoney = totalMoney
  },
  SET_RANK: (state, rank) => {
    state.rank = rank
  },
  SET_PICKQUOTAREMAIN: (state, pick_quota_remain) => {
    state.pick_quota_remain = pick_quota_remain
  },
  SET_PICKQUOTATODAY: (state, pick_quota_today) => {
    state.pick_quota_today = pick_quota_today
  },
  SET_ADMINID: (state, adminId) => {
    state.adminId = adminId
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar, position, department, roles } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar || avatarUrl)
        commit('SET_POSITION', position)
        commit('SET_DEPARTMENT', department)
        commit('SET_ROLES', roles)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       commit('SET_TOKEN', '')
  //       removeToken()
  //       resetRouter()
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // 退出不请求后台
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // get user achievement
  getAchievement({ commit, state }) {
    return new Promise((resolve, reject) => {
      getAchievement().then(response => {
        const { data } = response

        if (!data) {
          reject('数据请求错误')
        }

        const { totalNum, totalMoney, rank, pick_quota_remain, pick_quota_today } = data

        commit('SET_TOTALNUM', totalNum)
        commit('SET_TOTALMONEY', totalMoney)
        commit('SET_RANK', rank)
        commit('SET_PICKQUOTAREMAIN', pick_quota_remain)
        commit('SET_PICKQUOTATODAY', pick_quota_today)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

