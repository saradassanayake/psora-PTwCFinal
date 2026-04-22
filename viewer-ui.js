window.currentStressLevel = 0; //Default is 0 (since nothing is drawn yet)

// Build the 5 task rows — each row has a task text input and a difficulty number input
var taskList = document.getElementById('taskList');
for (var i = 0; i < 5; i++) {
  var group = document.createElement('div');
  group.className = 'task-group';
  group.innerHTML =
    '<input class="task-input" type="text" placeholder="Click to type a task">' +
    '<input class="difficulty-input" type="number" min="1" max="5" placeholder="Input Difficulty 1-5" onchange="clampDifficulty(this)">';
  taskList.appendChild(group);
}

// Based on asking different llm models (claude, gemini, chatgpt) and referncing research on how stress should be managed:
// 1 (little to no Stress)
// 2 (some stress)
//3 (mild/moderate stress)
//4 (moderately high stress levels)
//5 (very high stress levels)
// The orders within the array act as a guideline for how tasks shoudl eb reordered/repositioned
var sortOrders = {
  1: [5, 4, 3, 2, 1],
  2: [4, 5, 3, 1, 2],
  3: [3, 1, 4, 2, 5],
  4: [1, 2, 3, 4, 5],
  5: [1, 2, 3, 4, 5]
};

function psoraSort() {
  var order = sortOrders[window.currentStressLevel] || [1, 2, 3, 4, 5];

  // Read all 5 tasks into a plain array
  var taskInputs = document.querySelectorAll('.task-input');
  var diffInputs = document.querySelectorAll('.difficulty-input');
  var tasks = [];
  for (var i = 0; i < 5; i++) {
    tasks.push({
      text: taskInputs[i].value,
      diff: parseInt(diffInputs[i].value) || 0
    });
  }

  // Sorting:
  tasks.sort(function(a, b) {
    var posA = order.indexOf(a.diff);
    var posB = order.indexOf(b.diff);
    if (posA === -1) posA = 999;
    if (posB === -1) posB = 999;
    return posA - posB;
  });

  // Write sorted values back into the inputs
  for (var i = 0; i < 5; i++) {
    taskInputs[i].value = tasks[i].text;
    diffInputs[i].value = tasks[i].diff || '';
  }

  document.getElementById('taskPlannerLabel').textContent = 'Task Planner (Suggested Order)';
}

function clampDifficulty(input) {
  var v = parseInt(input.value);
  input.value = isNaN(v) ? '' : Math.min(5, Math.max(1, v));
}
