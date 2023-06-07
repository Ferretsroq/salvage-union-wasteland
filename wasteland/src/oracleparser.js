import fs from 'fs';

const structure = 
{
    "$id": "Name",
    "Table":
    [
        {
            "Floor": 1,
            "Ceiling": 1,
            "Result": "Result"
        }
        //etc.
    ]
}

for(const file in fs.readdirSync('./encounter tables').filter(file => file.endsWith('.encounters')))
{
    const encounters = fs.readFileSync(`./encounter tables/${file}`, 'utf8');
    let oracle = {"$id": `${file.split('.')[0]} Encounters`, "Table": []};
    const encounterLines = encounters.split('\n');
    for(let index = 0; index < encounterLines.length; index++)
    {
        const split = encounterLines[index].split('.');
        const number = split[0];
        const text = split[1].trim();
        const entry = {"Floor": number, "Ceiling": number, "Result": text};
        oracle.Table.push(entry);
    }
    fs.writeFileSync(`./custom/${file.split('.')[0]}.oracle`, JSON.stringify(oracle, null, 2));
}


const encounters = fs.readFileSync('./encounter tables/desert.encounters', 'utf8');
let oracle = {"$id": "Desert Encounters", "Table": []};
const encounterLines = encounters.split('\n');
for(let index = 0; index < encounterLines.length; index++)
{
    const split = encounterLines[index].split('.');
    const number = split[0];
    const text = split[1].trim();
    const entry = {"Floor": number, "Ceiling": number, "Result": text};
    oracle.Table.push(entry);
}
fs.writeFileSync('./custom/desert.oracle', JSON.stringify(oracle, null, 2));