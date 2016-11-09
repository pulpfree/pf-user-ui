
function action(type, payload = {}) {
  return {type, ...payload}
}

export const SITE_SCRATCH_CREATE  = 'SITE_SCRATCH_CREATE'
export const SITE_SCRATCH_PROP    = 'SITE_SCRATCH_PROP'
export const SITE_SCRATCH_SET     = 'SITE_SCRATCH_SET'

export const setSiteCreate  = (params)  => action(SITE_SCRATCH_CREATE, {params})
export const setSiteScratch = (params)  => action(SITE_SCRATCH_SET, {params})
export const setSiteProp    = (prop)    => action(SITE_SCRATCH_PROP, {prop})
