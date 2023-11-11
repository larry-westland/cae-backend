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
    getCurrentClaim,
    saveCurrentClaim,
    getCurrentArgument,
    saveCurrentArgument,
    getCurrentEvidence,
    saveCurrentEvidence
} = require('./FakeDB')

const app = express();
app.use(cors());
app.use(express.json());
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
    for (row of csvData) {
        let currentArgument = getCurrentArgument();
        let currentClaim = getCurrentClaim();
        if (row['CAE'] === 'C') {
            const currentClaimTitle = row['Title'].trim().slice(0, 300);
            const currentClaimDescription = row['Description'].trim();
            const currentRiskRelationship = checkIfRRExistAndCreate(row['Lifecycle Stage(s)'], row['Asset(s)'], row['SAH(s)']);
            const claim = createClaim(currentClaimTitle, currentClaimDescription, currentRiskRelationship);
            saveCurrentClaim(claim);
        }else if (row['CAE'] === 'A') {
            const currentArgumentTitle = row['Title'].trim().slice(0, 300);
            const currentArgumentDescription = row['Description'].trim().slice(0, 512);
            const currentRiskRelationship = checkIfRRExistAndCreate(row['Lifecycle Stage(s)'], row['Asset(s)'], row['SAH(s)']);
            if (checkIfArgumentExist(currentArgumentTitle)) {
                const argument = getArgumentByTitle(currentArgumentTitle);
                saveCurrentArgument(argument);
            } else {
                const argument = createArgument(currentArgumentTitle, currentArgumentDescription, currentRiskRelationship);
                saveCurrentArgument(argument);
            }
            currentClaim?.arguments?.push(getCurrentArgument());
            updateClaim(currentClaim.id, currentClaim);
        }else if (row['CAE'] === 'E') {
            const currentEvidenceTitle = row['Title'].trim().slice(0, 150);
            const currentEvidenceDescription = row['Description'].trim().slice(0, 512);
            checkIfRRExistAndCreate(row['Lifecycle Stage(s)'], row['Asset(s)'], row['SAH(s)']);

            if (checkIfEvidenceExist(currentEvidenceTitle)) {
                const currentEvidence = getEvidenceByTitle(currentEvidenceTitle);
                saveCurrentEvidence(currentEvidence);
            }else {
                const currentEvidence = createEvidence(currentEvidenceTitle, currentEvidenceDescription);
                saveCurrentEvidence(currentEvidence);
            }
            currentArgument?.evidence?.push(getCurrentEvidence());
            const argument = updateArgument(currentArgument?.id, currentArgument);
            const index = currentClaim.arguments.findIndex(each => each.id === argument.id);
            currentClaim.arguments[index] = argument;
            updateClaim(currentClaim?.id, currentClaim);
        }
    }
    const allClaim = getAllClaims();
    CLEAN();
    res.json(allClaim);
    })

})

app.listen(port, () => {
    console.log('listening')
})