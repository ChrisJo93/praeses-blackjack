import React, { useState, useEffect } from 'react';
import { cards, placeholder } from '../assets/data';

export default function Game() {
  const [state, setState] = useState({
    deck: cards, //an array of objects
    dealerHand: [],
    dealerTotal: 0,
    dealerTurn: false,
    playerHand: [],
    playerTotal: 0,
    playerTurn: true,
    discard: [],
  });

  useEffect(() => {
    total();
  }, [
    state.playerHand,
    state.dealerHand,
    state.dealerTotal,
    state.playerTotal,
    state.playerTurn,
  ]);

  const hit = (hand) => (e) => {
    setState({
      ...state,
      [hand]: [...state[hand], getRandomCard(state.deck)], //returning array item at random index
    });
  };
  //   state.deck[getRandomCard(state.deck)]], Return whole card instead of just a number
  const getRandomCard = (deck) => {
    let newArr = deck; //set mutable array
    let random = Math.floor(Math.random() * newArr.length); //grab random index

    return newArr[random];
  };

  const stand = () => {
    setState({
      ...state,
      dealerTurn: true,
      playerTurn: false,
    });
    dealerHit();
  };

  const dealerHit = () => {
    setState({
      ...state,
      dealerHand: [...state.dealerHand, getRandomCard(state.deck)], //returning array item at random index
    });
  };

  const newGame = () => {
    total();
    setState({
      ...state,
      playerTotal: 0,
      dealerTotal: 0,
      playerHand: [],
      dealerHand: [],
      playerTurn: true,
      dealerTurn: false,
    });
  };

  const handReducer = (hand) => {
    return hand.reduce((n, { value }) => n + value, 0);
  };

  const total = () => {
    setState({
      ...state,
      dealerTotal: handReducer(state.dealerHand),
      playerTotal: handReducer(state.playerHand),
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
                <img src={placeholder} className="cards" alt="Cards" />
              </div>
            ) : (
              state.dealerHand.map((card) => (
                <div className="card_container">
                  <img src={card.image} className="cards" alt="Cards" />
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
                  <img src={placeholder} className="cards" alt="Cards" />
                </div>
              ) : (
                state.playerHand.map((card) => (
                  <div className="card_container">
                    <img src={card.image} className="cards" alt="Cards" />
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
          <button
            onClick={hit('playerHand')}
            className="button button_hit"
            button
            disabled={state.dealerTurn}
          >
            Hit
          </button>
          <button
            type="button"
            onClick={hit('dealerHand')}
            className="button button_hit"
          >
            dealer
          </button>
          <button onClick={stand} className="button button_stand">
            Stand
          </button>
          <button
            type="button"
            onClick={newGame}
            className="button button_stand"
          >
            New Game
          </button>
        </div>
      </div>
    </section>
  );
}
