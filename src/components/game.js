import React, { Component } from 'react';
import cards from '../assets/data';

class Game extends Component {
  render() {
    return (
      <section>
        <div className="game_container">
          <p>hi</p>
          <img src={cards[0].image} className="nice" />;
        </div>
      </section>
    );
  }
}

export default Game;
