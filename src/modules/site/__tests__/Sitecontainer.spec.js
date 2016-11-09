
import React from 'react';
import { shallow } from 'enzyme'

// import Store from '../../../store/configureStore'
import { Site } from '../components/Site.cont'


describe('components', () => {
  describe('<Site />', () => {

    const siteC = shallow(<Site />)

    it('renders without crashing', () => {
      expect(siteC).toMatchSnapshot()
    })
  })
})
