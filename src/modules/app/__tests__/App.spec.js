import React from 'react';
import { shallow } from 'enzyme'

import { App } from '../components/App'

var mock = (function() {
  var store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  }
})()

const user = {
  email: 'test@example.com'
}

Object.defineProperty(window, 'localStorage', {
  value: mock,
})
// localStorage
localStorage.setItem('user', JSON.stringify(user))

const auth = {
  isAuthenticated: true
}

describe('components', () => {
  describe('<App />', () => {

    const appC = shallow(<App auth={auth} />)

    it('renders without crashing', () => {
      expect(appC.find('div').hasClass('App')).toBe(true)
    })

    it('matches snapshot', () => {
      expect(appC).toMatchSnapshot()
    })
  })
})
