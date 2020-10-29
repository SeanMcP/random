(() => {
  // Code
  document.getElementById("number-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const min = parseFloat(fd.get("number-min"));
    const max = parseFloat(fd.get("number-max"));
    document.getElementById("number-output").textContent = Math.floor(
      min + Math.random() * (max + 1 - min)
    );
  });
  document
    .getElementById("animal-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const { animals } = await import("./animals.js");
      debugger;
      const names = Object.keys(animals);
      const random = names[Math.floor(Math.random() * names.length)];

      document.getElementById(
        "animal-output"
      ).innerHTML = `<span aria-hidden="true">${animals[random]}</span>${random}`;
    });
})();
