import React from 'react';
import { render } from 'react-testing-library';
import SearchController from '../search/controller/SearchController';

it('renders nothing', () => {
    // const {getByText, getBySelectText, getByValue} = render(<SearchController />)
    render(<SearchController />)
    
    //getByValue("races").value = "Races";
    //getByPlaceholderText("Text").value = "Elf";
});