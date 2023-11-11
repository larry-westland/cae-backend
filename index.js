const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csvParser = require("csv-parser");
const multer  = require('multer');
const upload = multer({ dest: "uploads/" });
const {
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
} = require('./FakeDB')

const app = express();
app.use(cors());
const port = 3002;
const csvData = [];




app.post('/',upload.single('file'), (req, res) => {
    const uploadCSV = req.file;
    fs.createReadStream(uploadCSV.path)
    .pipe(csvParser())
    .on("data", data => {
        csvData.push(data)
    })
    .on('end', () => {
        let currentClaimTitle = "";

    let currentClaimDescription = "";

    let currentClaimId = "";

    let currentClaim = {};

    let currentArgumentTitle = "";

    let currentArgumentDescription = "";

    let currentArgument = {};

    let currentEvidenceTitle = "";

    let currentEvidenceDescription = "";

    let currentEvidence = {};

    let currentRiskRelationship = {};

    for (row of csvData) {
        if (row['CAE'] === 'C') {
            currentClaimTitle = row['Title'].trim().slice(0, 300);
            currentClaimDescription = row['Description'].trim();
            currentRiskRelationship = checkIfRRExistAndCreate(row['Lifecycle Stage(s)'], row['Asset(s)'], row['SAH(s)']);
            currentClaim = createClaim(currentClaimTitle, currentClaimDescription, currentRiskRelationship);
        } else if (row['CAE'] === 'A') {
            currentArgumentTitle = row['Title'].trim().slice(0, 300);
            currentArgumentDescription = row['Description'].trim().slice(0, 512);
            currentRiskRelationship = checkIfRRExistAndCreate(row['Lifecycle Stage(s)'], row['Asset(s)'], row['SAH(s)']);
            if (checkIfArgumentExist(currentArgumentTitle)) {
                currentArgument = getArgumentByTitle(currentArgumentTitle);

            } else {
                currentArgument = createArgument(currentArgumentTitle, currentArgumentDescription, currentRiskRelationship);
                currentClaim = updateClaim(currentClaimId, currentClaim?.arguments?.push(currentArgument));
            }

        } else if (row['CAE'] === 'E') {
            currentEvidenceTitle = row['Title'].trim().slice(0, 150);
            currentEvidenceDescription = row['Description'].trim().slice(0, 512);
            currentRiskRelationship = checkIfRRExistAndCreate(row['Lifecycle Stage(s)'], row['Asset(s)'], row['SAH(s)']);

            if (checkIfEvidenceExist(currentEvidenceTitle)) {
                currentEvidence = getEvidenceByTitle(currentEvidenceTitle);
            } else {
                currentEvidence = createEvidence(currentEvidenceTitle, currentEvidenceDescription);

                currentArgument = updateArgument(currentArgument?.id, currentArgument?.evidence?.push(currentEvidence));
            }
        }
    }
    const allClaim = getAllClaims();
    CLEAN();
    console.log(allClaim)
    res.json(allClaim);
    })

})

app.listen(port, () => {
    console.log('listening')
})