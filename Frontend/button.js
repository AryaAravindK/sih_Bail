document.addEventListener('DOMContentLoaded', () => {
  const Offense = ['Murder', 'Rape', 'Kidnapping', 'Robbery', 'Attempt to Murder', 'Criminal Conspiracy', 'Assault', 'Defamation', 'Trespass', 'Forgery', 'Cheating', 'Counterfeiting', 'Criminal Breach of Trust', 'Voluntarily Causing Hurt', 'Public Nuisance', 'Rioting', 'Theft', 'Criminal Intimidation', 'Adultery', 'Obscenity'];
  const Health_Condition = ['Asthma', 'Diabetes', 'Heart Disease', 'Hypertension', 'Arthritis', 'Kidney Failure', 'Cancer', 'Allergies', 'Epilepsy', 'Depression', 'Chronic Fatigue Syndrome', 'Multiple Sclerosis', "Parkinson's Disease", "Alzheimer's Disease", 'Lupus', 'Psoriasis', 'Tuberculosis', 'HIV/AIDS', 'Cystic Fibrosis', 'Fibromyalgia'];

  const colorButtons = document.getElementById('color-buttons');
  const collectionButtons = document.getElementById('collection-buttons');
  const selectedOffensesPreview1 = document.getElementById('selected-offenses-preview1');
  const selectedHealthPreview1 = document.getElementById('selected-health-preview1');
  
  const selectedOffensesPreview2 = document.getElementById('selected-offenses-preview2');
  const selectedHealthPreview2 = document.getElementById('selected-health-preview2');

  // Create offense buttons
  Offense.forEach(offense => {
      const button = document.createElement('div');
      button.classList.add('button');
      button.textContent = offense;
      button.addEventListener('click', () => toggleSelection(button));
      colorButtons.appendChild(button);
  });

  // Create health condition buttons
  Health_Condition.forEach(condition => {
      const button = document.createElement('div');
      button.classList.add('button');
      button.textContent = condition;
      button.addEventListener('click', () => toggleSelection(button));
      collectionButtons.appendChild(button);
  });

  // Toggle selection and update the preview
  function toggleSelection(button) {
      button.classList.toggle('selected');
      updateSelectedItems();
  }

  // Update the display of selected items and preview
  function updateSelectedItems() {
      const selectedOffenses = Array.from(document.querySelectorAll('#color-buttons .button.selected'))
          .map(button => button.textContent);
      const selectedConditions = Array.from(document.querySelectorAll('#collection-buttons .button.selected'))
          .map(button => button.textContent);

      selectedOffensesPreview1.textContent = selectedOffenses.length ? selectedOffenses.join(', ') : 'None';
      selectedHealthPreview1.textContent = selectedConditions.length ? selectedConditions.join(', ') : 'None';

      // Update content2 with the same selections
      selectedOffensesPreview2.textContent = selectedOffenses.length ? selectedOffenses.join(', ') : 'None';
      selectedHealthPreview2.textContent = selectedConditions.length ? selectedConditions.join(', ') : 'None';
  }
});
