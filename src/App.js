import React from 'react'
import Header from './components/header'
import Game from './components/game'
import Footer from './components/footer'

import './app.css';

export default function App() {
  return (
    <main className="main">
    <Header/>
    <Game/>
    <Footer/>
    </main>
  );
}


