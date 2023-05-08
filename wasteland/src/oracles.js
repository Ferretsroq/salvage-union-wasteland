//import * as dataforged from './dataforged.json' assert {type: "json"};
import * as dataforged from './dataforged.json';

function RollOnOracle(oracle)
{
    const roll = Math.floor(Math.random()*100);
    let result = '';
    for(let index = 0; index < oracle.length; index++)
    {
        if(oracle[index].Floor <= roll && oracle[index].Ceiling >= roll)
        {
            result = oracle[index].Result;
        }
    }
    return result;
}

function GetOraclesFromCategory(category)
{
    let categories = [];
    for(let index = 0; index < dataforged.default["Oracle Categories"].length; index++)
    {
        categories.push(dataforged.default["Oracle Categories"][index]['$id'].replace('Starforged/Oracles/', ''));
        if(dataforged.default["Oracle Categories"][index]['$id'] == `Starforged/Oracles/${category}`)
        {
            return dataforged.default["Oracle Categories"][index].Oracles;
        }
    }
    return `Category not found. Categories: ${categories}`
}

function GetOracleInCategory(oracle, category)
{
    const oracles = GetOraclesFromCategory(category);
    let oracleNames = [];
    for(let index = 0; index < oracles.length; index++)
    {
        oracleNames.push(oracles[index]['$id'].replace(`Starforged/Oracles/${category}/${oracle}`, ''));
        if(oracles[index]['$id'] == `Starforged/Oracles/${category}/${oracle}`)
        {
            return oracles[index].Table;
        }
    }
    return `Oracle not found in ${category}. Oracles: ${oracleNames}`;
}

function FlattenOracles()
{
    let myOracles = {};
    const oracleData = dataforged.default['Oracle Categories'];
    for(let oracleType in oracleData)
    {
        if(!(oracleData[oracleType].Name in myOracles))
        {
            myOracles[oracleData[oracleType].Name] = {};
        }
        for(let oracle in oracleData[oracleType].Oracles)
        {
            if('Table' in oracleData[oracleType].Oracles[oracle])
            {
                myOracles[oracleData[oracleType].Name][oracleData[oracleType].Oracles[oracle]['$id'].substr(10)] = oracleData[oracleType].Oracles[oracle].Table;
            }
            else if('Tables' in oracleData[oracleType].Oracles[oracle])
            {
                for(let table in oracleData[oracleType].Oracles[oracle].Tables)
                {
                    if('Display name' in oracleData[oracleType].Oracles[oracle].Tables[table])
                    {
                        myOracles[oracleData[oracleType].Name][oracleData[oracleType].Oracles[oracle].Tables[table]['$id'].substr(10)] = oracleData[oracleType].Oracles[oracle].Tables[table].Table;
                    }
                    else
                    {
                        myOracles[oracleData[oracleType].Name][oracleData[oracleType].Oracles[oracle].Tables[table]['$id'].substr(10)] = oracleData[oracleType].Oracles[oracle].Tables[table].Table;
                    }
                }
            }
            else if('Oracles' in oracleData[oracleType].Oracles[oracle])
            {
                for(let nestedOracle in oracleData[oracleType].Oracles[oracle]['Oracles'])
                {
                    myOracles[oracleData[oracleType].Name][oracleData[oracleType].Oracles[oracle].Oracles[nestedOracle]['$id'].substr(10)] = oracleData[oracleType].Oracles[oracle].Oracles[nestedOracle].Table;
                }
            }
        }
        for(let category in oracleData[oracleType].Categories)
        {
            for(let oracle in oracleData[oracleType].Categories[category].Oracles)
            {
                if('Table' in oracleData[oracleType].Categories[category].Oracles[oracle])
                {
                    myOracles[oracleData[oracleType].Name][oracleData[oracleType].Categories[category].Oracles[oracle]['$id'].substr(10)] = oracleData[oracleType].Categories[category].Oracles[oracle].Table;
                }
            }
        }
    }
    return myOracles;
}

const oracles = FlattenOracles();

export {oracles, RollOnOracle};