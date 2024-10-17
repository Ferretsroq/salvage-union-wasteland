import biotitans from './biotitans.json'

function GetBioTitan()
{
    const titan = biotitans[Object.keys(biotitans)[Math.floor(Math.random()*Object.keys(biotitans).length)]];
    return `${titan.name}: ${titan.sp} SP/Salvage Value`;
}

export {GetBioTitan};