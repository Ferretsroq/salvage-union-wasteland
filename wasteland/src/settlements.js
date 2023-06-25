import {oracles} from './oracles.js';
import { RollOnOracle } from './oracles.js';





class Settlement
{
    constructor(name, population, project0, project1, trouble, authority, npc0, npc1, npc2)
    {
        this.name = name;
        this.population = population;
        this.project0 = project0;
        this.project1 = project1;
        this.trouble = trouble;
        this.authority = authority;
        this.NPCs = [npc0, npc1, npc2];
    }
    static GenerateSettlement()
    {
        const nameOracle = oracles['Settlements']['/Oracles/Settlements/Name'];
        const projectsOracle = oracles['Settlements']['/Oracles/Settlements/Projects'];
        const troubleOracle = oracles['Settlements']['/Oracles/Settlements/Trouble'];
        const authorityOracle = oracles['Settlements']['/Oracles/Settlements/Authority'];
        const populationOracle = oracles['Settlements']['/Oracles/Settlements/Population/Expanse'];

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
        const npc0 = NPC.GenerateNPC();
        const npc1 = NPC.GenerateNPC();
        const npc2 = NPC.GenerateNPC();
        return new Settlement(name, population, project0, project1, trouble, authority, npc0, npc1, npc2);
    }
    toString()
    {
        return `${this.name}\nPopulation: ${this.population}\nProjects: ${this.project0}, ${this.project1}\nTrouble: ${this.trouble}\nAuthority: ${this.authority}\nNotable NPCs:\n${this.NPCs[0].toString()}\n---\n${this.NPCs[1].toString()}\n---\n${this.NPCs[2].toString()}`;
    }
}

class NPC
{
    constructor(name, firstLook, disposition, role, goal)
    {
        this.name = name;
        this.firstLook = firstLook;
        this.disposition = disposition;
        this.role = role;
        this.goal = goal;
    }
    static GenerateNPC()
    {
        const nameOracle = oracles['Characters']['/Oracles/Characters/Name/Given_Name'];
        const familyNameOracle = oracles['Characters']['/Oracles/Characters/Name/Family_Name'];
        const firstLookOracle = oracles['Characters']['/Oracles/Characters/First_Look'];
        const dispositionOracle = oracles['Characters']['/Oracles/Characters/Disposition'];
        const roleOracle = oracles['Characters']['/Oracles/Characters/Role'];
        const goalOracle = oracles['Characters']['/Oracles/Characters/Goal'];

        const name = `${RollOnOracle(nameOracle)} ${RollOnOracle(familyNameOracle)}`;
        const firstLook = RollOnOracle(firstLookOracle);
        const disposition = RollOnOracle(dispositionOracle);
        let role = RollOnOracle(roleOracle);
        while(role.includes('[⏵') || role.includes('Roll twice'))
        {
            role = RollOnOracle(roleOracle);
        }
        let goal = RollOnOracle(goalOracle);
        while(goal.includes('[⏵') || goal.includes('Roll twice'))
        {
            goal = RollOnOracle(goalOracle);
        }

        return new NPC(name, firstLook, disposition, role, goal);
    }
    toString()
    {
        return `${this.name}: ${this.disposition}\n${this.firstLook}\n${this.role}\nGoal: ${this.goal}`;
    }
}

export {Settlement, NPC}