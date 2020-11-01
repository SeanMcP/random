// @ts-check

(async () => {
  // Code
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll("nav a");

  function displaySection() {
    let hash = location.hash.slice(1);
    if (!hash) hash = 'number'
    sections.forEach((section) => {
      if (section.id === hash) {
        section.removeAttribute("hidden");
      } else {
        section.hidden = true;
      }
    });
    navLinks.forEach((link) => {
      if (link.href.slice(link.href.indexOf("#") + 1) === hash) {
        link.setAttribute("aria-current", true);
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }
  displaySection();

  window.addEventListener("hashchange", (event) => {
    event.preventDefault();
    displaySection();
  });

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

  function randomAnimal() {
    const names = Object.keys(animals);
    const random = names[Math.floor(Math.random() * names.length)];
    return [random, animals[random]];
  }

  document.getElementById("animal-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const [name, symbol] = randomAnimal();

    document.getElementById(
      "animal-output"
    ).innerHTML = `<span aria-hidden="true">${symbol}</span>${name}`;
  });

  const { colors } = await import("./colors.js");

  function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  document.getElementById("color-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const color = randomColor();
    const output = document.getElementById("color-output");
    output.textContent = color;
    output.style.backgroundColor = color.replace(/\ /g, "");
  });

  document
    .getElementById("groups-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const fd = new FormData(event.target);
      const number = parseInt(fd.get("number"));
      const record = {};
      const groupNames = [];

      for (let i = 0; i < number; i++) {
        let color = randomColor();
        while (record[color]) {
          color = randomColor();
        }
        record[color] = true;

        let animal = randomAnimal()[0];
        while (record[animal]) {
          animal = randomAnimal()[0];
        }
        record[animal] = true;

        groupNames.push([color, animal]);
      }

      const { pluralize } = await import("./pluralize.js");

      document.getElementById("groups-output").innerHTML = groupNames
        .map(
          ([color, animal]) =>
            `<div class="group">
            <span class="group__color text-outline" style="color: ${color.replace(
              /\ /g,
              ""
            )}">
              ${color}
            </span>
            <span class="group__animal">${pluralize(animal, 2, false)}</span>
            <span aria-hidden="true" class="group__emoji" role="img">${
              animals[animal]
            }</span>
          </div>`
        )
        .join("");
    });
})();
