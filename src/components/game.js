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
      dealerLogic();
    }
  }, 3000);

  const hit = () => {
    let index = Math.floor(Math.random() * state.deck.length); //grab random index
    setState({
      ...state,
      playerHand: [...state.playerHand, state.deck[index]], //returning array item at random index
    });
  };

  const dealerHit = () => {
    let index = Math.floor(Math.random() * state.deck.length); //grab random index
    if (state.dealerTotal < 18) {
      setState({
        ...state,
        dealerHand: [...state.dealerHand, state.deck[index]], //returning array item at random index
      });
    } else return;
  };

  const dealerLogic = () => {
    let fuck = state.dealerTotal;
    if (fuck < 18) {
      console.log(state.dealerTotal);
      dealerHit();
    } else {
      checkWinner();
    }
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
