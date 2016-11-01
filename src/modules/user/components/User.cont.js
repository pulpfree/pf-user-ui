import React, { Component, PropTypes } from 'react'

import AppBar from 'material-ui/AppBar'
import ContentAdd from 'material-ui/svg-icons/content/add'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import TextField from 'material-ui/TextField'

// import UserForm from './Userform'

import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag'
import update from 'react-addons-update'

import { styles as st } from '../../../styles'

const sites = [
  {
    id: 'abc',
    name: 'Universal App',
  },
  {
    id: 'gales',
    name: 'Gales Sales',
  }
]


class User extends Component {

  constructor(props) {
    super(props)
    this.state = {
      siteID: null,
      firstName: 'NewName'
    }
  }

  _onAddUser = () => {
    console.log('_onAddUser:', '_onAddUser')
  }

  _onSelectSite = (e, idx, val) => {
    this.setState({siteID: val})
  }

  handleChange = (event) => {
    this.setState({
      firstName: event.target.value,
    })
    // console.log('state:', event.target.value)
  }

  submitForm = () => {
    console.log('props:', this.props)
    const { createContact } = this.props
    const name = this.state.firstName
    // console.log('in submitForm firstName:', this.state.firstName)
    return createContact(name)

    /*return submit(name).then((res) => {
      console.log('res in submitForm:', res)
    })*/
  }

  render() {

    const { loading, fetchContacts, createContact } = this.props
    if (loading) {
      return (
        <div>Loading...</div>
      );
    }

    // let rows = []
    // console.log('props:', this.props)

    const rows = fetchContacts.map(s => {
        return (
          <div
              className='list-table-row'
              key={s._id}
          >
            <div className='list-table-cell'>{s._id}</div>
            <div className='list-table-cell'>{s.name}</div>
            <div className='list-table-cell'>{s.type}</div>
          </div>
        )
      })

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
            <SelectField
                hintText='Select Site'
                onChange={() => this._onSelectSite()}
                value={this.state.siteID}
            >
              {sites.map(s => <MenuItem key={s.id} value={s.id} primaryText={s.name} /> )}
            </SelectField>
            <br /><br />
            <div>
              <TextField
                  floatingLabelText='First Name'
                  onChange={this.handleChange}
                  value={this.state.firstName}
              />
              <br /><br />
              <div onClick={() => this.submitForm()}>Click me</div>
              <div onClick={() => createContact(this.state.firstName)}>Click me2</div>
            </div>

            {rows}

            {/*<ContactsWithView type="personal" />*/}
            {/*<UserForm />
            {children}*/}
          </article>
        </Paper>
      </section>
    )
  }
}

User.propStyles = {
  children: PropTypes.object
}

const CONTACTS_QUERY = gql`
  query fetchContacts($type: String) {
    fetchContacts(type: "personal") {
      _id
      name
      type
    }
  }`

const CREATE_CONTACT_MUTATION = gql`
  mutation createContact($name: String) {
    createContact(name: $name, type: "personal") {
      _id
      name
      type
    }
  }`

export default withApollo(compose(
  graphql(CONTACTS_QUERY, {
    props({data: {loading, fetchContacts}}) {
      return {loading, fetchContacts}
    }
  }),
  graphql(CREATE_CONTACT_MUTATION, {
    props({ ownProps, mutate }) {
    return {
      createContact(name) {
        // console.log('ownProps:', ownProps)
        // console.log('mutate:', mutate)
        return mutate({
          variables: { name },
          optimisticResponse: {
            __typeName: 'Mutation',
            createContact: {
              __typeName: 'Contact',
              _id: null,
              name: name,
              type: 'personal'
            }
          },
          updateQueries: {
            fetchContacts: (prev, { mutationResult }) => {
              const newContact = mutationResult.data.createContact
              return update(prev, {
                fetchContacts: {
                  $unshift: [newContact]
                }
              })
            }
          }
        })
      }
    }
  }
    /*props: ({ ownProps, mutate }) => ({
      createContact(name) {
        console.log('submit name:', name)
        console.log('ownProps:', ownProps)
        return () => mutate({
          variables: { name },
          updateQueries: {
            fetchContacts: (prev, { mutationResult }) => {
              const newContact = mutationResult.data.createContact
              return update(prev, {
                fetchContacts: {
                  $unshift: [newContact]
                }
              })
            }
          },
          optimisticResponse: {
            __typeName: 'Mutation',
            createContact: {
              __typeName: 'Contact',
              // _id: null,
              name: name,
              type: 'personal'
            }
          }
        })
      }
    })*/
  })
)(User))

/*const withList = graphql(ContactsQuery, {
  options: ({ type }) => ({ variables: { type } }),
  props: ({ ownProps, data }) => {
    if (data.loading) return { isLoading: true }
    if (data.error) return { hasErrors: true }
    return { contacts: data.fetchContacts }
  }
})

const withMutation = graphql(CREATE_CONTACT_MUTATION, {
  props({ ownProps, mutate }) {
    return {
      submit(name) {
        // console.log('ownProps:', ownProps)
        // console.log('mutate:', mutate)
        return mutate({
          variables: { name },
          optimisticResponse: {
            __typeName: 'Mutation',
            createContact: {
              __typeName: 'Contact',
              _id: null,
              name: name,
              type: 'personal'
            }
          },
          updateQueries: {
            Contact: (prev, { mutationResult }) => {
              console.log('mutationResult:', mutationResult)
              const newContact = mutationResult.data.createContact
              return update(prev, {
                contacts: {
                  $unshift: [newContact]
                }
              })
            }
          }
        })
      }
    }
  }
})*/

// export default withList(withMutation(User))
// export default withList(User)
