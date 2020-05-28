import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { PotluckProvider } from '../../context/PotluckContext'
import PostPotluckForm from './PostPotluckForm';

describe(`Adds Potluck Form to dom without crashing`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(
        <PotluckProvider>
            <PostPotluckForm />
        </PotluckProvider>
    )
    .find('.submit-potluck-form')
    expect(toJson(wrapper)).toMatchSnapshot()
    })
})