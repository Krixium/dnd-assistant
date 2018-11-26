import React from 'react';
import {render} from 'react-testing-library'
import HpTrackerController from '../hp/controller/HpTrackerController'

test('HP tracker renders properly', () => {
    const {container} = render(
        // Create DiceRoller component here
        <HpTrackerController />
    )
});