import logo from './logo.svg';
import './App.css';
import {Hexagon, TiledHexagons} from 'tiled-hexagons';
import { React, Component, useRef, createRef, useEffect  } from 'react';
import { NodeWeb } from './NodeMapping';
import {Network} from 'vis-network';
import Graph from 'react-vis-network-graph';
import {Biome, Biomes} from './biomes';
import {GetEncounter, Mech, Vehicle, Drone, Person} from './encounters';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import {Text} from 'react-native';
import {RollSystemOrModule} from './advancedsalvage';
import {Settlement} from './settlements';
import {Quest} from './quests';
import {GetBioTitan} from './biotitan';
import {Rumor} from './rumors';




class Grid extends Component
{
  constructor(props)
  {
    super(props)
    this.ref = createRef();
    this.quest = Quest.GenerateQuest(30);
    this.rumors = [];
    this.canvasRef = createRef();
    for(let rumor = 0; rumor < 10; rumor++)
    {
      this.rumors.push(Rumor.GenerateRumor(30));
    }
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
      let biome = {};
      if(i == 0)
      {
        const keys = Object.keys(Biomes);
        const roll = Math.floor(Math.random()*keys.length);
        biome = Biomes[keys[roll]];
      }
      else if ((i+1)%8 == 0 && i > 7 || i == 8)
      {
        biome = this.state.hexes[(i-7)].biome.rollNextBiome();
      }
      else
      {
        biome = this.state.hexes[i-1].biome.rollNextBiome();
      }
      this.state.hexes[i] = {num: 0, biome: biome, color: biome.color, text: biome.name, graph: new NodeMap(10, biome), threats: this.RollThreats()};
    }
    this.ValidateQuest();
    this.ValidateRumors();
    this.state.hexes[0].color = 'red';
    this.state.activeGraph = this.state.hexes[0].graph;
    this.state.subtext = this.state.hexes[0].graph.text;
    this.state.text =  [`${this.state.hexes[0].text}`, <br/>, `Feature: ${this.state.hexes[0].biome.feature}`, <br/>, 'Threats:', <br/>, `${this.state.hexes[0].threats.join(', ')}`]
    this.setState({activeGraph: this.state.hexes[0].graph});
    this.setState({subtext: this.state.hexes[0].graph.text});
    this.setState({text: this.state.hexes[0].text});
    this.events = {selectNode: function(event) 
      {
        this.updateText(event);
        this.showMap(event);
      }.bind(this)};
    document.title = 'Wasteland Hex Map';
  }

  componentDidMount()
  {
    this.ctx = this.canvasRef.current.getContext('2d');
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
    if(this.ctx)
    {
      this.ctx.clearRect(0,0,100,100)
    }
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
      if(node.settlement == null)
      {
        this.state.subtext = <Text>{`
${node.text}
Encounter: ${node.encounter}
Area Tech Level: ${node.techLevel}
Area Supply: ${node.supply}
Advanced Salvage: ${node.advancedSalvage}`}</Text>
      }
      else
      {
        this.state.subtext = <Text>{`
${node.text}
Encounter: ${node.encounter}
Area Tech Level: ${node.techLevel}
Area Supply: ${node.supply}
Advanced Salvage: ${node.advancedSalvage}
\nSettlement: ${node.settlement.toString()}`}</Text>
      }



      this.setState({subtext: this.state.subtext});
    }
  }
  showMap(event)
  {
    if(event.nodes.length > 0)
    {
      const node = this.state.activeGraph.web.web[event.nodes[0]];
      const noiseMap = node.noiseMap;
      let rScale = 1;
      let gScale = 1;
      let bScale = 1;
      if(this.state.activeGraph.biome.name == 'Plains')
      {
        rScale = 152/255;
        gScale = 161/255;
        bScale = 56/255;
      }
      else if(this.state.activeGraph.biome.name == 'Fortress')
      {
        rScale = 97/255;
        gScale = 22/255;
        bScale = 16/255;
      }
      else if(this.state.activeGraph.biome.name == 'Mountains')
      {
        rScale = 165/255;
        gScale = 42/255;
        bScale = 42/255;
      }
      else if(this.state.activeGraph.biome.name == 'Desert')
      {
        bScale = 0;
      }
      else if(this.state.activeGraph.biome.name == 'Forest')
      {
        rScale = 0;
        bScale = 0;
      }
      for(let x = 0; x < node.noiseMap.dimension; x++)
      {
        for(let y = 0; y < node.noiseMap.dimension; y++)
        {
          const pixelValue = noiseMap.get(x, y);
          this.ctx.fillStyle = `rgb(${Math.floor(pixelValue*255*rScale)}, ${Math.floor(pixelValue*255*gScale)}, ${Math.floor(pixelValue*255*bScale)})`;
          this.ctx.fillRect(x, y, 1, 1);
        }
      }
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
  ValidateQuest()
  {
    for(let index = 0; index < this.quest.hexes.length; index++)
    {
      if(Object.keys(this.quest.hexes[index]).length > 0)
      {
        if(this.quest.hexes[index].detail == "combat")
        {
          let encounter = GetEncounter();
          while(encounter.type != "Combat")
          {
            encounter = GetEncounter();
          }
          const hexNum = parseInt(this.quest.hexes[index].hex);
          const node = this.state.hexes[hexNum].graph.web.web[Math.floor(Math.random()*Object.keys(this.state.hexes[hexNum].graph.web.web).length)];
          node.encounter += `\n---\nQUEST ENCOUNTER\n---\n${NodeMap.FormatEncounter(encounter, this.state.hexes[hexNum].biome)}`;
        }
        else if(this.quest.hexes[index].detail == "data cache")
        {
          const hexNum = parseInt(this.quest.hexes[index].hex);
          const node = this.state.hexes[hexNum].graph.web.web[Math.floor(Math.random()*Object.keys(this.state.hexes[hexNum].graph.web.web).length)];
          node.encounter += `\n---\nQUEST ENCOUNTER\n---\nData Cache related to quest`;
        }
        else if(this.quest.hexes[index].detail == "bad place data cache")
        {
          const hexNum = parseInt(this.quest.hexes[index].hex);
          const node = this.state.hexes[hexNum].graph.web.web[Math.floor(Math.random()*Object.keys(this.state.hexes[hexNum].graph.web.web).length)];
          const options = ["roving bandits", "a Bio-Titan", "a warlord that has claimed this territory"];
          const option = options[Math.floor(Math.random()*options.length)];
          node.encounter += `\n---\nQUEST ENCOUNTER\n---\nData Cache related to quest, protected by ${option}\n`;
          if(option == "roving bandits" || option == "a warlord that has claimed this territory")
          {
            let encounter = GetEncounter();
            while(encounter.type != "Combat")
            {
              encounter = GetEncounter();
            }
            node.encounter += `${NodeMap.FormatEncounter(encounter, this.state.hexes[hexNum].biome)}\n`;
          }
          else if(option == "a Bio-Titan")
          {
            node.encounter += `${GetBioTitan()}\n`;
          }
        }
      }
    }
    if(this.quest.goal.includes("bio-titan"))
    {
      const hexGoal = Math.floor(Math.random()*30);
      this.quest.hexGoal = hexGoal;
      const node = this.state.hexes[hexGoal].graph.web.web[Math.floor(Math.random()*Object.keys(this.state.hexes[hexGoal].graph.web.web).length)];
      node.encounter += `\n---\nQUEST END GOAL\n---\nBIO TITAN ${GetBioTitan()}\n`;
    }
    else if(this.quest.goal.includes("treasure map"))
    {
      const hexGoal = Math.floor(Math.random()*30);
      this.quest.hexGoal = hexGoal;
      const node = this.state.hexes[hexGoal].graph.web.web[Math.floor(Math.random()*Object.keys(this.state.hexes[hexGoal].graph.web.web).length)];
      node.encounter += `\n---\nQUEST END GOAL\n---\nTreasure Trove containing:\n${RollSystemOrModule(6)}\n${RollSystemOrModule(6)}\n${RollSystemOrModule(6)}\n${RollSystemOrModule(5)}\n${RollSystemOrModule(5)}\n${RollSystemOrModule(5)}\n${Math.floor(Math.random()*100)+10} TL1 Scrap\n${Math.floor(Math.random()*100)+10} TL2 Scrap\n${Math.floor(Math.random()*100)+10} TL3 Scrap\n${Math.floor(Math.random()*50)+10} TL4 Scrap\n${Math.floor(Math.random()*20)+10} TL5 Scrap\n${Math.floor(Math.random()*10)+10} TL6 Scrap\n`;
    }
    else if(this.quest.goal.includes("great TL 6 machine"))
    {
      let hexGoals = [];
      for(let goal = 0; goal < 5; goal++)
      {
        let hex = Math.floor(Math.random()*30);
        while(hexGoals.includes(hex))
        {
          hex = Math.floor(Math.random()*30);
        }
        hexGoals.push(hex);
      }
      this.quest.hexGoal = hexGoals;
      for(let goal = 0; goal < this.quest.hexGoal.length; goal++)
      {
        const node = this.state.hexes[this.quest.hexGoal[goal]].graph.web.web[Math.floor(Math.random()*Object.keys(this.state.hexes[this.quest.hexGoal[goal]].graph.web.web).length)];
        node.encounter += `\n---\nQUEST GOAL\n---\nA piece of the great machine is here.\n`
      }
    }
    else if(this.quest.goal.includes("A warlord has set up shop"))
    {
      const hexGoal = Math.floor(Math.random()*30);
      this.quest.hexGoal = hexGoal;
      const node = this.state.hexes[hexGoal].graph.web.web[Math.floor(Math.random()*Object.keys(this.state.hexes[hexGoal].graph.web.web).length)];
      node.encounter += `\n---\nQUEST END GOAL\n---\nWarlord base, or centerpiece of their master plan.\n`;
    }
  }

  ValidateRumors()
  {
    for(let rumor = 0; rumor < this.rumors.length; rumor++)
    {
      const node = this.state.hexes[this.rumors[rumor].hex].graph.web.web[Math.floor(Math.random()*Object.keys(this.state.hexes[this.rumors[rumor].hex].graph.web.web).length)];
      if(this.rumors[rumor].text.includes('buried'))
      {
        node.advancedSalvage = `${this.rumors[rumor].content} Chassis`
      }
      else if(this.rumors[rumor].text.includes('battle'))
      {
        node.supply += 10;
      }
      else if(this.rumors[rumor].text.includes('new warlord'))
      {
        let encounter = GetEncounter();
        while(encounter.type != 'Combat')
        {
          encounter = GetEncounter();
        }
        node.encounter += `\n ${NodeMap.FormatEncounter(encounter, this.state.hexes[this.rumors[rumor].hex].biome)}`;
      }
      else if(this.rumors[rumor].text.includes('new settlement'))
      {
        node.settlement = Settlement.GenerateSettlement();
      }
    }
  }

  async Save()
  {
      const pdf = new jsPDF();
      const element = this.ref.current;
      const readmeText = "The overall hex map represents a campaign map.\nIndividual hexes represent a region map.\nIndividual nodes within the hexes represent an area map.\nRegions have an associated biome, threats, and map of areas.\nAs a potential campaign seed, this document includes a pregenerated multi-step quest tied to the map.\nThis document also includes 10 smaller rumors of points of interest seeded around the map.\nThis document is intended to be used in something like OneNote or similar annotation program, or printed for note-taking.\nAs always, feel free to change anything generated to better suit your game!";
      const splitReadme = pdf.splitTextToSize(readmeText, 180);
      pdf.text(20, 20, splitReadme);
      pdf.addPage();
      const questText = this.quest.toString();
      const splitQuest = pdf.splitTextToSize(questText, 180);
      const rumorsText = this.rumors.join('\n');
      const splitRumors = pdf.splitTextToSize(rumorsText, 180);
      pdf.text(20, 20, splitQuest);
      pdf.addPage();
      pdf.text(20, 20, splitRumors);
      for(let index = 0; index < 30; index++)
      { 
        for(let hex = 0; hex < 30; hex++)
        {
          this.state.hexes[hex].color = this.state.hexes[hex].biome.color;
        }
        this.state.hexes[index].color = 'red';
        this.setState({hexes: this.state.hexes});
        this.setState({text: [`${this.state.hexes[index].text}`, <br/>, `Feature: ${this.state.hexes[0].biome.feature}`, <br/>, 'Threats:', <br/>, `${this.state.hexes[index].threats.join(', ')}`]} );
        this.setState({activeGraph: this.state.hexes[index].graph});
        this.setState({subtext: ''});
        if(this.ctx)
        {
          this.ctx.clearRect(0,0,100,100)
        }
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
          const noiseMap = node.noiseMap;
          let rScale = 1;
          let gScale = 1;
          let bScale = 1;
          if(this.state.activeGraph.biome.name == 'Plains')
          {
            rScale = 152/255;
            gScale = 161/255;
            bScale = 56/255;
          }
          else if(this.state.activeGraph.biome.name == 'Fortress')
          {
            rScale = 97/255;
            gScale = 22/255;
            bScale = 16/255;
          }
          else if(this.state.activeGraph.biome.name == 'Mountains')
          {
            rScale = 165/255;
            gScale = 42/255;
            bScale = 42/255;
          }
          else if(this.state.activeGraph.biome.name == 'Desert')
          {
            bScale = 0;
          }
          else if(this.state.activeGraph.biome.name == 'Forest')
          {
            rScale = 0;
            bScale = 0;
          }
          for(let x = 0; x < node.noiseMap.dimension; x++)
          {
            for(let y = 0; y < node.noiseMap.dimension; y++)
            {
              const pixelValue = noiseMap.get(x, y);
              this.ctx.fillStyle = `rgb(${Math.floor(pixelValue*255*rScale)}, ${Math.floor(pixelValue*255*gScale)}, ${Math.floor(pixelValue*255*bScale)})`;
              this.ctx.fillRect(x, y, 1, 1);
            }
          }
          const submapData = this.canvasRef.current.toDataURL('image/jpeg');
          pdf.addImage(submapData, 'JPEG', 175, 0, node.noiseMap.dimension/4, node.noiseMap.dimension/4);
          let nodeString = `Node ${nodeIndex}\n${node.text}
Encounter: ${node.encounter}
Area Tech Level: ${node.techLevel}
Area Supply: ${node.supply}`;
          if(node.settlement != null)
          {
            nodeString += `\n\nSettlement: ${node.settlement.toString()}`;
          }
          const splitStrings = pdf.splitTextToSize(nodeString, 180);
          if(splitStrings.length > 40)
          {
            pdf.text(20, 20, splitStrings.slice(0,40));
            pdf.addPage();
            pdf.text(20, 20, splitStrings.slice(40, splitStrings.length));
          }
          else
          {
            pdf.text(20, 20, splitStrings);
          }
          
        }
      }
      
      pdf.save('campaign_map.pdf');
  }
  
  render()
  {
    return(
      <div>
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
    <canvas ref={this.canvasRef} width="100" height="100"/>
      </div>
      <div><Text style={{fontWeight: "bold"}}>{'Rumors\n'}</Text><Text>{this.rumors.join('\n')}</Text></div>
      <div><Text style={{fontWeight: "bold"}}>{'Quest\n'}</Text><Text>{this.quest.toString()}</Text></div>
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
                    dragView: false,
                    zoomView: false
                  }};
        this.biome = biome;
        this.text = '';
        this.web.GenerateWeb(this.size, 5);
        this.web.MakeNodeConnections();
        for(let index = 0; index < Object.keys(this.web.web).length; index++)
        {
          const node = this.web.web[index];
          //const poi = biome.rollFeature();
          const salvage = this.RollSalvage();
          const encounter = GetEncounter();
          node.encounter = NodeMap.FormatEncounter(encounter, biome);
          const settlementRoll = Math.floor(Math.random()*100)+1;
          if(settlementRoll <= 10)
          {
            node.settlement = Settlement.GenerateSettlement();
          }
          /*node.tl1 = salvage[0];
          node.tl2 = salvage[1];
          node.tl3 = salvage[2];
          node.tl4 = salvage[3];
          node.tl5 = salvage[4];
          node.tl6 = salvage[5];*/
          node.techLevel = salvage.tl;
          node.supply = salvage.supply;
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
      /*let salvage = [0, 0, 0, 0, 0, 0];
      for(let tech = 0; tech < techLevel; tech++)
      {
        const scrapAmount = Math.floor(Math.random()*15)+1;
        salvage[tech] = scrapAmount;
      }*/
      const supply = Math.floor(Math.random()*6)+1;
      const salvage = {tl: techLevel, supply: supply};

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
    static FormatEncounter(encounter, biome)
    {
      let returnString = `${encounter.type}`;
      if(encounter.type == 'Combat')
      {
        returnString += `\nMechs: ${encounter.content.Mechs}, Drones: ${encounter.content.Drones}, Vehicles: ${encounter.content.Vehicles}, People: ${encounter.content.People}`;
        for(let mech = 0; mech < encounter.content.Mechs; mech++)
        {
          returnString += `\nMech ${mech+1}: ${Mech.GenerateMech().toString()}\n---`;
        }
        for(let vehicle = 0; vehicle <  encounter.content.Vehicles; vehicle++)
        {
          returnString += `\nVehicle ${vehicle+1}: ${Vehicle.GenerateVehicle().toString()}\n---`;
        }
        for(let drone = 0; drone < encounter.content.Drones; drone++)
        {
          returnString += `\nDrone ${drone+1}: ${Drone.GenerateDrone().toString()}\n---`;
        }
        for(let person = 0; person < encounter.content.People; person++)
        {
          returnString += `\nPerson ${person+1}: ${Person.GeneratePerson().toString()}\n---`;
        }
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
      returnString += `\n\n`;
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
