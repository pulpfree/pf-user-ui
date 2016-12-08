
// Found this at: http://stackoverflow.com/questions/5073799/how-to-sort-a-javascript-array-of-objects-by-nested-object-property
export const sortBy = function (prop, arr) {
  prop = prop.split('.')
  const len = prop.length

  arr.sort(function (a, b) {
    let i = 0
    while( i < len ) { a = a[prop[i]]; b = b[prop[i]]; i++ }
    if (a < b) {
      return -1
    } else if (a > b) {
      return 1
    } else {
      return 0
    }
  })
  return arr
}

export const userAuthVals = {
  setVals(user) {
    let re = {
      email:      user.email,
      fullName:   `${user.contact.first} ${user.contact.last}`,
      name:       user.contact,
      scope:      user.scope || null,
      scopeBits:  user.scopeBits || null,
      userID:     user.id,
    }
    localStorage.setItem('token', user.token)
    localStorage.setItem('user', JSON.stringify(re))
  },
  clearUser() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  getToken() {
    return localStorage.getItem('token') || null
  },
  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  },
}