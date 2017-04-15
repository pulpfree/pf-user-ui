
const conf = {
  development: {
    BASE_URL: 'http://localhost:3010/graphql',
    DOMAIN_ID: 'local.pf-user'
    // TOKEN_DOMAIN: 'local.pf-user'
  },
    production: {
    BASE_URL: '/graphql',
    DOMAIN_ID: 'io.pflabs.useradmin'
    // TOKEN_DOMAIN: 'io.pflabs.useradmin'
  }
}
// let confEnv = process.env.NODE_ENV

export const config = conf[process.env.NODE_ENV]
