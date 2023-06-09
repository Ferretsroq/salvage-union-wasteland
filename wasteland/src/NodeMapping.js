import {generatePerlinNoise} from 'perlin-noise';

function weight(arr)
{
    return [].concat(...arr.map((obj) => Array(Math.ceil(obj.weight * 100)).fill(obj))); 
}

function pick(arr)
{
    let weighted = weight(arr);
    return weighted[Math.floor(Math.random() * weighted.length)]
}

function RollNode()
{
    let feature = 'Node';
    //let result = `${Math.floor(Math.random()*100)} scrap`;
	
    return new Node(feature, '');
}



class Node
{
	constructor(nodeType = '', nodeText = '')
	{
		this.type = nodeType;
		this.text = nodeText;
		this.exits = [];
		this.id = -1;
		this.name = 'Node';
		this.encounter = '';
		this.encounterData = null;
		/*this.tl1 = 0;
		this.tl2 = 0;
		this.tl3 = 0;
		this.tl4 = 0;
		this.tl5 = 0;
		this.tl6 = 0;*/
		this.techLevel = 0;
		this.supply = 0;
		this.advancedSalvage = "";
		this.settlement = null;
		this.noiseMap = this.GenerateNoiseMap();
		
	}
	toString()
	{
		return `${this.name} ${this.id}: ${this.type}\n${this.biome.name}\n${this.text}\nExits: ${this.exits}`;
	}
	static FromJSON(inputJSON)
	{
		let node = new Node(inputJSON['type'], inputJSON['text']);
		node.exits = inputJSON['exits'];
		node.id = inputJSON['id'];
		node.name = inputJSON['name'];
		return node;
	}
	GenerateNoiseMap()
	{
		return new NoiseMap(100);
	}
}

class NoiseMap
{
	constructor(dimension)
	{
		this.dimension = dimension;
		this.array = generatePerlinNoise(dimension, dimension, {octaveCount: 6});
	}
	get(x,y)
	{
		return this.array[(y*this.dimension) + x];
	}
}

class NodeWeb
{
	constructor(connectivity = 0)
	{
		this.web = {};
		this.nextID = 0;
		this.connectivity = connectivity;
		this.graph = null; //Need to figure out how to do this in JS
	}
	AddNodeToWeb(node)
	{
		this.web[node.id] = node;
	}
	AddNode(node = null)
	{
		if(node == null)
		{
			node = RollNode();
		}
		node.id = this.nextID;
		this.nextID++;
		this.AddNodeToWeb(node);
		return node;
	}
	AddNodeFromText(nodeType = '', nodeText = '')
	{
		let node = new Node(nodeType=nodeType, nodeText=nodeText);
		node.id = this.nextID;
		this.nextID++;
		this.AddNodeToWeb(node);
	}
	RollNodeExits(nodeID=0, maxSize=1000, minSize=1)
	{
		if(Object.keys(this.web).length < maxSize)
		{
			let node = this.web[nodeID];
			let numExits = Math.floor(Math.random() * 2);
			if(Object.keys(this.web).length < minSize)
			{
				while(numExits == 0)
				{
					numExits = Math.floor(Math.random() * 2);
				}
			}
			if(numExits == 0)
			{
				return;
			}
			for(let exit = 0; exit < numExits; exit++)
			{
				let newNode = RollNode();
				newNode.id = this.nextID;
				this.nextID++;
				newNode.exits.push(nodeID);
				node.exits.push(newNode.id);
				this.AddNodeToWeb(newNode);
				this.RollNodeExits(newNode.id, maxSize, minSize);
			}
		}

	}
	GenerateWeb(maxSize = 1000, minSize = 1)
	{
		let node = this.AddNode();
		this.RollNodeExits(node.id, maxSize=maxSize, minSize=minSize);
	}
	MakeNodeConnections()
	{
		for(let nodeID = 0; nodeID < Object.keys(this.web).length; nodeID++)
		{
			if(Math.random() < this.connectivity)
			{
				let newExit = -1;
				newExit = Object.keys(this.web)[Math.floor(Math.random()*Object.keys(this.web).length)];
				if(!this.web[nodeID].exits.includes(newExit) && newExit != nodeID)
				{
					this.web[nodeID].exits.push(newExit);
					//console.log(`Adding exit ${newExit} to node ${nodeID}`);
				}
			}
		}
	}
	MakeGraph()
	{
		//TODO
	}
	ShowGraph()
	{
		//TODO
	}
	DumpJSON(filename = './web.json')
	{
		// TODO
	}
	static FromJSON(inputJSON)
	{
		let web = new NodeWeb();
		for(let nodeJSON = 0; nodeJSON < inputJSON['web'].length; nodeJSON++)
		{
			let node = Node.FromJSON(inputJSON['web'][nodeJSON]);
			web.AddNodeToWeb(node);
		}
		web.nextID = inputJSON['nextID'];
		web.connectivity = inputJSON['connectivity'];
		return web;
	}
	copyFrom(inputWeb)
	{
		// TODO
	}
	SetBiomes(givenBiomes = {}, biomeSize = 0)
	{
		// TODO
	}
	toString()
	{
		let returnString = '';
		for(let key = 0; key < Object.keys(this.web).length; key++)
		{
			returnString += `Node ${key}:\n${this.web[key]}\n---\n`;
		}
		return returnString;
	}
}
export {NodeWeb};