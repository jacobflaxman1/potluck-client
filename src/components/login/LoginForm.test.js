import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { PotluckProvider } from '../../context/PotluckContext'
import LoginForm from './LoginForm';

describe(`Adds header to dom without crashing`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(
        <PotluckProvider>
            <LoginForm />
        </PotluckProvider>
    )
    .find('.LoginForm')
    expect(toJson(wrapper)).toMatchSnapshot()
    })
})