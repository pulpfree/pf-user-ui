import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import ActionDelete from 'material-ui/svg-icons/action/delete'
import AppBar from 'material-ui/AppBar'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import Toggle from 'material-ui/Toggle'

import UserForm from './UserForm'

import {
  setUserCreate,
  setUserProp,
  setUserListProp,
  setUserScratch
} from '../userActions'
import {
  userListSelector
} from '../../user/userSelectors'
import * as alertActions from '../../alert/alertActions'

import '../../../styles/form.css'
import { styles as st } from '../../../styles'

import { sortBy } from '../../../utils'

export class User extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      openDelete: false,
      siteID: null,
      userID: null
    }
  }

  componentDidMount = () => {
    if (this.props.params.siteID) {
      this.setState({siteID: this.props.params.siteID})
    }
  }

  _handleOpen = () => {
    this.setState({open: true})
  }

  _handleOpenDelete = () => {
    this.setState({openDelete: true})
  }

  _handleClose = () => {
    this.setState({open: false})
    this.setState({openDelete: false})
  }

  _onUserClick = (user) => {
    user.domainID = this.state.siteID
    this.props.actions.setUserScratch({user})
    this._handleOpen()
  }

  _onAddUser = () => {
    if (!this.state.siteID) { return }
    this.props.actions.setUserCreate()
    this.props.actions.setUserProp({'domainID': this.state.siteID})
    this._handleOpen()
  }

  _onActiveToggle = (e, val) => {
    this.props.actions.setUserListProp({active: val})
    this.props.refetch()
  }

  _onSelectSite = (e, idx, val) => {
    this.setState({siteID: val})
    this.props.actions.setUserListProp({domainID: val})
    browserHistory.push(`/admin/user/${val}`)
  }

  render() {

    const { loading, fetchSites, removeUser, userList } = this.props
    if (loading === true) {
      return (
        <div>Loading main...</div>
      )
    }

    const UserList = (data) => {

      if (!data.domainID) {
        return <div>Select Site</div>
      }

      const { loading, fetchUsers, refetch } = data
      if (loading) {
        return (
          <div>Loading users...</div>
        )
      }

      const _onDeleteUser = (id) => {
        this.setState({userID: id})
        this._handleOpenDelete()
      }

      const _onDeleteConfirm = () => {
        removeUser(this.state.userID, this.state.siteID).then(res => {
          refetch()
          this.setState({openDelete: false})
        })
        this.props.actions.alertSend({
          dismissAfter: 2000,
          message:      'User successfully deleted',
          type:         'success',
        })
      }

      const deleteActions = [
        <FlatButton
            label='NO!'
            primary={true}
            onTouchTap={this._handleClose}
        />,
        <FlatButton
            label='Go Ahead'
            secondary={true}
            onTouchTap={_onDeleteConfirm}
        />
      ]

      const Header = () => (
        <header className='list-table-header'>
          <div className='list-table-cell'>Name</div>
          <div className='list-table-cell'>Active</div>
          <div className='list-table-cell'>Email</div>
          <div className='list-table-cell'></div>
        </header>
      )

      const rows = fetchUsers.map(u => {
        return (
          <div
              className='list-table-row'
              key={u._id}
          >
            <div className='list-table-cell' onClick={() => this._onUserClick(u)}>
              {u.contact.name.last}, {u.contact.name.first}
            </div>
            <div className='list-table-cell' onClick={() => this._onUserClick(u)}>
              {u.active ? 'Y' : 'N'}
            </div>
            <div className='list-table-cell'>
              <a href={`mailto:${u.email}`}>{u.email}</a>
            </div>
            <div className='list-table-cell'>
              <FlatButton
                  icon={<ActionDelete />}
                  onClick={() => _onDeleteUser(u._id)}
                  secondary={true}
              />
            </div>
          </div>
        )
      })
      return (
        <div><Header />{rows}
          <Dialog
            actions={deleteActions}
            contentStyle={{width: 400}}
            onRequestClose={this._handleClose}
            open={this.state.openDelete}
          >
            You sure you want to delete this user?<br />
            This action cannot be undone.
          </Dialog>
        </div>
      )
    }

    const USER_QUERY = gql`
      query fetchUsers ($domainID:ID, $siteID:ID) {
        fetchUsers (domainID:$domainID) {
          _id
          active
          contact {
            _id
            email
            name {
              first
              last
            }
          }
          email
          scope {
            id
            label
          }
        },
        fetchSiteById (_id:$siteID) {
          _id
          roles {
            id
            label
          }
        }
      }`

    const UserListWithData = graphql(USER_QUERY, {
      options: ({ domainID, siteID }) => ({ variables: { domainID, siteID: domainID } }),
      skip: ({domainID}) => !domainID,
      props({data: {loading, fetchUsers, refetch}}) {
        if (fetchUsers && fetchUsers.length) {
          sortBy('contact.name.last', fetchUsers)
        }
        return {loading, fetchUsers, refetch}
      }
    })(UserList)

    return (

      <section className='App-container'>
        <Paper>
          <AppBar
              iconElementRight={<IconButton iconStyle={st.appBarEleIconStyle} style={st.appBarEleStyle}><ContentAdd /></IconButton>}
              onRightIconButtonTouchTap={() => this._onAddUser()}
              showMenuIconButton={false}
              style={st.appBar}
              title='User Listing'
          />
          <article style={st.paper}>
            <div style={{display: 'flex', justifyContent: 'flex-start', marginBottom: 30}}>
              <div style={{alignSelf: 'center', marginRight: 30}}>
                <SelectField
                    floatingLabelFixed={true}
                    floatingLabelText='Select Site'
                    onChange={(e, key, payload) => this._onSelectSite(e, key, payload)}
                    value={this.state.siteID}
                >
                  {fetchSites && fetchSites.length && fetchSites.map(s => <MenuItem key={s._id} value={s._id} primaryText={s.name} /> )}
                </SelectField>
              </div>
              <div style={{alignSelf: 'center'}}>
                <Toggle
                    label='Active'
                    toggled={userList.active}
                    onToggle={(e, val) => this._onActiveToggle(e, val)}
                />
              </div>
            </div>

            <UserListWithData domainID={this.state.siteID} />
          </article>
        </Paper>
        <Dialog
            actionsContainerStyle={{paddingTop: 0}}
            modal={true}
            onRequestClose={this._handleClose}
            open={this.state.open}
            title='User Info'
        >
          <UserForm closeFormFunc={this._handleClose} />
        </Dialog>
      </section>
    )
  }
}

User.propStyles = {
  children: PropTypes.object
}

const SITE_LIST_QUERY = gql`
  query fetchSites($active:Boolean) {
    fetchSites(active:$active) {
      _id
      name
    }
  }`

const USER_REMOVE = gql`
  mutation removeUser($_id:ID!, $domainID:ID!) {
    removeUser(_id:$_id, domainID:$domainID) {
      ok
      n
    }
  }`

const UserWithGraph = withApollo(compose(
  graphql(SITE_LIST_QUERY, {
    options: ({ userList }) => ({ variables: { active: userList.active } }),
    props({data: {loading, fetchSites, refetch}}) {
      return {loading, fetchSites, refetch}
    }
  }),
  graphql(USER_REMOVE, {
    props({ ownProps, mutate }) {
      return {
        removeUser(_id, domainID) {
          return mutate({
            variables: { _id, domainID }
          })
        }
      }
    }
  })
)(User))

function mapStateToProps(state) {
  return {
    userList: userListSelector(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...alertActions,
      setUserCreate,
      setUserListProp,
      setUserProp,
      setUserScratch
    }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserWithGraph)
