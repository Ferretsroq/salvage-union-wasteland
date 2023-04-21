import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Hexagon, TiledHexagons} from 'tiled-hexagons'



const simpleButton = () =>
{
  return (
    <Hexagon sideLength={40}
    text="Hello, world!"
    textStyle={{fill: 'blue'}}
    />
  )
}

class Grid extends Component
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
      count: 0
    }
  }
}

const grid = () =>
{
  return(
    <TiledHexagons
    tileSideLengths={60}
    tileGap={0}
    tileBorderRadii={0}
    maxHorizontal={3}
    tiles=
    {
      [
        {
          text: 'foo',
          fill:'blue',
          shadow: 'gray'
        },
        {
          text: 'bar',
          fill:'red'
        },
        {
          text: 'baz',
          fill: 'black'
        },
        {
          text: 'foo',
          fill:'blue'
        },
        {
          text: 'bar',
          fill:'red'
        },
        {
          text: 'baz',
          fill: 'black'
        },
        {
          text: 'foo',
          fill:'blue'
        },
        {
          text: 'bar',
          fill:'red'
        },
        {
          text: 'baz',
          fill: 'black'
        }]}
    />
  )
}
function App() {
  return (
    <>
    <>Test</>
    <>{simpleButton()}</>
    <>{grid()}</>
    </>
  );
}

export default App;
