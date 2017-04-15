import React from 'react';
import { shallow } from 'enzyme'

import { UserForm } from '../components/UserForm'
import { setUserProp } from '../userActions'
import { scratchState } from '../userReducer'

describe('components', () => {
  describe('<UserForm />', () => {

    const wrapper = shallow(<UserForm scratch={scratchState} actions={{setUserProp}} />)

    it('renders without crashing', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('expect a number of input elements', () => {
      const tfs = wrapper.find('TextField')
      expect(wrapper.find('TextField').length).toEqual(4)
    })
  })
})