import React, { Component, PropTypes } from 'react'

import ActionDone from 'material-ui/svg-icons/action/done'
import Checkbox from 'material-ui/Checkbox'
import ContentClear from 'material-ui/svg-icons/content/clear'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { compose, graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import { setSiteProp } from '../siteActions'
import * as alertActions from '../../alert/alertActions'
import { siteScratchSelector } from '../siteSelectors'

import { sortBy } from '../../../utils'
import '../../../styles/form.css'

const R = require('ramda')

export class Siteform extends Component {

  _onPropChange = (field) => {
    const val = this.refs[field].input.value
    this.props.actions.setSiteProp({[field]: val})
  }

  _onCheck = (e, val, field) => {
    console.log('check val:', val)
    this.props.actions.setSiteProp({[field]: val})
  }

  _validate = (field) => {
  }

  _onCancelForm = () => {
    this.props.closeFormFunc()
  }

  _onSubmit = () => {
    const { createSite, scratch, updateSite } = this.props
    const edit = scratch._id ? true : false
    const successMsg = edit ? 'Site info successfully updated' : 'Site successfully created'

    let p
    if (edit) {
      p = updateSite(scratch._id, scratch)
    } else {
      p = createSite(scratch)
    }
    p.then(res => {
      this._onCancelForm()
      this.props.actions.alertSend({
        dismissAfter: 2000,
        message:      successMsg,
        type:         'success',
      })
    }).catch(err => {
      this._onCancelForm()
      this.props.actions.alertSend({
        message:  `ERROR: ${err.message}`,
        type:     'danger',
      })
    })
  }

  render () {

    const { scratch } = this.props

    return (
      <div style={{width: 'auto', margin: 'auto'}}>
        <form onSubmit={() => this._onSubmit()}>

          <div className='form-row'>

            <div className='form-col'>
              <legend className='row'>Domain</legend>
              <TextField
                  floatingLabelText='Identifier Name'
                  onChange={() => this._onPropChange('name')}
                  onBlur={() => this._validate('name')}
                  ref='name'
                  value={scratch.name || ''}
              />
              <TextField
                  floatingLabelText='Domain ID'
                  onChange={() => this._onPropChange('domainID')}
                  onBlur={() => this._validate('domainID')}
                  ref='domainID'
                  value={scratch.domainID || ''}
              />

              <br /><br />
              <legend className='row'>Security</legend>
                <TextField
                    floatingLabelText='Public PEM File'
                    onChange={() => this._onPropChange('pemFiles.public')}
                    onBlur={() => this._validate('pemFiles.public')}
                    ref='pemFiles.public'
                    value={scratch.pemFiles.public || ''}
                />
                <TextField
                    floatingLabelText='Private PEM File'
                    onChange={() => this._onPropChange('pemFiles.private')}
                    onBlur={() => this._validate('pemFiles.private')}
                    ref='pemFiles.private'
                    value={scratch.pemFiles.private || ''}
                />
                <TextField
                    disabled={true}
                    floatingLabelText='Signing Method'
                    onChange={() => this._onPropChange('signingMethod')}
                    onBlur={() => this._validate('signingMethod')}
                    ref='signingMethod'
                    value={scratch.signingMethod || ''}
                />
              </div>

            <div className='form-row-spacer' />
            <div className='form-row-spacer' />

            <div className='form-col'>
              <legend className='row'>Database</legend>
              <TextField
                  floatingLabelText='DB Name'
                  onChange={() => this._onPropChange('dbNm')}
                  onBlur={() => this._validate('dbNm')}
                  ref='dbNm'
                  value={scratch.dbNm || ''}
              />
              <TextField
                  floatingLabelText='User Collection'
                  onChange={() => this._onPropChange('collections.user')}
                  onBlur={() => this._validate('collections.user')}
                  ref='collections.user'
                  value={scratch.collections.user || ''}
              />
              <TextField
                  floatingLabelText='Contact Collection'
                  onChange={() => this._onPropChange('collections.contact')}
                  onBlur={() => this._validate('collections.contact')}
                  ref='collections.contact'
                  value={scratch.collections.contact || ''}
              />

              <br /><br />
            <legend className='row'>Site Info</legend>
              <TextField
                  floatingLabelText='Credential Password Field'
                  onChange={() => this._onPropChange('credentials.password')}
                  onBlur={() => this._validate('credentials.password')}
                  ref='credentials.password'
                  value={scratch.credentials.password || ''}
              />
              <TextField
                  floatingLabelText='Credential Sitename Field'
                  onChange={() => this._onPropChange('credentials.username')}
                  onBlur={() => this._validate('credentials.username')}
                  ref='credentials.username'
                  value={scratch.credentials.username || ''}
              />
              <TextField
                  floatingLabelText='Reset URI'
                  onChange={() => this._onPropChange('resetURI')}
                  onBlur={() => this._validate('resetURI')}
                  ref='resetURI'
                  value={scratch.resetURI || ''}
              />

            </div>
          </div>

          <div className='form-row'>
            <div style={{flex: 1}}>
              <Subheader>Status</Subheader>
              <Checkbox
                  label="Active"
                  labelPosition="right"
                  onCheck={(e, val) => this._onCheck(e, val, 'active')}
                  ref='active'
                  checked={scratch.active}
              />
            </div>
          </div>

          <div className='form-row' style={{justifyContent: 'space-around'}}>
            <RaisedButton
                icon={<ContentClear />}
                label="Cancel"
                onClick={() => this._onCancelForm()}
            />
            <RaisedButton
                icon={<ActionDone />}
                label="Submit Site Info"
                onClick={() => this._onSubmit()}
                secondary={true}
            />
          </div>
        </form>
      </div>
    )
  }
}

const CREATE_SITE_MUTATION = gql`
  mutation createSite($fields:SiteInput!) {
    createSite(input:$fields) {
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
      roles {
        id
        label
      }
      signingMethod
    }
  }`

const UPDATE_SITE_MUTATION = gql`
  mutation updateSite($_id:ID!, $fields:SiteInput!) {
    updateSite(_id:$_id, input:$fields) {
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
      roles {
        id
        label
      }
      signingMethod
    }
  }`

const withAddForm = graphql(CREATE_SITE_MUTATION, {
  props({ ownProps, mutate }) {
    return {
      createSite(fields) {
        return mutate({
          variables: { fields },
          updateQueries: {
            fetchSites: (prev, { mutationResult }) => {
              const newSite = mutationResult.data.createSite
              let newList = R.clone(prev)
              newList.fetchSites.push(newSite)
              sortBy('nameID', newList.fetchSites)
              return newList
            }
          }
        })
      }
    }
  }
})

const withEditForm = graphql(UPDATE_SITE_MUTATION, {
  props({ ownProps, mutate }) {
    return {
      updateSite(_id, fields) {
        return mutate({
          variables: { _id, fields },
          optimisticResponse: {
            __typename: 'Mutation',
            updateSite: {
              _id: _id,
              __typename: 'Site',
              ...fields
            }
          },
          updateQueries: {
            fetchSites: (prev, { mutationResult }) => {
              const idx = R.findIndex(R.propEq('_id', _id))(prev.fetchSites)
              let newList = R.clone(prev)
              newList.fetchSites[idx] = mutationResult.data.updateSite
              sortBy('name', newList.fetchSites)
              return newList
            }
          }
        })
      }
    }
  }
})


function mapStateToProps(state) {
  return {
    // site:     siteCurrentSelector(state),
    scratch:  siteScratchSelector(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...alertActions,
      setSiteProp,
    }, dispatch),
  }
}

Siteform.propTypes = {
  actions:  PropTypes.object.isRequired,
  method:   PropTypes.object,
  scratch:  PropTypes.object,
  // site:     PropTypes.object,
}

const MutateForm = withApollo(compose(
  withAddForm,
  withEditForm
)(Siteform))

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MutateForm)
