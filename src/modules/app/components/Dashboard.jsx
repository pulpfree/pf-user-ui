import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// import { browserHistory } from 'react-router'

import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import RaisedButton from 'material-ui/RaisedButton'

import * as alertActions from '../../alert/alertActions'
import Loginform from '../../auth/components/Loginform'
// import Forgotform from '../../auth/components/Forgotform'

import { logoutUser } from '../../auth/authActions'

export class Dashboard extends Component {

  _onLogout = () => {
    // console.log('props:', this.props)
    const { authLogoutUser } = this.props
    this.props.actions.logoutUser()
    authLogoutUser('123').then(res => {
      // console.log('res from logout:', res)
      this.props.client.resetStore()
      // browserHistory.push('/')
      // window.location.reload(true)
    }).catch(err => {
      console.log('err:', err)
    })
  }


  render() {

    // console.log('props:', this.props)
    return (
      <div style={{width: '75%', margin: 'auto', backgroundColor: '#C7C7C7', textAlign: 'center', paddingTop: 35}}>
        <RaisedButton
            label='Logout'
            onClick={() => this._onLogout()}
            secondary={true}
        />
        <Loginform />
        {/*<Forgotform />*/}
      </div>
    )
  }
}

Dashboard.propTypes = {
  actions: PropTypes.object.isRequired
}

const LOGOUT_MUTATION = gql`
  mutation authLogoutUser($id:ID) {
    authLogoutUser(_id:$id) {
      ok
      n
    }
  }`

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...alertActions,
      logoutUser
    }, dispatch),
  }
}

const DashboardWithGraph = withApollo(compose(
  graphql(LOGOUT_MUTATION, {
    options: { forceFetch: true },
    props({ ownProps, mutate }) {
      return {
        authLogoutUser(id) {
          return mutate({
            variables: { id }
          })
        }
      }
    }
  })
)(Dashboard))

export default connect(
  null,
  mapDispatchToProps
)(DashboardWithGraph)

/*Dashboard = connect(
  null,
  mapDispatchToProps
)(Dashboard)

export default withApollo(Dashboard)*/