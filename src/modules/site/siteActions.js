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

export const SITE_LIST            = createRequestTypes('SITE_LIST')
export const SITE_PERSIST         = createRequestTypes('SITE_PERSIST')
export const SITE_TOGGLE_ACTIVE   = createRequestTypes('SITE_TOGGLE_ACTIVE')

export const SITE_ACTIVE          = 'SITE_ACTIVE'
export const SITE_SCRATCH_CREATE  = 'SITE_SCRATCH_CREATE'
export const SITE_SCRATCH_PROP    = 'SITE_SCRATCH_PROP'
export const SITE_SCRATCH_SET     = 'SITE_SCRATCH_SET'

export const siteListEntitiy = {
  request: request  => action(SITE_LIST.REQUEST, {request}),
  success: response => action(SITE_LIST.SUCCESS, {response}),
  failure: error    => action(SITE_LIST.FAILURE, {error}),
}

export const toggleActiveEntity = {
  request: request  => action(SITE_TOGGLE_ACTIVE.REQUEST, {request}),
  success: response => action(SITE_TOGGLE_ACTIVE.SUCCESS, {response}),
  failure: error    => action(SITE_TOGGLE_ACTIVE.FAILURE, {error}),
}

export const persistSiteEntitiy = {
  request: request  => action(SITE_PERSIST.REQUEST, {request}),
  success: response => action(SITE_PERSIST.SUCCESS, {response}),
  failure: error    => action(SITE_PERSIST.FAILURE, {error}),
}

export const fetchSites     = (params)  => action(SITE_LIST.REQUEST, {params})
export const persistSite    = (params)  => action(SITE_PERSIST.REQUEST, {params})
export const toggleActive   = (params)  => action(SITE_TOGGLE_ACTIVE.REQUEST, {params})
export const setSiteActive  = (params)  => action(SITE_ACTIVE, {params})
export const setSiteCreate  = (params)  => action(SITE_SCRATCH_CREATE, {params})
export const setSiteScratch = (params)  => action(SITE_SCRATCH_SET, {params})
export const setSiteProp    = (prop)    => action(SITE_SCRATCH_PROP, {prop})
