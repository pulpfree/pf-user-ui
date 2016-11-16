import React from 'react';
import { shallow } from 'enzyme'

import { RoleForm } from '../components/RoleForm'

describe('components', () => {
  describe('<RoleForm />', () => {

    const wrapper = shallow(<RoleForm actions={{}} />)

    it('renders without crashing', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('expect a number of input elements', () => {
      const tfs = wrapper.find('TextField')
      expect(wrapper.find('TextField').length).toEqual(2)
    })
  })
})