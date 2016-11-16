import React, { Component, PropTypes } from 'react'

import ActionDone from 'material-ui/svg-icons/action/done'
import Chip from 'material-ui/Chip'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentClear from 'material-ui/svg-icons/content/clear'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import * as alertActions from '../../alert/alertActions'
import { siteScratchSelector } from '../siteSelectors'

import '../../../styles/form.css'

export class RoleForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      role: {
        id: '',
        label: ''
      },
      roles: []
    }
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
      },
    }
  }

  componentDidMount = () => {
    const roles = this.props.scratch.roles.asMutable()
    this.setState({roles})
  }

  _onCancelForm = () => {
    this.props.closeFormFunc()
  }

  _onSetValue = (field) => {
    const val = this.refs[field].input.value
    let role = this.state.role
    switch (field) {
    case 'roleID':
      role.id = val
      break
    case 'roleLabel':
      role.label = val
      break
    default:
      break
    }
    this.setState({role: role})
  }

  _onAddRole = () => {
    let roles = this.state.roles
    roles.push(this.state.role)
    this.setState({roles, role: {id: '', label: ''}})
  }

  _onDelete = (id) => {
    this.chipData = this.state.roles
    const chipToDelete = this.chipData.map((chip) => chip.id).indexOf(id)
    this.chipData.splice(chipToDelete, 1)
    this.setState({roles: this.chipData})
  }

  _onSubmit = () => {
    const { scratch, updateSite } = this.props
    const newSite = scratch.set('roles', this.state.roles)
    updateSite(newSite._id, newSite).then(res => {
      this.props.closeFormFunc()
      this.props.actions.alertSend({
        dismissAfter: 2000,
        message:      'Site roles successfully updated',
        type:         'success',
      })
    }).catch(err => {
      this.props.closeFormFunc()
      this.props.actions.alertSend({
        message:  `ERROR: ${err.message}`,
        type:     'danger',
      })
    })
  }

  _renderChip(data) {
    return (
      <Chip
        key={data.id}
        onRequestDelete={() => this._onDelete(data.id)}
        style={this.styles.chip}
      >
        {data.label} [{data.id}]
      </Chip>
    );
  }


  render () {

    return (
      <div style={{width: 'auto', margin: 'auto'}}>
        <form onSubmit={() => this._onSubmit()}>

          <div className='form-row'>
            <TextField
                floatingLabelText='Role ID'
                onChange={() => this._onSetValue('roleID')}
                ref="roleID"
                autoFocus={true}
                value={this.state.role.id}
            />

            <TextField
                floatingLabelText='Role Label'
                onChange={() => this._onSetValue('roleLabel')}
                ref='roleLabel'
                value={this.state.role.label}
            />

            <RaisedButton
                icon={<ContentAdd />}
                style={{alignSelf: 'flex-end'}}
                onClick={() => this._onAddRole()}
            />
          </div>

          <div className='form-row' style={this.styles.wrapper}>
            {this.state.roles.map(this._renderChip, this)}
          </div>

          <div className='form-row' style={{justifyContent: 'space-around'}}>
            <RaisedButton
                icon={<ContentClear />}
                label="Cancel"
                onClick={() => this._onCancelForm()}
            />
            <RaisedButton
                icon={<ActionDone />}
                label="Submit Site Roles"
                onClick={() => this._onSubmit()}
                secondary={true}
            />
          </div>
        </form>
      </div>
    )
  }

}


const UPDATE_ROLES_MUTATION = gql`
  mutation updateSite($_id:ID!, $fields:SiteInput!) {
    updateSite(_id:$_id, input:$fields) {
      _id
      active
      domainID
      name
      roles {id, label}
    }
  }`

const withForm = graphql(UPDATE_ROLES_MUTATION, {
  props({ ownProps, mutate }) {
    return {
      updateSite(_id, fields) {
        return mutate({
          variables: { _id, fields }
        })
      }
    }
  }
})

function mapStateToProps(state) {
  return {
    scratch: siteScratchSelector(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...alertActions
    }, dispatch),
  }
}

RoleForm.propTypes = {
  actions: PropTypes.object.isRequired,
  scratch: PropTypes.object
}

const MutateForm = withApollo(compose(
  withForm,
)(RoleForm))

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MutateForm)
