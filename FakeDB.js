let allRiskRelationships = [];
let allArguments = [];
let allEvidences = [];
let allClaims = [];
let allAssets = [];
let allLCPs = [];
let allSahs = [];

// **********LCP**********
function getAllLCP() {
    return allAsset;
}

function checkAndCreateLCP(lcp) {
    if (!allLCPs.includes(lcp)) {
        allLCPs.push(lcp);
    }
    return allLCPs;
}


// **********Asset**********
function getAllAsset() {
    return allAssets;
}

function checkAndCreateAllAsset(asset) {
    if (!allAssets.includes(asset)) {
        allAssets.push(asset);
    }
    return allAssets;
}

// **********SAH**********
function getAllSAH() {
    return allSahs;
}

function checkAndCreateAllSAH(sah) {
    if (!allSahs.includes(sah)) {
        allSahs.push(sah);
    }
    return allSahs;
}

// **********RR**********
function getAllRiskRelationship() {
    return allRiskRelationships;
}

function checkIfRRExistAndCreate(lcpTitle, assetTitle, sahTitle) {
    if (allRiskRelationships
        .filter(
            each => each.sahTitle === sahTitle &&
                each.assetTitle === assetTitle &&
                each.lcpTitle === lcpTitle).length === 0) {
        const rrToCreate = {
            id: allRiskRelationships.length + 1,
            sahTitle: sahTitle,
            assetTitle: assetTitle,
            lcpTitle: lcpTitle,
        }
        allRiskRelationships.push(rrToCreate)
        return rrToCreate;
    }
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
    let index = allClaims.findIndex(each => each?.id === id);
    allClaims[index] = claim;
    return allClaims[index];
}

// **********Argument**********
function getAllArguments(){
    return allArguments;
}

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
    let index = allArguments.findIndex(each => each?.id === id);
    allArguments[index] = argument;
    return allArguments[index];
}

function checkIfArgumentExist(title){
    return allArguments.filter(each => each?.title === title).length > 0;
}
// **********Evidence**********
function getAllEvidence(){
    return allEvidences;
}

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

function CLEAN(){
    allArguments = [];
    allAssets = [];
    allClaims = [];
    allEvidences = [];
    allLCPs = [];
    allRiskRelationships = [];
    allSahs = [];
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
    getAllRiskRelationship,
}