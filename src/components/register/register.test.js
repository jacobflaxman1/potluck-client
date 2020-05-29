import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { PotluckProvider } from '../../context/PotluckContext'
import RegistrationForm from './RegistrationForm';


describe(`Adds all of the potluck views to dom without crashing`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(
        <PotluckProvider>
            <RegistrationForm />
        </PotluckProvider>
    )
    .find('.RegistrationForm')
    expect(toJson(wrapper)).toMatchSnapshot()
    })
})