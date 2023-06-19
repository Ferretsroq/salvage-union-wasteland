import {oracles} from './oracles.js';
import { RollOnOracle } from './oracles.js';

function GetDefaultBiomes()
{
	let biomes = {};
    biomes['Plains']              = new Biome('Plains', '', '#98a138', {'Open Space': 'Low', 'Downed Mech': 'High'}, [oracles['Planets']['/Oracles/Planets/Vital/Feature']], [oracles['Custom']['plains Encounters']]);
    biomes['Ruins']               = new Biome('Ruins', '', 'gray', {'Bombed-Out Building': 'Medium', 'Empty Road': 'Low'}, [oracles['Derelicts']['/Oracles/Derelicts/Engineering/Feature'], oracles['Derelicts']['/Oracles/Derelicts/Medical/Feature'], oracles['Derelicts']['/Oracles/Derelicts/Operations/Feature'], oracles['Derelicts']['/Oracles/Derelicts/Community/Feature']], [oracles['Derelicts']['/Oracles/Derelicts/Operations/Feature']])
    biomes['Fortress']            = new Biome('Fortress', '', '#611610', {'Bunker': 'High', 'Munitions Depot': 'Very High'}, [oracles['Settlements']['/Oracles/Settlements/First_Look']], [oracles['Settlements']['/Oracles/Settlements/First_Look']])
    biomes['Mountains']           = new Biome('Mountains', '', 'brown', {'Cave': 'Low', 'Valley': 'Low'}, [oracles['Planets']['/Oracles/Planets/Rocky/Feature']], [oracles['Custom']['mountain Encounters']])
    biomes['Swamp']               = new Biome('Swamp', '', 'black', {'Irradiated Swamp': 'Low', 'Nuclear Crater': 'High'}, [oracles['Planets']['/Oracles/Planets/Tainted/Feature']], [oracles['Custom']['swamp Encounters']])
    biomes['Desert']              = new Biome('Desert', '', 'yellow', {'Waving Sands': 'Low', 'Downed Ship': 'High'}, [oracles['Planets']['/Oracles/Planets/Desert/Feature']], [oracles['Custom']['desert Encounters']])
    biomes['Forest']              = new Biome('Forest', '', 'green', {'Clearing': 'Low', 'Logging Operation': 'Medium'}, [oracles['Planets']['/Oracles/Planets/Jungle/Feature']], [oracles['Custom']['forest Encounters']])
    return biomes
}

class Biome
{
    constructor(name, description, color, poi, featureOracles, environmentalEncounterOracles)
    {
        this.name = name;
        this.description = description;
        this.color = color;
        this.poi = poi;
        this.featureOracles = featureOracles;
        this.feature = this.rollFeature();
        this.environmentalEncounterOracles = environmentalEncounterOracles;
        this.environmentalEncounter = this.rollEnvironmentalEncounter();
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
    rollEnvironmentalEncounter()
    {
        const environmentalEncounterOracle = this.environmentalEncounterOracles[Math.floor(Math.random()*this.environmentalEncounterOracles.length)];
        let result = RollOnOracle(environmentalEncounterOracle);
        while(result.startsWith('[⏵'))
        {
            result = RollOnOracle(environmentalEncounterOracle);
        }
        return result;
    }
    rollNextBiome()
    {
        const roll = Math.floor(Math.random()*100)+1;
        if(this.name == 'Plains')
        {
            if(roll <= 50)
            {
                return Biomes['Plains'];
            }
            else if(roll <= 75)
            {
                return Biomes['Mountains'];
            }
            else if(roll <= 85)
            {
                return Biomes['Forest'];
            }
            else if(roll <= 95)
            {
                return Biomes['Desert'];
            }
            else if(roll <= 96)
            {
                return Biomes['Swamp'];
            }
            else if(roll <= 98)
            {
                return Biomes['Ruins'];
            }
            else if(roll <= 100)
            {
                return Biomes['Fortress'];
            }
        }
        else if(this.name == 'Mountains')
        {
            if(roll <= 50)
            {
                return Biomes['Mountains'];
            }
            else if(roll <= 75)
            {
                return Biomes['Plains'];
            }
            else if(roll <= 85)
            {
                return Biomes['Desert'];
            }
            else if(roll <= 95)
            {
                return Biomes['Forest'];
            }
            else if(roll <= 96)
            {
                return Biomes['Swamp'];
            }
            else if(roll <= 98)
            {
                return Biomes['Ruins'];
            }
            else if(roll <= 100)
            {
                return Biomes['Fortress'];
            }
        }
        else if(this.name == 'Desert')
        {
            if(roll <= 50)
            {
                return Biomes['Desert'];
            }
            else if(roll <= 75)
            {
                return Biomes['Mountains'];
            }
            else if(roll <= 85)
            {
                return Biomes['Plains'];
            }
            else if(roll <= 95)
            {
                return Biomes['Forest'];
            }
            else if(roll <= 96)
            {
                return Biomes['Swamp'];
            }
            else if(roll <= 98)
            {
                return Biomes['Ruins'];
            }
            else if(roll <= 100)
            {
                return Biomes['Fortress'];
            }
        }
        else if(this.name == 'Forest')
        {
            if(roll <= 50)
            {
                return Biomes['Forest'];
            }
            else if(roll <= 75)
            {
                return Biomes['Swamp'];
            }
            else if(roll <= 85)
            {
                return Biomes['Plains'];
            }
            else if(roll <= 95)
            {
                return Biomes['Mountains'];
            }
            else if(roll <= 96)
            {
                return Biomes['Desert'];
            }
            else if(roll <= 98)
            {
                return Biomes['Ruins'];
            }
            else if(roll <= 100)
            {
                return Biomes['Fortress'];
            }
        }
        else if(this.name == 'Swamp')
        {
            if(roll <= 50)
            {
                return Biomes['Swamp'];
            }
            else if(roll <= 75)
            {
                return Biomes['Forest'];
            }
            else if(roll <= 85)
            {
                return Biomes['Mountains'];
            }
            else if(roll <= 95)
            {
                return Biomes['Plains'];
            }
            else if(roll <= 96)
            {
                return Biomes['Desert'];
            }
            else if(roll <= 98)
            {
                return Biomes['Ruins'];
            }
            else if(roll <= 100)
            {
                return Biomes['Fortress'];
            }
        }
        else if(this.name == 'Ruins')
        {
            if(roll <= 50)
            {
                return Biomes['Ruins'];
            }
            else if(roll <= 75)
            {
                return Biomes['Plains'];
            }
            else if(roll <= 85)
            {
                return Biomes['Desert'];
            }
            else if(roll <= 95)
            {
                return Biomes['Forest'];
            }
            else if(roll <= 96)
            {
                return Biomes['Swamp'];
            }
            else if(roll <= 98)
            {
                return Biomes['Mountains'];
            }
            else if(roll <= 100)
            {
                return Biomes['Fortress'];
            }
        }
        else if(this.name == 'Fortress')
        {
            if(roll <= 50)
            {
                return Biomes['Fortress'];
            }
            else if(roll <= 75)
            {
                return Biomes['Ruins'];
            }
            else if(roll <= 85)
            {
                return Biomes['Plains'];
            }
            else if(roll <= 95)
            {
                return Biomes['Forest'];
            }
            else if(roll <= 96)
            {
                return Biomes['Swamp'];
            }
            else if(roll <= 98)
            {
                return Biomes['Mountains'];
            }
            else if(roll <= 100)
            {
                return Biomes['Desert'];
            }
        }
        else
        {
            return Biomes['Plains'];
        }
    }
}
const Biomes = GetDefaultBiomes();


export {Biome, Biomes}