import logo from './logo.svg';
import './App.css';
import {Hexagon, TiledHexagons} from 'tiled-hexagons';
import { React, Component, createRef } from 'react';
import { NodeWeb } from './NodeMapping';
import {Network} from 'vis-network';
import Graph from 'react-vis-network-graph';
//import {EncounterCard} from './EncounterCard.js'

class AreaMap extends Component
{
  constructor(props)
  {
    super(props)
    this.state = 
    {
      size: Math.floor(Math.random()*5),
      web: new NodeWeb(1),
      graph: {nodes: [], edges: []},
      options: {layout: {hierarchical: false}, edges: {color: "#000000"}, height: "500px", physics: {enabled: true}, edges: {physics: false}},
      events: {select: function(event) { var {nodes, edges} = event;}},
      display: false
    }
    this.state.web.GenerateWeb(this.state.size);
    this.state.web.MakeNodeConnections();
    for(let index = 0; index < Object.keys(this.state.web.web).length; index++)
    {
      const node = this.state.web.web[index];
      this.state.graph.nodes.push({id: node.id, label: node.id.toString(), title: `Node: ${node.id}, exits: ${node.exits}`});
      if(node.exits.length > 0)
      {
        for(let exitIndex = 0; exitIndex < node.exits.length; exitIndex++)
        {
          this.state.graph.edges.push({from: node.id, to: parseInt(node.exits[exitIndex])})
        }
      }
    }
  }
  render()
  {
    return(
      <Graph 
      graph={this.state.graph}
      options={this.state.options}
      events={this.state.events}
      />
    )
  }
}
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
      activeGraph: new AreaMap()
    }
    for(let i = 0; i < 100; i++)
    {
      this.state.hexes[i] = {num: 0, color: 'gray', text: Math.floor(Math.random() * 100).toString()+ ' scrap here!', graph: new AreaMap(), graphVisible: false};
    }
    this.setState({activeGraph: this.state.hexes[0].graph});
  }

  updateCounter(index)
  {
    this.state.hexes[index].num++;
    for(let hex = 0; hex < Object.keys(this.state.hexes).length; hex++)
    {
      this.state.hexes[hex].color = 'gray';
    }
    this.state.hexes[index].color = 'green';

    this.setState({hexes: this.state.hexes});
    this.setState({text: this.state.hexes[index].text});
    this.setState({activeGraph: this.state.hexes[index].graph});
  }

  makeTiles(num)
  {
    let tiles = [];
    for(let i = 0; i < num; i++)
    {
      tiles.push({
        text: '',
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
    console.log(this.state.activeGraph);
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
      <Graph
            graph={this.state.activeGraph.state.graph}
            options={this.state.activeGraph.state.options}
            events={this.state.activeGraph.state.events}
      />
      </div>
    )
  }
}



function App() {
  return (
    <div>
    <Grid />

    </div>
  );
}

export default App;
