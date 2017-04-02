import React from 'react'
import { mount } from 'enzyme'
import { HelloTitle } from './'

describe('<Title />', () => {
  it('contains the phrase "Hello"', () => {
    const wrapper = mount(<HelloTitle />)
    expect(wrapper.text()).toBe('Hello')
  })
})
