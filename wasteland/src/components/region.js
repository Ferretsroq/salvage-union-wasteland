import {Biome, Biomes} from './biomes';
import { NodeWeb } from './NodeMapping';
import { Area } from './area';


class Region
{
    constructor(biome)
    {
        this.biome = biome;
        this.biome.feature = this.biome.rollFeature();
        this.generateRegionMap();
        this.areas = [];
        this.populateAreas();
        this.text = `${this.biome.name}\n${this.biome.feature}\n`;
    }
    generateRegionMap()
    {
        const num = Math.floor(Math.random()*10)+5;
        let diagram = 'flowchart TD\n';
        this.web = new NodeWeb(0.25);
        this.web.GenerateWeb(num, 5);
        this.web.MakeNodeConnections();
        for(let index = 0; index < Object.keys(this.web.web).length; index++)
        {
        
            if(this.web.web[index].exits.length > 0)
            {
                for(let exitIndex = 0; exitIndex < this.web.web[index].exits.length; exitIndex++)
                {
                    if(!diagram.includes(`${index} --- ${this.web.web[index].exits[exitIndex]}`) && ! diagram.includes(`${this.web.web[index].exits[exitIndex]} --- ${index}`))
                    {
                        diagram += `${index} --- ${this.web.web[index].exits[exitIndex]}\n`;
                    }
                }
            }
            diagram += `click ${index}\n`;
        }
        this.diagram = diagram.trim();
    }
    populateAreas()
    {
        for(let index = 0; index < Object.keys(this.web.web).length; index++)
        {
            this.areas.push(new Area(this.biome));
        }
    }
}

export {Region};