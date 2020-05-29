import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { PotluckProvider } from '../../context/PotluckContext'
import PotluckExpandedItem from './PotluckExpandedItem';
import PotluckCondensedView from './PotluckCondensedView'
import ItemInPotluck from './ItemInPotluck'

describe(`Adds all of the potluck views to dom without crashing`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(
        <PotluckProvider>
            <PotluckExpandedItem />
        </PotluckProvider>
    )
    .find('.potluck-container')
    expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('renders without crashing', () => {
        const wrapper = shallow(
        <PotluckProvider>
            <PotluckCondensedView />
        </PotluckProvider>
    )
    .find('.potluck-container')
    expect(toJson(wrapper)).toMatchSnapshot()
    })
    
    it('renders without crashing', () => {
        const wrapper = shallow(
        <PotluckProvider>
            <ItemInPotluck />
        </PotluckProvider>
    )
    .find('.button-take')
    expect(toJson(wrapper)).toMatchSnapshot()
    })


})