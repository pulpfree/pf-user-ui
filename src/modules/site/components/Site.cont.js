import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AppBar from 'material-ui/AppBar'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentCreate from 'material-ui/svg-icons/content/create'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'

import SiteForm from './Siteform'
import RoleForm from './RoleForm'

import * as alertActions from '../../alert/alertActions'

import { compose, graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag'
// import update from 'react-addons-update'

import {
  setSiteCreate,
  setSiteScratch,
} from '../siteActions'

import { styles as st } from '../../../styles'

export class Site extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openForm: false,
      openDelete: false,
      openRoles: false,
      siteID: null
    }
  }

  _handleOpen = () => {
    this.setState({openForm: true})
  }

  _handleOpenDelete = () => {
    this.setState({openDelete: true})
  }

  _handleOpenRoles = (site) => {
    this.setState({openRoles: true})
    this.props.actions.setSiteScratch({site})
  }

  _handleClose = () => {
    this.setState({openForm: false})
    this.setState({openDelete: false})
    this.setState({openRoles: false})
  }

  _handleRowClick = (site) => {
    this._handleOpen()
    this.props.actions.setSiteScratch({site})
  }

  _onAddSite = () => {
    this.props.actions.setSiteCreate()
    this._handleOpen()
  }

  _onDeleteSite = (id) => {
    this.setState({siteID: id})
    this._handleOpenDelete()
  }

  _onDeleteConfirm = () => {
    this.props.removeSite(this.state.siteID).then(res => {
      this.props.refetch()
      this._handleClose()
    })
  }

  render() {

    const { loading, fetchSites } = this.props
    if (loading) {
      return (
        <div>Loading...</div>
      );
    }

    const Header = () => (
      <header className='list-table-header'>
        <div className='list-table-cell' style={{flex: 1.5}}>Name</div>
        <div className='list-table-cell' style={{flex: 1.5}}>Domain ID</div>
        <div className='list-table-cell' style={{flex: .5}}>Active</div>
        <div className='list-table-cell'>User Roles</div>
        <div className='list-table-cell'></div>
      </header>
    )

    const SiteList = () => {
      let rows = fetchSites.map(s => {
        return (
          <div
              className='list-table-row'
              key={s._id}
          >
            <div className='list-table-cell' style={{flex: 1.5}} onClick={() => this._handleRowClick(s)}>{s.name}</div>
            <div className='list-table-cell' style={{flex: 1.5}} onClick={() => this._handleRowClick(s)}>{s.domainID}</div>
            <div className='list-table-cell' style={{flex: .3, textAlign: 'right'}} onClick={() => this._handleRowClick(s)}>{s.active === true ? 'Y' : 'N'}</div>
            <div className='list-table-cell'>
              <FlatButton
                  icon={<ContentCreate />}
                  onClick={() => this._handleOpenRoles(s)}
                  secondary={true}
              />
            </div>
            <div className='list-table-cell'>
              <FlatButton
                  icon={<ActionDelete />}
                  onClick={() => this._onDeleteSite(s._id)}
                  secondary={true}
              />
            </div>
          </div>
        )
      })
      return (
        <div><Header />{rows}</div>
      )
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
          onTouchTap={this._onDeleteConfirm}
      />
    ]

    return (
      <section className='App-container'>
        <Paper>
          <AppBar
              iconElementRight={<IconButton iconStyle={st.appBarEleIconStyle} style={st.appBarEleStyle}><ContentAdd /></IconButton>}
              onRightIconButtonTouchTap={() => this._onAddSite()}
              showMenuIconButton={false}
              style={st.appBar}
              title='Site Listing'
          />
          <article style={st.paper}>
            <SiteList />
          </article>
        </Paper>
        <Dialog
            actionsContainerStyle={{paddingTop: 0}}
            autoScrollBodyContent={true}
            modal={true}
            onRequestClose={this._handleClose}
            open={this.state.openForm}
            title='Site Details'
        >
          <SiteForm closeFormFunc={this._handleClose} />
        </Dialog>
        <Dialog
            actions={deleteActions}
            contentStyle={{width: 400}}
            onRequestClose={this._handleClose}
            open={this.state.openDelete}
            title='Delete Site'
        >
          You sure you want to delete this site?<br />
          This action cannot be undone.
        </Dialog>
        <Dialog
            contentStyle={{width: 800}}
            onRequestClose={this._handleClose}
            open={this.state.openRoles}
            title='User Roles'
        >
          <RoleForm closeFormFunc={this._handleClose} />
        </Dialog>
      </section>
    )
  }
}

Site.propStyles = {
  children: PropTypes.object.isRequired
}

const SITES_QUERY = gql`
  query fetchSites {
    fetchSites
    {
      _id
      active
      credentials {
        password
        username
      }
      collections {
        contact
        user
      }
      dbNm
      domainID
      name
      pemFiles {
        private
        public
      }
      resetURI
      roles {id, label}
      signingMethod
    }
  }`

const SITE_REMOVE = gql`
  mutation removeSite($_id:ID!) {
    removeSite(_id:$_id) {
      ok
      n
    }
  }`

const withList = graphql(SITES_QUERY, {
  props({data: {loading, fetchSites, refetch}}) {
    return {loading, fetchSites, refetch}
  }
})

const withRemove = graphql(SITE_REMOVE, {
  props({ ownProps, mutate }) {
    return {
      removeSite(_id) {
        return mutate({
          variables: { _id }
        })
      }
    }
  }
})

const SiteWithGraph = withApollo(compose(
  withList,
  withRemove
)(Site))

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...alertActions,
      setSiteCreate,
      setSiteScratch,
    }, dispatch),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SiteWithGraph)
