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
    hitScore();
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
    if (dealerTurn) {
      //the interval hook "watches" for the dealer's turn
      dealerLogic();
    }
  }, 3000);

  const hit = () => {
    //on hit, random index of deck array is called
    //Future fix: splice out random index as it's called.
    let index = Math.floor(Math.random() * state.deck.length);
    setState({
      ...state,
      playerHand: [...state.playerHand, state.deck[index]],
    });
  };

  const dealerHit = () => {
    let index = Math.floor(Math.random() * state.deck.length);

    setState({
      ...state,
      dealerHand: [...state.dealerHand, state.deck[index]],
    });
  };

  const dealerLogic = () => {
    let dealer = state.dealerTotal;
    let player = state.playerTotal;
    switch (true) {
      case dealer < 18:
        dealerHit();
        break;
      case player > 18 && dealer < player:
        dealerHit();
        break;
      case dealer === player:
        checkWinner();
        break;
      default:
        checkWinner();
    }

    // if (state.dealerTotal < 18) {
    //   dealerHit();
    // } else {
    //   checkWinner();
    // }
  };

  const stand = () => {
    setState({
      ...state,
      dealerTurn: !state.dealerTurn,
      playerTurn: !state.playerTurn,
    });
    setDealerTurn(true);

    // checkWinner();
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

  const hitScore = () => {
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
        alert('You lost');
        newGame();
        break;
      case player > 21:
        alert('Oops, you bust. Dealer Wins');
        newGame();
        break;
      case dealer > 21:
        alert('Dealer bust, you win!');
        newGame();
        break;
      case dealer === player:
        alert(`Dealer Wins with ${dealer}`);
    }
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
            onClick={() => hit()}
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
