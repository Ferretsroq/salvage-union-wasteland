import {oracles} from './oracles.js';
import { RollOnOracle } from './oracles.js';

class Quest
{
    constructor(goal, steps, progress, hexes)
    {
        this.goal = goal;
        this.steps = steps;
        this.progress = progress;
        this.hexes = hexes;
        this.hexGoal = -1;
    }
    static GenerateQuest(numHexes)
    {
        let steps = [];
        let hexes = [];
        for(let index = 0; index < 5; index++)
        {
            const step = RollOnOracle(oracles['Custom']['questprogress']);
            steps.push(step);
            if(step.startsWith("You've figured out where to go, and it's in the middle of enemy territory."))
            {
                hexes.push({hex: Math.floor(Math.random()*numHexes), detail: "combat"});
            }
            else if(step.startsWith("You need to find a data cache with information."))
            {
                hexes.push({hex: Math.floor(Math.random()*numHexes), detail: "data cache"});
            }
            else if(step.startsWith("You've located a data cache, but it's in a very bad place."))
            {
                hexes.push({hex: Math.floor(Math.random()*numHexes), detail: "bad place data cache"});
            }
            else if(step.startsWith("A contact is willing to help"))
            {
                hexes.push({hex: Math.floor(Math.random()*numHexes), detail: `escort to hex ${Math.floor(Math.random()*numHexes)}`});
            }
            else
            {
                hexes.push({});
            }
        }
        const goal = RollOnOracle(oracles['Custom']['questgoal']);
        return new Quest(goal, steps, 0, hexes);
    }
    toString()
    {
        let returnString = `${this.goal}\n`;
        if(this.hexGoal != -1)
        {
            returnString += `Hex ${this.hexGoal}\n`;
        }
        returnString += `Progression:`;
        for(let index = 0; index < this.steps.length; index++)
        {
            if(this.steps[index].startsWith("You've figured out where to go, and it's in the middle of enemy territory."))
            {
                returnString += `\n${index+1}) ${this.steps[index].replace('Determine a region to go to', `Go to region ${this.hexes[index].hex}`)}`
            }
            else if(this.steps[index].startsWith("You need to find a data cache with information."))
            {
                returnString += `\n${index+1}) ${this.steps[index].replace('Determine a region to house the data cache and place the cache in an area within that region.', `Go to region ${this.hexes[index].hex} and recover the cache.`)}`;
            }
            else if(this.steps[index].startsWith("You've located a data cache, but it's in a very bad place."))
            {
                returnString += `\n${index+1}) ${this.steps[index].replace('Determine a region to house the data cache and place the cache in an area within that region.', `Go to region ${this.hexes[index].hex} and recover the cache.`)}`;
            }
            else if(this.steps[index].startsWith("A contact is willing to help"))
            {
                returnString += `\n${index+1}) ${this.steps[index].replace('Determine two regions, one starting point and one ending point.', `Start at hex ${this.hexes[index].hex} and end at hex ${this.hexes[index].detail.split('hex')[1].trim()}.`)}`;
            }
            else
            {
                returnString += `\n${index+1}) ${this.steps[index]}`;
            }
            
        }
        return returnString;
    }
}
export {Quest};