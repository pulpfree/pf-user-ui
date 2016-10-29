import React from 'react';
import { shallow } from 'enzyme'

import { App } from '../components/App'

describe('components', () => {
  describe('<App />', () => {

    const appC = shallow(<App />)

    it('renders without crashing', () => {
      expect(appC.find('div').hasClass('App')).toBe(true)
    })

    it('matches snapshot', () => {
      expect(appC).toMatchSnapshot()
    })
  })
})
