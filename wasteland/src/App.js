import logo from './logo.svg';
import './App.css';
import {Hexagon, TiledHexagons} from 'tiled-hexagons';
import { React, Component, useRef, createRef  } from 'react';
import { NodeWeb } from './NodeMapping';
import {Network} from 'vis-network';
import Graph from 'react-vis-network-graph';
import {Biome, Biomes} from './biomes';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';




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
  }

  
  updateCounter(index)
  {
    for(let hex = 0; hex < Object.keys(this.state.hexes).length; hex++)
    {
      this.state.hexes[hex].color = this.state.hexes[hex].biome.color;
    }
    this.state.hexes[index].color = 'red';
    this.setState({hexes: this.state.hexes});
    this.setState({text: [`${this.state.hexes[index].text}`, <br/>, 'Threats:', <br/>, `${this.state.hexes[index].threats.join(', ')}`]} );
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
      this.state.subtext = this.state.activeGraph.web.web[event.nodes[0]].text.split('\n')[0].toString();
      this.state.tl1 = this.state.activeGraph.web.web[event.nodes[0]].text.split('\n')[1].toString();
      this.state.tl2 = this.state.activeGraph.web.web[event.nodes[0]].text.split('\n')[2].toString();
      this.state.tl3 = this.state.activeGraph.web.web[event.nodes[0]].text.split('\n')[3].toString();
      this.state.tl4 = this.state.activeGraph.web.web[event.nodes[0]].text.split('\n')[4].toString();
      this.state.tl5 = this.state.activeGraph.web.web[event.nodes[0]].text.split('\n')[5].toString();
      this.state.tl6 = this.state.activeGraph.web.web[event.nodes[0]].text.split('\n')[6].toString();
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
          const nodeString = `Node ${nodeIndex}\n${this.state.hexes[index].graph.web.web[nodeIndex].text}`;
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
      <div>{this.state.tl1}</div>
      <div>{this.state.tl2}</div>
      <div>{this.state.tl3}</div>
      <div>{this.state.tl4}</div>
      <div>{this.state.tl5}</div>
      <div>{this.state.tl6}</div>
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
        this.biome = biome;
        this.text = '';
        this.web.GenerateWeb(this.size, 3);
        this.web.MakeNodeConnections();
        for(let index = 0; index < Object.keys(this.web.web).length; index++)
        {
          const node = this.web.web[index];
          const poi = biome.rollFeature();
          const salvage = this.RollSalvage();
          node.text = `${poi}:`;
          for(let index = 0; index < salvage.length; index++)
          {
            node.text += `\nTL ${index+1} Scrap: ${salvage[index]}`;
          }
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
}


function App() {
  const printRef = useRef();
  const handleDownloadPdf = async () =>
  {
    const pdf = new jsPDF();
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('test.pdf');
  };
  return (
    <div ref={printRef}>
    <Grid />
    </div>
  );
}

export default App;
