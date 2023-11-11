let allRiskRelationships = [];
let allArguments = [];
let allEvidences = [];
let allClaims = [];
let currentClaim = {};
let currentArgument = {};
let currentEvidence = {};

// **********RR**********
function checkIfRRExistAndCreate(lcpTitle, assetTitle, sahTitle) {
    let relationship = allRiskRelationships.filter(
        each => each.sahTitle === sahTitle &&
            each.assetTitle === assetTitle &&
            each.lcpTitle === lcpTitle)
    if (relationship.length === 0){
        const rrToCreate = {
            id: allRiskRelationships.length + 1,
            sahTitle: sahTitle,
            assetTitle: assetTitle,
            lcpTitle: lcpTitle,
        }
        allRiskRelationships.push(rrToCreate)
        return rrToCreate;
    }
    return  relationship[0];
}

// **********Claim**********
function getAllClaims() {
    return allClaims;
}

function createClaim(title, description, riskRelationship) {
    const claimToCreate = {
        id: allClaims.length + 1,
        title: title,
        description: description,
        riskRelationship: riskRelationship,
        arguments: []
    }
    allClaims.push(claimToCreate);
    return claimToCreate;
}

function updateClaim(id, claim){
    let index = allClaims.find(each => each?.id === id);
    allClaims[index] = claim;
    currentClaim = claim;
    return allClaims[index];
}

function getCurrentClaim(){
    return currentClaim;
}

function saveCurrentClaim(claim){
    currentClaim = claim;
    return currentClaim;
}

// **********Argument**********
function getArgumentByTitle(title){
    return allArguments.find(each => each?.title === title);
}

function createArgument(title, description, riskRelationship) {
    const argumentToCreate = {
        id: allArguments.length + 1,
        title: title,
        description: description,
        riskRelationship: riskRelationship,
        evidence: [],
    }
    allArguments.push(argumentToCreate);
    return argumentToCreate;
}

function updateArgument(id, argument){
    let index = allArguments.find(each => each?.id === id);
    allArguments[index] = argument;
    return allArguments[index];
}

function checkIfArgumentExist(title){
    return allArguments.filter(each => each?.title === title).length > 0;
}

function getCurrentArgument(){
    return currentArgument;
}

function saveCurrentArgument(argument){
    currentArgument = argument;
    return currentArgument;
}

// **********Evidence**********
function getEvidenceByTitle(title){
    return allEvidences.find(each => each?.title === title);
}

function checkIfEvidenceExist(title){
    return allEvidences.filter(each => each?.title === title).length > 0;
}

function createEvidence(title, description){
    const evidenceToCreate = {
        id: allEvidences.length + 1,
        title: title,
        description: description,
    }
    allEvidences.push(evidenceToCreate);
    return evidenceToCreate;
}

function getCurrentEvidence(){
    return currentEvidence;
}

function saveCurrentEvidence(evidence){
    currentEvidence = evidence;
    return currentEvidence;
}


function CLEAN(){
    allRiskRelationships = [];
    allArguments = [];
    allEvidences = [];
    allClaims = [];
    currentClaim = {};
    currentArgument = {};
    currentEvidence = {};
}

module.exports = {
    getAllClaims,
    createClaim,
    createArgument,
    checkIfRRExistAndCreate,
    checkIfArgumentExist,
    getArgumentByTitle,
    checkIfEvidenceExist,
    createEvidence,
    getEvidenceByTitle,
    updateClaim,
    updateArgument,
    CLEAN,
    getCurrentClaim,
    saveCurrentClaim,
    getCurrentArgument,
    saveCurrentArgument,
    getCurrentEvidence,
    saveCurrentEvidence
}