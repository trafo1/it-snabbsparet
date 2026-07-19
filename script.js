// IT-Snabbspåret — enkel navigation + små interaktioner

document.addEventListener("DOMContentLoaded", function () {
  // 0. Besöksstatistik (GoatCounter — gratis, GDPR-vänlig, ingen cookie-banner behövs)
  //    Kräver att kontot "itsnabbsparet" skapats på goatcounter.com (2 min).
  var gc = document.createElement("script");
  gc.async = true;
  gc.src = "https://gc.zgo.at/count.js";
  gc.setAttribute("data-goatcounter", "https://itsnabbsparet.goatcounter.com/count");
  document.body.appendChild(gc);

  // 1. Hamburgermeny på mobil
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".nav nav");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      menu.classList.toggle("open");
    });
  }

  // 2. Markera aktiv sida i menyn
  var page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav nav a").forEach(function (link) {
    if (link.getAttribute("href") === page) {
      link.classList.add("active");
    }
  });

  // 3. Klickbara checklistor ("Gör detta idag") — sparas i localStorage
  document.querySelectorAll(".check-item").forEach(function (item) {
    var key = "snabbspar:" + page + ":" + item.dataset.key;

    if (localStorage.getItem(key) === "1") {
      item.classList.add("done");
      item.querySelector(".box").textContent = "✓";
    }

    item.addEventListener("click", function () {
      var done = item.classList.toggle("done");
      item.querySelector(".box").textContent = done ? "✓" : "";
      if (done) {
        localStorage.setItem(key, "1");
      } else {
        localStorage.removeItem(key);
      }
    });
  });
});
