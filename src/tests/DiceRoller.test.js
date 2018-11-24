import React from 'react';
import {render, fireEvent, waitForElement, cleanup, getByPlaceholderText} from 'react-testing-library'
import DiceRollerController from '../dice-roller/controller/DiceRollerController'

afterEach(cleanup);

test('Dice Roller displays help message if the input text is invalid', () => {

});

test('Dice Roller displays a result frame when the Roll button is clicked', () => {
    const {getByText, container, getByPlaceholderText} = render(
        <DiceRollerController />
    )
    const diceRollText = "1d6+2";
    const input = getByPlaceholderText(DiceRollerController.inputPlaceholder);
    fireEvent.change(input, {target: {value: diceRollText}})
    fireEvent.click(getByText("Roll"));
    expect(container.childElementCount).toBe(1);
});