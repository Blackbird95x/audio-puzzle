const parts = ['dummy3.mp3', 'dummy1.mp3', 'dummy2.mp3']; // Start-Zustand (gemischt)
const correctOrder = ['dummy1.mp3', 'dummy2.mp3', 'dummy3.mp3'];

const container = document.getElementById('audio-container');

parts.forEach((file) => {
  const div = document.createElement('div');
  div.className = 'audio-box';
  div.draggable = true;
  div.dataset.audio = file;
  div.innerHTML = `<audio controls src="audio/${file}"></audio>`;
  div.addEventListener('dragstart', dragStart);
  div.addEventListener('dragover', e => e.preventDefault());
  div.addEventListener('drop', drop);
  container.appendChild(div);
});

let dragged;

function dragStart(e) {
  dragged = this;
}

function drop(e) {
  if (this === dragged) return;
  const parent = this.parentNode;
  parent.insertBefore(dragged, this);
}

function checkOrder() {
  const current = Array.from(container.children).map(el => el.dataset.audio);
  const result = document.getElementById('result');
  if (JSON.stringify(current) === JSON.stringify(correctOrder)) {
    result.textContent = '🎉 Richtig!';
  } else {
    result.textContent = '❌ Falsch – versuch es nochmal!';
  }
}
