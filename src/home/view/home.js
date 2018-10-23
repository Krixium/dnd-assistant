import React, { Component } from 'react';

class Home extends Component {
    render () {
        return (
        <div>
            <h1>Dungeons & Dragons Assistant</h1>
            <br/>
            <div class="popup">
                <h2><a href="/dice">Dice Roller</a></h2>
                <p>A die generator. Choose the number of dice, the number of sides.</p>
            </div>
            <br/>
            <div class="popup">
                <h2><a href="/hp">HP Tracker</a></h2>
                <p>Add enemies and allies. Track their health for each turn.</p>
            </div>
            <br/>
            <div class="popup">
                <h2><a href="/log">Combat Log</a></h2>
                <p>Tracks all player interactions for the session. This includes dice rolls, health, adding or deleting enemies</p>
            </div>
            <br/>
            <div class="popup">
                <h2><a href="/profile">Character Profile</a></h2>
                <p>Information about characters. You can add multiple character profiles, save them, and load them.</p>
            </div>
            <br/>
            <div class="popup">
                <h2><a href="/custom">Custom Items</a></h2>
                <p>Create custom items, monsters, or spells.</p>
            </div>
            <br/>
            <div class="popup">
                <h2><a href="/search">Search</a></h2>
                <p>Search for information on items, spells, monsters, ect.</p>
            </div>
        </div>
        );
    }
}

export default Home;