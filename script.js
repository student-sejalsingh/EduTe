const questions = [
  { q: 'What is Deadlock in Operating System?', a: 'A condition where a set of processes are blocked because each process holds a resource and waits for another resource.' },
  { q: 'What is a process in an operating system?', a: 'A process is an instance of a running program with its own state and allocated resources.' },
  { q: 'What is virtual memory?', a: 'Virtual memory is an abstraction that uses disk space to extend apparent RAM, allowing each process to have its own address space.' }
];

let current = 0;
let solved = 0, correct = 0, wrong = 0;

function $(id) { return document.getElementById(id); }

function render() {
  const questionText = $('questionText');
  const answerText = $('answerText');
  const qProgress = $('qProgress');
  const showAnswerBtn = $('showAnswerBtn');
  const correctBtn = $('correctBtn');
  const wrongBtn = $('wrongBtn');
  const restartBtn = $('restartBtn');

  if (current >= questions.length) {
    // Show summary
    questionText.innerText = 'Session completed 🎉';
    answerText.style.display = 'block';
    answerText.innerText = `You solved ${solved} question(s): ${correct} correct, ${wrong} wrong.`;
    qProgress.innerText = `Completed`;
    showAnswerBtn.style.display = 'none';
    correctBtn.style.display = 'none';
    wrongBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
    updateStats();
    return;
  }

  qProgress.innerText = `Question ${current + 1} of ${questions.length}`;
  questionText.innerText = `Q. ${questions[current].q}`;
  answerText.style.display = 'none';
  answerText.innerText = questions[current].a;
  showAnswerBtn.style.display = 'inline-block';
  correctBtn.style.display = 'inline-block';
  wrongBtn.style.display = 'inline-block';
  restartBtn.style.display = 'none';
  updateStats();
}

function updateStats() {
  $('solvedCount').innerText = solved;
  $('correctCount').innerText = correct;
  $('wrongCount').innerText = wrong;
}

function toggleAnswer() {
  const answerText = $('answerText');
  answerText.style.display = (answerText.style.display === 'none' || !answerText.style.display) ? 'block' : 'none';
}

function mark(isCorrect) {
  solved++;
  if (isCorrect) correct++; else wrong++;
  current++;
  render();
}

function restart() {
  current = 0; solved = 0; correct = 0; wrong = 0;
  render();
}

// Wire up events after DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const showAnswerBtn = $('showAnswerBtn');
  const correctBtn = $('correctBtn');
  const wrongBtn = $('wrongBtn');
  const restartBtn = $('restartBtn');

  showAnswerBtn.addEventListener('click', toggleAnswer);
  correctBtn.addEventListener('click', () => mark(true));
  wrongBtn.addEventListener('click', () => mark(false));
  restartBtn.addEventListener('click', restart);

  // Initial render
  render();
});
