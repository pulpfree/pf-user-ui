import React from 'react';
import { shallow } from 'enzyme'
import User from '../components/User.cont';


describe('components', () => {
  describe('<User />', () => {

    const userC = shallow(<User />)

    it('renders without crashing', () => {
      expect(userC).toMatchSnapshot()
    })
  })
})
