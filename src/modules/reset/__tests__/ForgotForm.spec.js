import React from 'react';
import { shallow } from 'enzyme'

import { ForgotForm } from '../components/ForgotForm'

describe('components', () => {

  describe('<ForgotForm />', () => {

    const wrapper = shallow(<ForgotForm />)

    it('matches snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})