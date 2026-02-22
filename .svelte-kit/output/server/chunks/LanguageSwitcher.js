import { ac as fallback, ad as attr_style, a8 as attr_class, ab as attr, e as escape_html, ae as bind_props, af as stringify, a9 as ensure_array_like, a7 as store_get, aa as unsubscribe_stores } from "./index2.js";
import { w as writable } from "./index.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function Card($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let card = $$props["card"];
    let onClick = fallback($$props["onClick"], () => {
    });
    let scale = fallback($$props["scale"], 1);
    let rotation = fallback($$props["rotation"], 0);
    let onEnlarge = fallback($$props["onEnlarge"], () => {
    });
    let flipped = false;
    $$renderer2.push(`<div class="card-wrapper svelte-1udyrqm"${attr_style(`transform: scale(${stringify(scale)}) rotate(${stringify(rotation)}deg);`)} role="button" tabindex="0"><div${attr_class("card svelte-1udyrqm", void 0, { "flipped": flipped })}><div class="card-inner svelte-1udyrqm"><div class="card-front svelte-1udyrqm"><img${attr("src", card.imagen)}${attr("alt", card.titulo)} class="svelte-1udyrqm"/></div> <div class="card-back svelte-1udyrqm"><h2 class="svelte-1udyrqm">${escape_html(card.titulo)}</h2> <div class="card-text svelte-1udyrqm">${html(card.texto.replace(/\n/g, "<br>"))}</div></div></div></div></div>`);
    bind_props($$props, { card, onClick, scale, rotation, onEnlarge });
  });
}
function CardModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let card = fallback($$props["card"], null);
    let onClose = fallback($$props["onClose"], () => {
    });
    if (card) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="modal-overlay svelte-h7vqqj" role="button" tabindex="0"><div class="modal-content svelte-h7vqqj"><button class="close-button svelte-h7vqqj" aria-label="Close"><i class="fa fa-times"></i></button> <div class="enlarged-card svelte-h7vqqj"><div class="card-image svelte-h7vqqj"><img${attr("src", card.imagen)}${attr("alt", card.titulo)} class="svelte-h7vqqj"/></div> <div class="card-content svelte-h7vqqj"><h2 class="svelte-h7vqqj">${escape_html(card.titulo)}</h2> <div class="card-text svelte-h7vqqj">${html(card.texto.replace(/\n/g, "<br>"))}</div> `);
      if (card.position) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="card-position svelte-h7vqqj"><i class="fa fa-compass"></i> ${escape_html(card.position)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { card, onClose });
  });
}
const idioma = writable("es");
const lentesActivos = writable({
  naturaleza: true,
  fluir: true,
  tecnologia: true
});
const cartasLanzadas = writable([]);
const currentView = writable("intro");
function LensSelector($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const lenses = [
      {
        id: "naturaleza",
        icon: "/img/iconos/icono_naturaleza.png",
        alt: "Naturaleza"
      },
      {
        id: "fluir",
        icon: "/img/iconos/icono_fluir.png",
        alt: "Fluir"
      },
      {
        id: "tecnologia",
        icon: "/img/iconos/icono_tecnologia.png",
        alt: "Tecnología"
      }
    ];
    function getIconPath(lente, isActive) {
      const estado = isActive ? "" : "_apagado";
      return `/img/iconos/icono_${lente}${estado}.png`;
    }
    $$renderer2.push(`<div class="lens-selector svelte-m90p2z"><!--[-->`);
    const each_array = ensure_array_like(lenses);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let { id, icon, alt } = each_array[$$index];
      $$renderer2.push(`<div class="lens-item svelte-m90p2z"><button${attr_class("lens-button svelte-m90p2z", void 0, {
        "active": store_get($$store_subs ??= {}, "$lentesActivos", lentesActivos)[id]
      })}${attr("title", alt)}${attr("aria-label", alt)}${attr("aria-pressed", store_get($$store_subs ??= {}, "$lentesActivos", lentesActivos)[id])}><img${attr("src", getIconPath(id, store_get($$store_subs ??= {}, "$lentesActivos", lentesActivos)[id]))}${attr("alt", alt)} class="svelte-m90p2z"/></button> <div class="lens-label svelte-m90p2z">${escape_html(alt)}</div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function LanguageSwitcher($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let isChecked = false;
    idioma.subscribe((value) => {
      isChecked = value === "pt";
    });
    $$renderer2.push(`<div class="language-switch svelte-1v2j48r"><button${attr_class("flag-button svelte-1v2j48r", void 0, {
      "active": store_get($$store_subs ??= {}, "$idioma", idioma) === "es"
    })} aria-label="Español">🇪🇸</button> <label class="switch svelte-1v2j48r"><input type="checkbox"${attr("checked", isChecked, true)} aria-label="Toggle language" class="svelte-1v2j48r"/> <span class="slider svelte-1v2j48r"></span></label> <button${attr_class("flag-button svelte-1v2j48r", void 0, {
      "active": store_get($$store_subs ??= {}, "$idioma", idioma) === "pt"
    })} aria-label="Português">🇧🇷</button></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  Card as C,
  LensSelector as L,
  CardModal as a,
  LanguageSwitcher as b,
  cartasLanzadas as c,
  currentView as d,
  html as h,
  idioma as i
};
