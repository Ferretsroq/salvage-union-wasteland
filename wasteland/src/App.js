import logo from './logo.svg';
import './App.css';
import {Hexagon, TiledHexagons} from 'tiled-hexagons';
import { Component } from 'react';
import {EncounterCard} from './EncounterCard.js'


class Grid extends Component
{
  constructor(props)
  {
    super(props)
    this.state = 
    {
      count: 0,
      hexes: {},
      text: '',
    }
    for(let i = 0; i < 100; i++)
    {
      this.state.hexes[i] = {num: 0, color: 'gray', text: Math.floor(Math.random() * 10).toString()+ ' scrap here!'};
    }
  }

  updateCounter(index)
  {
    this.state.hexes[index].num++;
    this.state.hexes[index].color = 'green';
    this.setState({hexes: this.state.hexes});
    this.setState({text: this.state.hexes[index].text});

  }

  makeTiles(num)
  {
    let tiles = [];
    for(let i = 0; i < num; i++)
    {
      tiles.push({
        text: this.state.hexes[i].num.toString(),
        onClick: () => {this.updateCounter(i)},
        fill: this.state.hexes[i].color
      })
    }
    return tiles;
  }

  render()
  {
    let {count} = this.state;
    let {hexes} = this.state;
    return(
      <div>
      <TiledHexagons
      tileSideLengths={80}
      tileGap={0}
      tileBorderRadii={0}
      maxHorizontal={8}
      tiles={this.makeTiles(30)}
      />
      <>{this.state.text}</>
      </div>
    )
  }
}



function App() {
  return (
    <Grid />
  );
}

export default App;
