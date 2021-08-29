import React, { useState, useEffect } from 'react';
import { cards, placeholder } from '../assets/data';

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
  }, [state.playerHand, state.dealerTotal]);

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

  //   const dealerHit = () => {
  //     setState({
  //       ...state,
  //       dealerHand: [
  //         ...state.dealerHand,
  //         state.deck[Math.floor(Math.random() * state.deck.length)],
  //       ],
  //     });
  //   };

  const handReducer = (hand) => {
    return hand.reduce((n, { value }) => n + value, 0);
  };

  const total = (e) => {
    setState({
      ...state,
      playerTotal: handReducer(state.playerHand),
      dealerTotal: handReducer(state.dealerHand),
    });

    state.dealerTotal = console.log(state.playerHand, state.dealerHand);
  };

  const stand = (e) => {
    setState({
      ...state,
      dealerTurn: true,
      playerTurn: false,
    });
  };

  const newGame = () => {
    setState({
      ...state,
      playerTotal: 0,
      dealerTotal: 0,
      playerHand: [],
      dealerHand: [],
      playerTurn: true,
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
            {state.dealerHand.length === 0 ? (
              <div className="card_container">
                <img src={placeholder} className="cards" />
              </div>
            ) : (
              state.dealerHand.map((card) => (
                <div className="card_container">
                  <img src={card.image} className="cards" />
                </div>
              ))
            )}
          </div>
        </div>
        <div>
          <div className="hand_container">
            <div className="hand">
              {state.playerHand.length === 0 ? (
                <div className="card_container">
                  <img src={placeholder} className="cards" />
                </div>
              ) : (
                state.playerHand.map((card) => (
                  <div className="card_container">
                    <img src={card.image} className="cards" />
                  </div>
                ))
              )}
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
          <button onClick={newGame} className="button button_stand">
            New Game
          </button>
        </div>
      </div>
    </section>
  );
}
