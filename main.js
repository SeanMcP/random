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
})();
