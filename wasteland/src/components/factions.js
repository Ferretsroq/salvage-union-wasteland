import {oracles} from './oracles.js';
import { RollOnOracle } from './oracles.js';

class Faction
{
    constructor(name, type, influence, leadership, domain, project, quirk)
    {
        this.name = name;
        this.type = type;
        this.influence = influence;
        this.leadership = leadership;
        this.domain = domain;
        this.project = project;
        this.quirk = quirk;
    }
    toString()
    {
        return `${this.name}: ${this.type}\nDomain: ${this.domain}\nLeadership: ${this.leadership}\n${this.influence} Influence\nCurrent Project: ${this.project}\n${this.quirk}`;
    }
    static GenerateFaction()
    {
        let factionType = RollOnOracle(oracles['Factions']['/Oracles/Factions/Type']).replace('⏵','');
        factionType = factionType.split(']')[0].substring(1);
        const influence = RollOnOracle(oracles['Factions']['/Oracles/Factions/Influence']);
        const leadership = RollOnOracle(oracles['Factions']['/Oracles/Factions/Leadership'])
        let factionDomain = '';
        if(factionType == 'Dominion')
        {
            factionDomain = RollOnOracle(oracles['Factions']['/Oracles/Factions/Dominion']);
        }
        else if(factionType == 'Guild')
        {
            factionDomain = RollOnOracle(oracles['Factions']['/Oracles/Factions/Guild']);
            while(factionDomain == 'Roll twice')
            {
                factionDomain = RollOnOracle(oracles['Factions']['/Oracles/Factions/Guild']);
            }
        }
        else if(factionType == 'Fringe Group')
        {
            factionDomain = RollOnOracle(oracles['Factions']['/Oracles/Factions/Fringe_Group']);
            while(factionDomain == 'Roll twice')
            {
                factionDomain = RollOnOracle(oracles['Factions']['/Oracles/Factions/Fringe_Group']);
            }
        }
        let factionProject = RollOnOracle(oracles['Factions']['/Oracles/Factions/Projects']);
        while(factionProject.includes('⏵'))
        {
            factionProject = RollOnOracle(oracles['Factions']['/Oracles/Factions/Projects']);
        }
        const nameTemplateRoll = Math.floor(Math.random()*100)+1;
        let name = '';
        if(nameTemplateRoll <= 40)
        {
            name = `${RollOnOracle(oracles['Factions']['/Oracles/Factions/Legacy'])} ${RollOnOracle(oracles['Factions']['/Oracles/Factions/Affiliation'])}`;
        }
        else if(nameTemplateRoll <= 55)
        {
            name = `${RollOnOracle(oracles['Factions']['/Oracles/Factions/Legacy'])} ${RollOnOracle(oracles['Factions']['/Oracles/Factions/Identity'])}`;
        }
        else if(nameTemplateRoll <= 70)
        {
            name = `${RollOnOracle(oracles['Factions']['/Oracles/Factions/Identity'])} of the ${RollOnOracle(oracles['Factions']['/Oracles/Factions/Legacy'])} ${RollOnOracle(oracles['Factions']['/Oracles/Factions/Affiliation'])}`;
        }
        else
        {
            name = `${RollOnOracle(oracles['Factions']['/Oracles/Factions/Affiliation'])} of the ${RollOnOracle(oracles['Factions']['/Oracles/Factions/Legacy'])} ${RollOnOracle(oracles['Factions']['/Oracles/Factions/Identity'])}`;
        }
        let factionQuirk = RollOnOracle(oracles['Factions']['/Oracles/Factions/Quirks']);
        while(factionQuirk.includes('⏵'))
        {
            factionQuirk = RollOnOracle(oracles['Factions']['/Oracles/Factions/Quirks']);
        }
        return new Faction(name, factionType, influence, leadership, factionDomain, factionProject, factionQuirk);
    }
}

export {Faction}