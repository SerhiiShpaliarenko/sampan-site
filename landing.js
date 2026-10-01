/* Anchor navigation and product links work without JavaScript. */
const dialog = document.querySelector("#info-dialog");
const content = document.querySelector("#dialog-content");
let lastTrigger;
if (typeof dialog.showModal === "function") {
  document.querySelector(".info-pages").hidden = true;
  for (const link of document.querySelectorAll("[data-dialog]")) {
    link.addEventListener("click", (event) => {
      const source = document.getElementById(link.dataset.dialog);
      if (!source) return;
      event.preventDefault();
      lastTrigger = link;
      const copy = source.cloneNode(true);
      copy.removeAttribute("id");
      copy.querySelector("h2").id = "dialog-title";
      content.replaceChildren(copy);
      dialog.showModal();
    });
  }
  dialog.addEventListener("close", () => lastTrigger?.focus());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom
    )
      dialog.close();
  });
}
