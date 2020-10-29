// @ts-check

(async () => {
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

  const { animals } = await import("./animals.js");

  document.getElementById("animal-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const names = Object.keys(animals);
    const random = names[Math.floor(Math.random() * names.length)];

    document.getElementById(
      "animal-output"
    ).innerHTML = `<span aria-hidden="true">${animals[random]}</span>${random}`;
  });

  const { colors } = await import("./colors.js");

  document.getElementById("color-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const random = colors[Math.floor(Math.random() * colors.length)];

    const output = document.getElementById("color-output");
    output.textContent = random;
    output.style.backgroundColor = random.replace(/\ /g, '');
  });
})();
