import React, { useState, useEffect } from 'react';
import cards from '../assets/data';

export default function Game() {
  const [state, setState] = useState({
    deck: cards,
    dealerHand: [],
    dealerTotal: 10,
    dealerScore: 1,
    playerHand: [],
    playerTotal: 0,
    playerScore: 1,
    playerTurn: true,
  });

  useEffect(() => {
    total();
    if (state.dealerHand < 2) {
      newGame();
    }
  });

  const hit = () => {
    if (state.playerTurn) {
      setState({
        ...state,
        playerHand: [
          ...state.playerHand,
          state.deck[Math.floor(Math.random() * state.deck.length)],
        ],
      });
    }
  };

  const dealerHit = () => {
    setState({
      ...state,
      dealerHand: [
        ...state.dealerHand,
        state.deck[Math.floor(Math.random() * state.deck.length)],
      ],
    });
  };

  const handReducer = (hand) => {
    return hand.reduce((n, { value }) => n + value, 0);
  };

  const total = (e) => {
    state.playerTotal = handReducer(state.playerHand);
    state.dealerTotal = handReducer(state.dealerHand);
    console.log(state.playerHand, state.dealerHand);
  };

  const stand = (e) => {
    dealerHit();
    setState({
      ...state,
      dealerTurn: true,
      playerTurn: false,
    });
  };

  const newGame = (e) => {
    setState({
      ...state,
      playerTotal: 0,
      dealerTotal: 0,
      dealerHand: [state.deck[Math.floor(Math.random() * state.deck.length)]],
      playerHand: [state.deck[Math.floor(Math.random() * state.deck.length)]],
    });
  };

  return (
    <section>
      <div className="game_container">
        <div className="hand_container">
          <div className="total">
            Dealer: {state.dealerTotal}
            {state.dealerTurn ? <div>Dealer turn</div> : <div>Waiting</div>}
          </div>

          <div className="hand">
            {state.dealerHand.map((card) => (
              <div className="card_container">
                <img src={card.image} className="cards" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="hand_container">
            <div className="hand">
              {state.playerHand.map((card) => (
                <div className="card_container">
                  <img src={card.image} className="cards" />
                </div>
              ))}
            </div>
            <div className="total">
              Player: {state.playerTotal}{' '}
              {state.playerTurn ? <div>Your turn</div> : <div>Waiting</div>}
            </div>
          </div>
        </div>
        <div className="buttons">
          <button onClick={hit} className="button button_hit">
            Hit
          </button>
          <button onClick={stand} className="button button_stand">
            Stand
          </button>
          <button
            onClick={() => {
              newGame();
              total();
            }}
            className="button button_stand"
          >
            New Game
          </button>
        </div>
      </div>
    </section>
  );
}
