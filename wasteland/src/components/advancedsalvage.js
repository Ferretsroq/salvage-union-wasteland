import * as systems from './systems.json';
import * as modules from './modules.json';

function RollFromTechLevel(tl, salvageTable)
{
    return salvageTable[tl][Math.floor(Math.random()*salvageTable[tl].length)];
}

function RollSystemOrModule(tl)
{
    const roll = Math.floor(Math.random()*2)
    if(roll == 0)
    {
        return `${RollFromTechLevel(tl, systems.default)} System`;
    }
    else
    {
        return `${RollFromTechLevel(tl, modules.default)} Module`;
    }
}

export {RollSystemOrModule};