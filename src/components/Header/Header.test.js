import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ReactDOM from 'react-dom'
import { PotluckProvider } from '../../context/PotluckContext'
import Header from './Header';

describe(`Adds header to dom without crashing`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(
        <PotluckProvider>
        <Header />
        </PotluckProvider>
    )
    .find('.header')
    expect(toJson(wrapper)).toMatchSnapshot()
    })
})