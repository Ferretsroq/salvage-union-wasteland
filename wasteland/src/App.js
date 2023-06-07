import logo from './logo.svg';
import './App.css';
import {Hexagon, TiledHexagons} from 'tiled-hexagons';
import { React, Component, useRef, createRef  } from 'react';
import { NodeWeb } from './NodeMapping';
import {Network} from 'vis-network';
import Graph from 'react-vis-network-graph';
import {Biome, Biomes} from './biomes';
import {GetEncounter} from './encounters';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import {Text} from 'react-native';
import {RollSystemOrModule} from './advancedsalvage'




class Grid extends Component
{
  constructor(props)
  {
    super(props)
    this.ref = createRef();
    this.state = 
    {
      count: 0,
      hexes: {},
      text: '',
      activeGraph: new NodeMap(4, Biomes['Ruins']),
      subtext: ''
    }
    for(let i = 0; i < 30; i++)
    {
      const keys = Object.keys(Biomes);
      const roll = Math.floor(Math.random()*keys.length);
      const biome = Biomes[keys[roll]];
      this.state.hexes[i] = {num: 0, biome: biome, color: biome.color, text: biome.name, graph: new NodeMap(10, biome), threats: this.RollThreats()};
    }
    this.state.hexes[0].color = 'red';
    this.setState({activeGraph: this.state.hexes[0].graph});
    this.setState({subtext: this.state.activeGraph.text});
    this.setState({text: this.state.hexes[0].text});
    this.events = {selectNode: function(event) 
      {
        this.updateText(event);
      }.bind(this)};
    document.title = 'Wasteland Hex Map';
  }

  
  updateCounter(index)
  {
    for(let hex = 0; hex < Object.keys(this.state.hexes).length; hex++)
    {
      this.state.hexes[hex].color = this.state.hexes[hex].biome.color;
    }
    this.state.hexes[index].color = 'red';
    this.setState({hexes: this.state.hexes});
    this.setState({text: [`${this.state.hexes[index].text}`, <br/>, `Feature: ${this.state.hexes[index].biome.feature}`, <br/>, 'Threats:', <br/>, `${this.state.hexes[index].threats.join(', ')}`]} );
    this.setState({activeGraph: this.state.hexes[index].graph});
    this.setState({subtext: ''});
  }

