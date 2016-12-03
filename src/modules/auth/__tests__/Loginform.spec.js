import React from 'react';
import { shallow } from 'enzyme'

import { Loginform } from '../components/Loginform'
import { Forgotform } from '../components/Forgotform'

describe('components', () => {
  describe('<Loginform />', () => {

    const wrapper = shallow(<Loginform />)

    it('matches snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('<Forgotform />', () => {

    const wrapper = shallow(<Forgotform />)

    it('matches snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})