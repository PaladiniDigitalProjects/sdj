"undefined" != typeof window && document.addEventListener("DOMContentLoaded", function () {
  var all = window.PDS_TERMS_DATA || {};
  Object.keys(all).forEach(function (key) {
    var cfg = all[key];
    if (cfg) initTermsToggle(cfg);
  });

  function initTermsToggle(cfg) {
    var instance = cfg.instance;
    var restBase = cfg.rest_base;
    var perPage = parseInt(cfg.per_page, 10) || 20;
    var taxonomy = cfg.taxonomy;
    var include = cfg.include || "";
    var exclude = cfg.exclude || "";
    var strings = cfg.strings || {};
    var list = document.getElementById(instance + "-list");
    if (!list) return;

    var btn = document.getElementById(instance + "-btn");

    Array.prototype.slice.call(list.querySelectorAll(".pds-terms-item")).forEach(function (item, i) {
      if (i >= perPage) item.style.display = "none";
    });

    if (!btn) return;

    var expanded = false;
    var loaded = false;
    var busy = false;

    btn.addEventListener("click", function () {
      if (busy) return;

      if (expanded) {
        Array.prototype.slice.call(list.querySelectorAll(".pds-terms-item")).forEach(function (item, i) {
          item.style.display = i < perPage ? "" : "none";
        });
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = strings.ver_mas || "Ver más";
        expanded = false;
        return;
      }

      if (loaded) {
        Array.prototype.slice.call(list.querySelectorAll(".pds-terms-item")).forEach(function (item) {
          item.style.display = "";
        });
        btn.setAttribute("aria-expanded", "true");
        btn.textContent = strings.ver_menos || "Ver menos";
        expanded = true;
        return;
      }

      busy = true;
      btn.disabled = true;
      btn.textContent = strings.cargando || "Cargando…";

      var url = new URL(restBase);
      url.searchParams.set("taxonomy", taxonomy);
      url.searchParams.set("per_page", 0); // 0 = traer todos los que queden.
      url.searchParams.set("offset", perPage);
      if (include) url.searchParams.set("include", include);
      if (exclude) url.searchParams.set("exclude", exclude);

      fetchJson(url.toString())
        .then(function (res) {
          (res.terms || []).forEach(function (term) {
            var li = document.createElement("li");
            li.className = "pds-terms-item cat-item";
            li.setAttribute("role", "listitem");
            var a = document.createElement("a");
            a.href = term.link;
            a.textContent = term.name;
            li.appendChild(a);
            list.appendChild(li);
          });

          loaded = true;
          expanded = true;
          btn.setAttribute("aria-expanded", "true");
          btn.textContent = strings.ver_menos || "Ver menos";
          btn.disabled = false;
        })
        .catch(function (err) {
          console.error("PDS Terms fetch error", err);
          btn.textContent = strings.ver_mas || "Ver más";
          btn.disabled = false;
        })
        .finally(function () {
          busy = false;
        });
    });
  }

  function fetchJson(url) {
    return fetch(url, { credentials: "same-origin" }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    });
  }
});
