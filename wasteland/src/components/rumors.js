import {oracles} from './oracles.js';
import { RollOnOracle } from './oracles.js';
import chassisTypes from './chassis.json';


class Rumor
{
    constructor(hex, text, content)
    {
        this.hex = hex;
        this.text = text;
        this.content = content;
    }
    static GenerateRumor(numHexes)
    {
        let rumorText = RollOnOracle(oracles['Custom']['rumors']);
        const hex = Math.floor(Math.random()*numHexes);
        rumorText.replace('$HEX', hex.toString());
        if(rumorText.includes('$CHASSIS'))
        {
            let chassis = chassisTypes[Object.keys(chassisTypes)[Math.floor(Math.random()*Object.keys(chassisTypes).length)]];
            while(chassis.techLevel != 6)
            {
                chassis = chassisTypes[Object.keys(chassisTypes)[Math.floor(Math.random()*Object.keys(chassisTypes).length)]];
            }
            rumorText.replace('$CHASSIS', chassis.name);
            return new Rumor(hex, rumorText, chassis.name);
        }

        return new Rumor(hex, rumorText);
    }
    toString()
    {
        return this.text.replace('$HEX', this.hex.toString()).replace('$CHASSIS', this.content);
    }
}

export {Rumor};