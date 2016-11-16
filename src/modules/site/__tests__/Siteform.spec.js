import React from 'react';
import { shallow } from 'enzyme'

import { Siteform } from '../components/Siteform'
import { setSiteProp } from '../siteActions'
import { scratchState } from '../siteReducer'


describe('components', () => {
  describe('<Siteform />', () => {

    const siteF = shallow(<Siteform scratch={scratchState} actions={{setSiteProp}} />)

    it('renders without crashing', () => {
      expect(siteF).toMatchSnapshot()
    })

    it('expect a number of input elements', () => {
      expect(siteF.find('TextField').length).toEqual(11)
    })
  })
})