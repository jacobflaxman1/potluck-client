import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PotluckContext from '../../context/PotluckContext'
import LoginForm from './LoginForm';

describe(`Adds login form to dom without crashing`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(
            <LoginForm />
    )
    .find('.LoginForm')
    expect(toJson(wrapper)).toMatchSnapshot()
    })
})

//dont use potluckprovider ... use dummy data -> dummy store 