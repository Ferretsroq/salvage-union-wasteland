import {oracles} from './oracles.js';
import { RollOnOracle } from './oracles.js';

function GetDefaultBiomes()
{
	let biomes = {};
    biomes['Plains']              = new Biome('Plains', '', '#98a138', {'Open Space': 'Low', 'Downed Mech': 'High'}, [oracles['Planets']['/Oracles/Planets/Vital/Feature']])
    biomes['Ruins']               = new Biome('Ruins', '', 'gray', {'Bombed-Out Building': 'Medium', 'Empty Road': 'Low'}, [oracles['Derelicts']['/Oracles/Derelicts/Engineering/Feature'], oracles['Derelicts']['/Oracles/Derelicts/Medical/Feature'], oracles['Derelicts']['/Oracles/Derelicts/Operations/Feature'], oracles['Derelicts']['/Oracles/Derelicts/Community/Feature']])
    biomes['Fortress']            = new Biome('Fortress', '', '#611610', {'Bunker': 'High', 'Munitions Depot': 'Very High'}, [oracles['Settlements']['/Oracles/Settlements/First_Look']])
    biomes['Mountains']           = new Biome('Mountains', '', 'brown', {'Cave': 'Low', 'Valley': 'Low'}, [oracles['Planets']['/Oracles/Planets/Rocky/Feature']])
    biomes['Nothing Should Live'] = new Biome('Nothing Should Live', '', 'black', {'Irradiated Swamp': 'Low', 'Nuclear Crater': 'High'}, [oracles['Planets']['/Oracles/Planets/Tainted/Feature']])
    biomes['Desert']              = new Biome('Desert', '', 'yellow', {'Waving Sands': 'Low', 'Downed Ship': 'High'}, [oracles['Planets']['/Oracles/Planets/Desert/Feature']])
    biomes['Woods']               = new Biome('Woods', '', 'green', {'Clearing': 'Low', 'Logging Operation': 'Medium'}, [oracles['Planets']['/Oracles/Planets/Jungle/Feature']])
    return biomes
}

class Biome
{
    constructor(name, description, color, poi, featureOracles)
    {
        this.name = name;
        this.description = description;
        this.color = color;
        this.poi = poi;
        this.featureOracles = featureOracles;
        this.feature = this.rollFeature();
    }
    rollPOI()
    {
        const keys = Object.keys(this.poi);
        const roll = Math.floor(Math.random()*keys.length);
        const key = keys[roll];
        const salvage = this.poi[key];
        return {poi: key, salvage: salvage};
    }
    rollFeature()
    {
        const featureOracle = this.featureOracles[Math.floor(Math.random()*this.featureOracles.length)];
        let result = RollOnOracle(featureOracle);
        //while(result == '[⏵Descriptor + Focus](Starforged/Oracles/Core/Descriptor)')
        while(result.startsWith('[⏵'))
        {
            result = RollOnOracle(featureOracle);
        }
        return result;
    }
}
const Biomes = GetDefaultBiomes();


export {Biome, Biomes}