// Offense data
const offenses = [
    { title: "Murder", ipcSection: "302", bailable: false },
    { title: "Rape", ipcSection: "376", bailable: false },
    { title: "Kidnapping", ipcSection: "363", bailable: false },
    { title: "Robbery", ipcSection: "392", bailable: false },
    { title: "Attempt to Murder", ipcSection: "307", bailable: false },
    { title: "Criminal Conspiracy", ipcSection: "120B", bailable: false },
    { title: "Assault", ipcSection: "351", bailable: true },
    { title: "Defamation", ipcSection: "499", bailable: true },
    { title: "Trespass", ipcSection: "441", bailable: true },
    { title: "Forgery", ipcSection: "465", bailable: true },
    { title: "Cheating", ipcSection: "420", bailable: false },
    { title: "Counterfeiting", ipcSection: "489A", bailable: false },
    { title: "Criminal Breach of Trust", ipcSection: "406", bailable: true },
    { title: "Voluntarily Causing Hurt", ipcSection: "323", bailable: true },
    { title: "Public Nuisance", ipcSection: "268", bailable: true },
    { title: "Rioting", ipcSection: "147", bailable: false },
    { title: "Theft", ipcSection: "379", bailable: true },
    { title: "Criminal Intimidation", ipcSection: "503", bailable: true },
    { title: "Adultery", ipcSection: "497", bailable: true },
    { title: "Obscenity", ipcSection: "292", bailable: true },
];

// Medical condition data
const medicalConditions = [
    { title: "Asthma", severity: 2 },
    { title: "Diabetes", severity: 3 },
    { title: "Heart Disease", severity: 5 },
    { title: "Hypertension", severity: 3 },
    { title: "Arthritis", severity: 2 },
    { title: "Kidney Failure", severity: 5 },
    { title: "Cancer", severity: 5 },
    { title: "Allergies", severity: 1 },
    { title: "Epilepsy", severity: 3 },
    { title: "Depression", severity: 2 },
    { title: "Chronic Fatigue Syndrome", severity: 4 },
    { title: "Multiple Sclerosis", severity: 5 },
    { title: "Parkinson's Disease", severity: 4 },
    { title: "Alzheimer's Disease", severity: 5 },
    { title: "Lupus", severity: 4 },
    { title: "Psoriasis", severity: 2 },
    { title: "Tuberculosis", severity: 3 },
    { title: "HIV/AIDS", severity: 5 },
    { title: "Cystic Fibrosis", severity: 4 },
    { title: "Fibromyalgia", severity: 3 },
    { title: "None", severity: 0 }
];



// Populate datalist with offenses
function populateCrimeOptions() {
    const crimeList = document.getElementById("crime-options");
    offenses.forEach(offense => {
        const option = document.createElement("option");
        option.value = offense.title + " (IPC " + offense.ipcSection + ")";
        crimeList.appendChild(option);
    });
}

document.getElementById("criminal-record").addEventListener("change", togglePastCrimeDetails);
// Toggle past-crime-details visibility based on criminal record selection
function togglePastCrimeDetails() {
    const criminalRecordSelect = document.getElementById("criminal-record");
    const pastCrimeDetailsDiv = document.getElementById("past-crime-details");
    pastCrimeDetailsDiv.style.display = criminalRecordSelect.value === "yes" ? "block" : "none";
}

// Populate datalist with medical conditions
function populateMedicalConditionOptions() {
    const medicalList = document.getElementById("medical-options");
    medicalConditions.forEach(condition => {
        const option = document.createElement("option");
        option.value = condition.title;
        medicalList.appendChild(option);
    });
}

// Call function to populate crime options when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    populateCrimeOptions();
    populateMedicalConditionOptions();
});














// Handle form submission
document.getElementById("bailForm").addEventListener("submit", function (Event) {
    Event.preventDefault();

    const crimeCommitted = document.getElementById("crime").value;
    const pastRecord = document.getElementById("criminal-record").value;
    const directInvolvement = document.getElementById("direct-involvement").value;
    const evidence = parseInt(document.getElementById("evidence").value) || 0;
    const visa = document.getElementById("visa").value;
    const foreignTies = document.getElementById("foreign-ties").value;
    const age = parseInt(document.getElementById("age").value) || 0;
    const gender = document.getElementById("gender").value;
    const medicalCondition = document.getElementById("medical-condition").value;

    const result = calculateBailProbability(
        crimeCommitted,
        pastRecord,
        directInvolvement,
        evidence,
        visa,
        foreignTies,
        age,
        gender,
        medicalCondition
    );

    document.getElementById('bail-decision').textContent = `Decision: ${result.bailDecision}`;
    document.getElementById('bail-probability').textContent = `Probability of Bail: ${result.probability}`;
    document.getElementById('bail-reason').textContent = `Reason: ${result.reason}`;
    document.getElementById('result').style.display = 'block';
});
















function calculateBailProbability(crime, pastRecord, directInvolvement, evidence, visa, foreignTies, age, gender, medicalCondition) {
    let bailScore = 0;

    // Nature of Offense
    let offenseData = offenses.find(off => off.title === crime);
    bailScore += offenseData ? (offenseData.bailable ? 10 : 3) : 0;

    // Past Criminal Record
    bailScore += pastRecord === "no" ? 10 : (pastRecord === "yes" ? (directInvolvement === "no" ? 7 : 0) : 0);

    // Visa/Passport
    bailScore += visa === "no" ? 5 : 3;

    // Foreign Ties
    bailScore += foreignTies === "no" ? 5 : 2;

    // Evidence
    bailScore += (evidence / 2);

    // Age, Gender, Medical Condition
    bailScore += (age < 18) ? 7 : (age <= 30) ? 5 : (age <= 50) ? 3 : 6;
    bailScore += (gender === "female") ? 7 : 3;
    bailScore += (medicalConditions.find(cond => cond.title === medicalCondition)?.severity || 0);

    // Determine bail probability
    let probability = bailScore / 49;
    let bailDecision = probability > 0.5 ? "Yes" : "No";
    let reason = bailDecision === "Yes" ? "The accused is likely to get bail due to the nature of the offense and other favorable conditions." : "The accused is less likely to get bail due to the serious nature of the offense and other unfavorable conditions.";

    return {
        bailScore,
        bailDecision,
        probability: (probability * 100).toFixed(2) + "%",
        reason
    };
}

