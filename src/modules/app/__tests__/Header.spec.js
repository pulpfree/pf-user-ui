import React from 'react';
import { shallow } from 'enzyme'

import Header from '../components/Header'

const links = [
  {
    label: 'dashboard',
    path: '/',
  },
  {
    label: 'sites',
    path: '/site',
  },
  {
    label: 'users',
    path:  '/user',
  },
]

const auth = {
  isAuthenticated: true
}

describe('components', () => {
  describe('<Header />', () => {

    const hdrC = shallow(<Header auth={auth} links={links} />)

    it('renders', () => {
      expect(hdrC.find('header').hasClass('App-header')).toBe(true)
    })

    it('matches snapshot', () => {
      expect(hdrC).toMatchSnapshot()
    })
  })
})