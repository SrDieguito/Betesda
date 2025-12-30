function ajustarHeader() {
  const header = document.querySelector("#header-placeholder header");
  if (!header) return;

  document.body.style.paddingTop = header.offsetHeight + "px";
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(ajustarHeader, 100);
  window.addEventListener("resize", ajustarHeader);
});
