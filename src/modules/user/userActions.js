
function action(type, payload = {}) {
  return {type, ...payload}
}

export const USER_SCRATCH_CREATE  = 'USER_SCRATCH_CREATE'
export const USER_SCRATCH_PROP    = 'USER_SCRATCH_PROP'
export const USER_SCRATCH_SET     = 'USER_SCRATCH_SET'

export const setUserCreate  = (params)  => action(USER_SCRATCH_CREATE, {params})
export const setUserScratch = (params)  => action(USER_SCRATCH_SET, {params})
export const setUserProp    = (prop)    => action(USER_SCRATCH_PROP, {prop})
