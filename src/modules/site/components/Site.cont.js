import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AppBar from 'material-ui/AppBar'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import SiteForm from './Siteform'
// import SiteList from './Sitelist'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

import {
  setSiteScratch,
} from '../siteActions'
/*import {
  siteScratchSelector,
} from '../siteSelectors'*/

import { styles as st } from '../../../styles'

class Site extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openForm: false,
    }
  }

  _handleOpen = () => {
    this.setState({open: true})
  }

  _handleClose = () => {
    this.setState({open: false})
  }

  _handleRowClick = (site) => {
    this._handleOpen()
    this.props.actions.setSiteScratch({site})
  }

  _onAddSite = () => {
    this._handleOpen()
  }

  render() {

    const SitesQuery = gql`query SitesQuery {
      fetchSites
      {
        _id
        active
        credentialKeyPassword
        credentialKeyUsername
        collectionNm
        dbNm
        domain
        name
        resetURI
      }
    }`

    const withList = graphql(SitesQuery, {
      props: ({ ownProps, data }) => {
        if (data.loading) return { sitesLoading: true }
        if (data.error) return { hasErrors: true }
        return { sites: data.fetchSites }
      }
    })

    const Header = () => (
      <header className='list-table-header'>
        <div className='list-table-cell'>Name</div>
        <div className='list-table-cell'>Domain</div>
        <div className='list-table-cell'>Active</div>
      </header>
    )

    const SiteList = (props) => {
      if (props.sitesLoading) {
        return <h2>Loading...</h2>
      }
      let rows = props.sites.map(s => {
        return (
          <div
              className='list-table-row'
              key={s._id}
              onClick={() => this._handleRowClick(s)}
          >
            <div className='list-table-cell'>{s.name}</div>
            <div className='list-table-cell'>{s.domain}</div>
            <div className='list-table-cell'>{s.active === true ? 'Y' : 'N'}</div>
          </div>
        )
      })
      return (
        <div><Header />{rows}</div>
      )
    }

    const SitesWithView = withList(SiteList)

    const adjustActions = [
      <RaisedButton
        label='Close'
        primary={true}
        onTouchTap={this._handleClose}
      />
    ]

    return (
      <section className='App-container'>
        <Paper>
          <AppBar
              title='Site Listing'
              showMenuIconButton={false}
              style={st.appBar}
              iconElementRight={<IconButton iconStyle={st.appBarEleIconStyle} style={st.appBarEleStyle}><ContentAdd /></IconButton>}
              onRightIconButtonTouchTap={() => this._onAddSite()}
          />
          {/*<SiteForm />*/}
          <article style={st.paper}>
            <SitesWithView />
          </article>
        </Paper>
        {<Dialog
            actions={adjustActions}
            modal={true}
            onRequestClose={this._handleClose}
            open={this.state.open}
            title="Dialog With Actions"
        >
          <SiteForm />
        </Dialog>}
      </section>
    )
  }
}

Site.propStyles = {
  children: PropTypes.object.isRequired
}

/*function mapStateToProps(state) {
  return {
    scratch:  siteScratchSelector(state),
    ts: state,
  }
}*/

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setSiteScratch,
    }, dispatch),
  }
}

// export default Site
export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps
)(Site)
