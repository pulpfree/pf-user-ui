import React from 'react';
import { shallow } from 'enzyme'
import { User } from '../components/User.cont';

const user = {
  active: true
}

describe('components', () => {
  describe('<User/>', () => {

    const wrapper = shallow(<User userList={user} />)

    it('renders without crashing', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('expect a number of input elements', () => {
      expect(wrapper.find('section').length).toEqual(1)
      expect(wrapper.find('Paper').length).toEqual(1)
      // console.log('paper:', wrapper.find('Paper'))
    })
  })
})
