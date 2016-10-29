const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE].forEach(type => res[type] = `${base}_${type}`) // eslint-disable-line no-return-assign
  return res
}

function action(type, payload = {}) {
  return {type, ...payload}
}

export const USER_LIST            = createRequestTypes('USER_LIST')
export const USER_PERSIST         = createRequestTypes('USER_PERSIST')
export const USER_TOGGLE_ACTIVE   = createRequestTypes('USER_TOGGLE_ACTIVE')

export const USER_ACTIVE          = 'USER_ACTIVE'
export const USER_SCRATCH_CREATE  = 'USER_SCRATCH_CREATE'
export const USER_SCRATCH_PROP    = 'USER_SCRATCH_PROP'
export const USER_SCRATCH_SET     = 'USER_SCRATCH_SET'

export const userListEntitiy = {
  request: request  => action(USER_LIST.REQUEST, {request}),
  success: response => action(USER_LIST.SUCCESS, {response}),
  failure: error    => action(USER_LIST.FAILURE, {error}),
}

export const toggleActiveEntity = {
  request: request  => action(USER_TOGGLE_ACTIVE.REQUEST, {request}),
  success: response => action(USER_TOGGLE_ACTIVE.SUCCESS, {response}),
  failure: error    => action(USER_TOGGLE_ACTIVE.FAILURE, {error}),
}

export const persistUserEntitiy = {
  request: request  => action(USER_PERSIST.REQUEST, {request}),
  success: response => action(USER_PERSIST.SUCCESS, {response}),
  failure: error    => action(USER_PERSIST.FAILURE, {error}),
}

export const fetchUsers     = (params)  => action(USER_LIST.REQUEST, {params})
export const persistUser    = (params)  => action(USER_PERSIST.REQUEST, {params})
export const toggleActive   = (params)  => action(USER_TOGGLE_ACTIVE.REQUEST, {params})
export const setUserActive  = (params)  => action(USER_ACTIVE, {params})
export const setUserCreate  = (params)  => action(USER_SCRATCH_CREATE, {params})
export const setUserScratch = (params)  => action(USER_SCRATCH_SET, {params})
export const setUserProp    = (prop)    => action(USER_SCRATCH_PROP, {prop})
