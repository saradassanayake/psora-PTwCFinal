import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDtbPICrsVz5mBs7XIuGdGJ4WqELORQElk",
  authDomain: "psora-9110d.firebaseapp.com",
  databaseURL: "https://psora-9110d-default-rtdb.firebaseio.com",
  projectId: "psora-9110d",
  storageBucket: "psora-9110d.firebasestorage.app",
  messagingSenderId: "671697488457",
  appId: "1:671697488457:web:875c8978b37473782acd98",
  measurementId: "G-MYWGV7MS1S"
};

const appFb = initializeApp(firebaseConfig);
const db = getDatabase(appFb);
const canvasRef = ref(db, 'psora/canvas');


//Information/data elements:
const pctNum = document.getElementById('pctNum');
const stressNum = document.getElementById('stressNum');
const stressLabel = document.getElementById('stressLabel');
//Level labels
const stressLabels = { 0:'', 1:'Minimal', 2:'Mild', 3:'Moderate', 4:'High', 5:'Severe' };
const stressColors = {
  0:'var(--muted)', 1:'var(--level-1)', 2:'var(--level-2)',
  3:'var(--level-3)', 4:'var(--level-4)', 5:'var(--level-5)'
};

//Empty if no input
let firstDataReceived = false;

function update(data) {
  if (!data) return;

  if (!firstDataReceived) firstDataReceived = true;

  const pct = data.percentage || 0;
  pctNum.textContent = pct.toFixed(1);

  const level = data.stressLevel || 0;
  window.currentStressLevel = level;
  stressNum.textContent = level === 0 ? '—' : level;
  stressNum.style.color = stressColors[level];
  stressLabel.textContent = stressLabels[level];

}

onValue(canvasRef, (snapshot) => {
  update(snapshot.val());
});