  makeTiles(num)
  {
    let tiles = [];
    for(let i = 0; i < num; i++)
    {
      tiles.push({
        text: `${i}`,
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
      const node = this.state.activeGraph.web.web[event.nodes[0]];
      this.state.subtext = <Text>{`
${node.text}
Encounter: ${node.encounter}
TL 1 Scrap: ${node.tl1}
TL 2 Scrap: ${node.tl2}
TL 3 Scrap: ${node.tl3}
TL 4 Scrap: ${node.tl4}
TL 5 Scrap: ${node.tl5}
TL 6 Scrap: ${node.tl6}
Advanced Salvage: ${node.advancedSalvage}`}</Text>


      this.setState({subtext: this.state.subtext});
    }
  }
  RollThreats(hex)
  {
    const threatList = ['Tyrant', 'Torment', 'Environmental', 'Brute', 'Aberration'];
    const num = Math.floor(Math.random()*3)+1;
    let threats = [];
    for(let threatNum = 0; threatNum < num; threatNum++)
    {
      const threat = threatList[Math.floor(Math.random()*threatList.length)];
      threats.push(threat);
    }
    return threats;
  }

  async Save()
  {
      const pdf = new jsPDF();
      const element = this.ref.current;
      for(let index = 0; index < 30; index++)
      { 
        for(let hex = 0; hex < 30; hex++)
        {
          this.state.hexes[hex].color = this.state.hexes[hex].biome.color;
        }
        this.state.hexes[index].color = 'red';
        this.setState({hexes: this.state.hexes});
        this.setState({text: [`${this.state.hexes[index].text}`, <br/>, 'Threats:', <br/>, `${this.state.hexes[index].threats.join(', ')}`]} );
        this.setState({activeGraph: this.state.hexes[index].graph});
        this.setState({subtext: ''});
        await new Promise(r => setTimeout(r, 100));
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/jpeg');
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
        pdf.addPage();
        pdf.addImage(data, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        
        for(let nodeIndex = 0; nodeIndex < Object.keys(this.state.hexes[index].graph.web.web).length; nodeIndex++)
        {
          pdf.addPage();
          const node = this.state.hexes[index].graph.web.web[nodeIndex];
          const nodeString = `Node ${nodeIndex}\n${node.text}
          Encounter: ${node.encounter}
          TL 1 Scrap: ${node.tl1}
          TL 2 Scrap: ${node.tl2}
          TL 3 Scrap: ${node.tl3}
          TL 4 Scrap: ${node.tl4}
          TL 5 Scrap: ${node.tl5}
          TL 6 Scrap: ${node.tl6}`;
          pdf.text(20, 20, nodeString);
        }
      }
      
      pdf.save('campaign_map.pdf');
  }
  
  render()
  {

    return(
      <div ref={this.ref}>
      <button onClick={this.Save.bind(this)}>Save</button>
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
  constructor(size, biome)
  {
        this.size = size;
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
                      enabled: false,
                      solver: "repulsion",
                      repulsion:
                      {
                        nodeDistance: 100
                      },
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
        this.biome = biome;
        this.text = '';
        this.web.GenerateWeb(this.size, 3);
        this.web.MakeNodeConnections();
        for(let index = 0; index < Object.keys(this.web.web).length; index++)
        {
          const node = this.web.web[index];
          //const poi = biome.rollFeature();
          const salvage = this.RollSalvage();
          const encounter = GetEncounter();
          node.encounter = this.FormatEncounter(encounter, biome);

          node.tl1 = salvage[0];
          node.tl2 = salvage[1];
          node.tl3 = salvage[2];
          node.tl4 = salvage[3];
          node.tl5 = salvage[4];
          node.tl6 = salvage[5];
          node.advancedSalvage = this.RollAdvancedSalvage();
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
    RollSalvage()
    {
      let techLevel = 1;
      const techRoll = Math.floor(Math.random()*100);
      if(techRoll > 50 && techRoll < 75)
      {
        techLevel = 2;
      }
      else if(techRoll >= 75 && techRoll < 85)
      {
        techLevel = 3;
      }
      else if(techRoll >= 85 && techRoll < 95)
      {
        techLevel = 4;
      }
      else if(techRoll >= 95 && techRoll < 99)
      {
        techLevel = 5;
      }
      else if(techRoll >= 99)
      {
        techLevel = 6;
      }
      let salvage = [0, 0, 0, 0, 0, 0];
      for(let tech = 0; tech < techLevel; tech++)
      {
        const scrapAmount = Math.floor(Math.random()*15)+1;
        salvage[tech] = scrapAmount;
      }

      return salvage;
    }
    RollAdvancedSalvage()
    {
      let techLevel = 1;
      const techRoll = Math.floor(Math.random()*100);
      if(techRoll > 50 && techRoll < 75)
      {
        techLevel = 2;
      }
      else if(techRoll >= 75 && techRoll < 85)
      {
        techLevel = 3;
      }
      else if(techRoll >= 85 && techRoll < 95)
      {
        techLevel = 4;
      }
      else if(techRoll >= 95 && techRoll < 99)
      {
        techLevel = 5;
      }
      else if(techRoll >= 99)
      {
        techLevel = 6;
      }
      let advancedSalvage = "None";
      if(Math.floor(Math.random()*100) < 10)
      {
        advancedSalvage = RollSystemOrModule(techLevel);
      }
      return advancedSalvage;
    }
    FormatEncounter(encounter, biome)
    {
      let returnString = `${encounter.type}`;
      if(encounter.type == 'Combat')
      {
        returnString += `\nMechs: ${encounter.content.Mechs}, Drones: ${encounter.content.Drones}, Vehicles: ${encounter.content.Vehicles}, People: ${encounter.content.People}`;
      }
      else if(encounter.type == 'Social')
      {
        returnString += `\n${encounter.content.type} need ${encounter.content.need}`;
      }
      else if(encounter.type == 'Environmental')
      {

        //returnString += `\nRelated to feature`;
        returnString += `\n${biome.rollEnvironmentalEncounter()}`;
      }
      return returnString;
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
