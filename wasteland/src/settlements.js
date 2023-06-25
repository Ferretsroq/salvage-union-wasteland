import {oracles} from './oracles.js';
import { RollOnOracle } from './oracles.js';

const nameOracle = oracles['Settlements']['/Oracles/Settlements/Name'];
const projectsOracle = oracles['Settlements']['/Oracles/Settlements/Projects'];
const troubleOracle = oracles['Settlements']['/Oracles/Settlements/Trouble'];
const authorityOracle = oracles['Settlements']['/Oracles/Settlements/Authority'];
const populationOracle = oracles['Settlements']['/Oracles/Settlements/Population/Expanse'];




class Settlement
{
    constructor(name, population, project0, project1, trouble, authority)
    {
        this.name = name;
        this.population = population;
        this.project0 = project0;
        this.project1 = project1;
        this.trouble = trouble;
        this.authority = authority;
    }
    static GenerateSettlement()
    {
        const name = RollOnOracle(nameOracle);
        let project0 = RollOnOracle(projectsOracle);
        while(project0.includes('[⏵'))
        {
            project0 = RollOnOracle(projectsOracle);
        }
        let project1 = RollOnOracle(projectsOracle);
        while(project1.includes('[⏵'))
        {
            project1 = RollOnOracle(projectsOracle);
        }
        let trouble = RollOnOracle(troubleOracle);
        while(trouble.includes('[⏵'))
        {
            trouble = RollOnOracle(troubleOracle);
        }
        const authority = RollOnOracle(authorityOracle);
        const population = RollOnOracle(populationOracle);
        return new Settlement(name, population, project0, project1, trouble, authority);
    }
    toString()
    {
        return `${this.name}\nPopulation: ${this.population}\nProjects: ${this.project0}, ${this.project1}\nTrouble: ${this.trouble}\nAuthority: ${this.authority}`;
    }
}

export {Settlement}