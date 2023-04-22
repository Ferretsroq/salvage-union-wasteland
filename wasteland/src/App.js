import logo from './logo.svg';
import './App.css';
import {Hexagon, TiledHexagons} from 'tiled-hexagons';
import { React, Component, Text } from 'react';
import { NodeWeb } from './NodeMapping';
import {Network} from 'vis-network';
import Graph from 'react-vis-network-graph';
//import {EncounterCard} from './EncounterCard.js'

let nodeText = 'bar';


class AreaMap extends Component
{
  constructor(props)
  {
    super(props)
    if(props == null || Object.keys(props).length == 0 || Object.keys(props).length == 1)
    {
      this.state = 
      {
        size: Math.floor(Math.random()*4),
        web: new NodeWeb(0.25),
        graph: {nodes: [], edges: []},
        options: {
                    layout: 
                    {
                      hierarchical: false
                    }, 
                    edges: 
                    {
                      color: "#000000"
                    },
                    height: "500px", 
                    physics: 
                    {
                      enabled: true
                    }, 
                    edges: 
                    {
                      physics: false
                    },
                    interaction:
                  {
                    dragNodes: false,
                    dragView: false
                  }},
        text: '',
        display: false,
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
    else
    {
      console.log(props);
      console.log('bar');
      this.state = 
      {
        web: props.web,
        graph: props.graph,
        options: props.options,
        text: props.text
      }
    }
    
    this.events = {selectNode: function(event) 
    {
      this.updateText(event);
    }.bind(this)};
    
  }
  updateText(event)
  {
    if(event.nodes.length > 0)
    {
      this.state.text = event.nodes[0].toString();
      this.setState({text: this.state.text});
    }
  }
  render()
  {
    return(
      <div>
        <>{this.state.text}</>
      <Graph 
      graph={this.state.graph}
      options={this.state.options}
      events={this.events}
      />
      </div>
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
      activeGraph: new NodeMap(4),
      subtext: ''
    }
    for(let i = 0; i < 100; i++)
    {
      this.state.hexes[i] = {num: 0, color: 'gray', text: Math.floor(Math.random() * 100).toString()+ ' scrap here!', graph: new NodeMap(4), graphVisible: false};
    }
    this.state.hexes[0].color = 'green';
    this.setState({activeGraph: this.state.hexes[0].graph});
    this.setState({subtext: this.state.activeGraph.text});
    this.setState({text: this.state.hexes[0].text});
    this.events = {selectNode: function(event) 
      {
        this.updateText(event);
      }.bind(this)};
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
    this.setState({text: `${this.state.hexes[index].text}`} );
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
  updateText(event)
  {
    if(event.nodes.length > 0)
    {
      this.state.subtext = event.nodes[0].toString();
      this.setState({subtext: this.state.subtext});
    }
  }

  render()
  {
    let {count} = this.state;
    let {hexes} = this.state;
    //this.state.activeGraph.setState({text: this.state.activeGraph.state.text});
    //this.state.activeGraph.forceUpdate();
    return(
      <div>
      <TiledHexagons
      tileSideLengths={80}
      tileGap={0}
      tileBorderRadii={0}
      maxHorizontal={8}
      tiles={this.makeTiles(30)}
      />
      <div><>{this.state.text}</></div>
      <>{this.state.subtext}</>
      {<Graph 
      graph={this.state.activeGraph.graph}
      options={this.state.activeGraph.options}
      events={this.events}
      
    />}
      </div>
    )
  }
}

class NodeMap
{
  constructor(size)
  {
        this.size = Math.floor(Math.random()*size);
        this.web = new NodeWeb(0.25);
        this.graph = {nodes: [], edges: []};
        this.options = {
                    layout: 
                    {
                      hierarchical: false
                    }, 
                    edges: 
                    {
                      color: "#000000"
                    },
                    height: "500px", 
                    physics: 
                    {
                      enabled: true
                    }, 
                    edges: 
                    {
                      physics: false
                    },
                    interaction:
                  {
                    dragNodes: false,
                    dragView: false
                  }};
        this.text = '';
        this.web.GenerateWeb(this.size);
        this.web.MakeNodeConnections();
        for(let index = 0; index < Object.keys(this.web.web).length; index++)
        {
          const node = this.web.web[index];
          this.graph.nodes.push({id: node.id, label: node.id.toString(), title: `Node: ${node.id}, exits: ${node.exits}`});
          if(node.exits.length > 0)
          {
            for(let exitIndex = 0; exitIndex < node.exits.length; exitIndex++)
            {
              this.graph.edges.push({from: node.id, to: parseInt(node.exits[exitIndex])})
            }
          }
        }
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
