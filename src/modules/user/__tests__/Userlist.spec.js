import React from 'react'
import ReactDOM from 'react-dom'
import Userlist from '../components/Userlist'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Userlist />, div)
})