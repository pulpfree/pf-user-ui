
const conf = {
  development: {
    BASE_URL: 'http://localhost:3010/graphql',
    TOKEN_DOMAIN: 'local.pf-user'
  },
    production: {
    BASE_URL: 'http://127.0.0.1:3100/',
    TOKEN_DOMAIN: 'local.pf-user'
  }
}
// let confEnv = process.env.NODE_ENV

export const config = conf[process.env.NODE_ENV]
