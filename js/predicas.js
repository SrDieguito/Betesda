const grid = document.getElementById("video-grid");
let videos = [];

fetch("http://localhost:3000/api/predicas")
  .then(r => r.json())
  .then(data => {
    videos = data;
    render(videos);
  });

function render(list) {
  grid.innerHTML = list.map(v => `
    <div class="bg-white rounded-lg shadow p-4">
      <img src="${v.thumbnail}" class="rounded mb-3">
      <h3 class="font-semibold mb-2">${v.title}</h3>
      <iframe
        class="w-full aspect-video rounded"
        src="https://www.youtube.com/embed/${v.id}"
        allowfullscreen>
      </iframe>
    </div>
  `).join("");
}
