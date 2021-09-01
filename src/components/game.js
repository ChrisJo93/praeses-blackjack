import React, { useState, useEffect, useRef } from 'react';
import { cards, placeholder } from '../assets/data';

export default function Game() {
  const [state, setState] = useState({
    deck: cards,
    dealerHand: [],
    dealerTotal: 0,
    playerHand: [],
    playerTotal: 0,
  });
  const [dealerTurn, setDealerTurn] = useState(false);

  useEffect(() => {
    total();
    hitBustChecker();
    if (state.playerTotal === 21) {
      console.log('blackjack');
    }
    switch (true) {
      case state.playerTotal === 21:
        alert('Blackjack, you win!');
        newGame();
        break;
      case state.dealerTotal === 21:
        alert('Dealer blackjack, you lose!');
        newGame();
    }
  }, [
    state.playerHand,
    state.dealerHand,
    state.dealerTotal,
    state.playerTotal,
  ]);

  const useInterval = (callback, delay) => {
    //creating set interval hook
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  useInterval(() => {
    //the interval hook "watches" for the dealer's turn
    if (dealerTurn) {
      dealerLogic();
    }
  }, 3000);

  const handleHit = (hand) => {
    //Future fix: splice out random index as it's called.
    let index = Math.floor(Math.random() * state.deck.length);

    for (let j = 0; j < state[hand].length; j++) {
      state.deck.filter((item) => item === state[hand][j]);
      console.log(state.deck.filter((item) => item === state[hand][j]));
    }

    setState({
      ...state,
      [hand]: [...state[hand], state.deck[index]],
    });
  };

  const dealerLogic = () => {
    let dealer = state.dealerTotal;
    let player = state.playerTotal;
    switch (true) {
      case dealer < 18 && dealer > player:
        checkWinner();
        break;
      case dealer < 18:
        handleHit('dealerHand');
        break;
      case player > 18 && dealer < player:
        handleHit('dealerHand');
        break;
      case dealer > 18 && dealer < player:
        checkWinner();
        break;

      default:
        checkWinner();
    }
  };

  const stand = () => {
    setDealerTurn(true);
    dealerLogic();
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
    setDealerTurn(false);
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

  const hitBustChecker = () => {
    let player = state.playerTotal;
    let dealer = state.dealerTotal;
    switch (true) {
      case player > 21:
        alert(`Oops, you bust at ${player}`);
        newGame();
        break;
      case dealer > 21:
        alert(`Dealer bust at ${dealer}`);
        newGame();
        break;
    }
  };

  const checkWinner = () => {
    let player = state.playerTotal;
    let dealer = state.dealerTotal;

    switch (true) {
      case player > dealer:
        alert('You win!');
        newGame();
        break;
      case player < dealer:
        alert(`You lost, dealer had ${dealer} points.`);
        newGame();
        break;
      case dealer === player:
        alert(`It's a draw!`);
        newGame();
        break;
    }
  };

  return (
    <section>
      <div className="game_container">
        <div className="hand_container">
          <div className="total">
            Dealer: {state.dealerTotal}
            {dealerTurn ? <div>Dealer turn</div> : <div>Waiting</div>}
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
            onClick={() => handleHit('playerHand')}
            className="button button_hit"
            button
            disabled={dealerTurn}
          >
            Hit
          </button>
          <button onClick={() => stand()} className="button button_stand">
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
