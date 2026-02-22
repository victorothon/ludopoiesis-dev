import { a7 as store_get, a8 as attr_class, a9 as ensure_array_like, e as escape_html, aa as unsubscribe_stores } from "../../chunks/index2.js";
import { h as html, C as Card, a as CardModal, L as LensSelector, b as LanguageSwitcher, c as cartasLanzadas, i as idioma, d as currentView } from "../../chunks/LanguageSwitcher.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let introText, preguntaText, lentesText;
    let textos = {};
    let enlargedCard = null;
    let mobileCardShown = false;
    function handleEnlargeCard(card) {
      enlargedCard = card;
    }
    function closeModal() {
      enlargedCard = null;
    }
    introText = textos.intro?.["short"]?.[store_get($$store_subs ??= {}, "$idioma", idioma)] || "";
    preguntaText = textos.pregunta?.[store_get($$store_subs ??= {}, "$idioma", idioma)] || "";
    lentesText = textos.lentes?.[store_get($$store_subs ??= {}, "$idioma", idioma)] || "";
    $$renderer2.push(`<div${attr_class("page-container svelte-1uha8ag", void 0, { "mobile-card-shown": mobileCardShown })}><header class="header svelte-1uha8ag"><h1 class="svelte-1uha8ag"><span class="title-main svelte-1uha8ag">Ludopoiesis</span> <span class="title-sub svelte-1uha8ag">Oráculo para jugar la vida</span></h1></header> <main class="main-content svelte-1uha8ag">`);
    if (store_get($$store_subs ??= {}, "$currentView", currentView) !== "cards") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="intro-section svelte-1uha8ag">`);
      if (store_get($$store_subs ??= {}, "$currentView", currentView) === "intro") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="intro-text svelte-1uha8ag">${html(introText)} `);
        {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<button class="more-button svelte-1uha8ag">➔ Conocer más sobre Ludopoiesis</button>`);
        }
        $$renderer2.push(`<!--]--></div> <div class="spread-selector svelte-1uha8ag"><h2 class="svelte-1uha8ag">Elige tu tipo de lectura</h2> <div class="spread-options svelte-1uha8ag"><button class="spread-option svelte-1uha8ag"><i class="fa fa-square svelte-1uha8ag"></i> <h3 class="svelte-1uha8ag">Carta Única</h3> <p class="svelte-1uha8ag">Una respuesta directa y clara</p></button> <a href="/three-card" class="spread-option svelte-1uha8ag"><i class="fa fa-layer-group svelte-1uha8ag"></i> <h3 class="svelte-1uha8ag">3 Cartas</h3> <p class="svelte-1uha8ag">Pasado, Presente y Futuro</p></a></div></div>`);
      } else if (store_get($$store_subs ??= {}, "$currentView", currentView) === "pregunta") {
        $$renderer2.push("<!--[1-->");
        $$renderer2.push(`<div class="intro-text svelte-1uha8ag">${html(preguntaText)} <button class="back-button svelte-1uha8ag">◁ Volver al inicio</button></div>`);
      } else if (store_get($$store_subs ??= {}, "$currentView", currentView) === "lentes") {
        $$renderer2.push("<!--[2-->");
        $$renderer2.push(`<div class="intro-text svelte-1uha8ag">${html(lentesText)} <button class="back-button svelte-1uha8ag">◁ Volver al inicio</button></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (store_get($$store_subs ??= {}, "$cartasLanzadas", cartasLanzadas).length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="cards-container svelte-1uha8ag"><!--[-->`);
      const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$cartasLanzadas", cartasLanzadas));
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let carta = each_array[i];
        $$renderer2.push(`<div>`);
        Card($$renderer2, {
          card: carta,
          scale: Math.max(0.85, 1 - i * 0.05),
          rotation: Math.random() * 6 - 3,
          onEnlarge: handleEnlargeCard
        });
        $$renderer2.push(`<!----></div>`);
      }
      $$renderer2.push(`<!--]--> <div class="mobile-card-actions svelte-1uha8ag"><button class="btn btn-primary svelte-1uha8ag"><i class="fa fa-sparkles"></i> ${escape_html(store_get($$store_subs ??= {}, "$idioma", idioma) === "es" ? "Nueva Carta" : "Nova Carta")}</button> <a href="/three-card" class="btn btn-secondary svelte-1uha8ag"><i class="fa fa-layer-group"></i> 3 Cartas</a></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></main> `);
    CardModal($$renderer2, { card: enlargedCard, onClose: closeModal });
    $$renderer2.push(`<!----> <aside class="control-panel svelte-1uha8ag"><div class="control-inner svelte-1uha8ag"><div class="instructions svelte-1uha8ag"><div class="step svelte-1uha8ag"><h3 class="svelte-1uha8ag">1. Haz una pregunta <button class="info-icon svelte-1uha8ag" title="¿Cómo hacer una buena pregunta?"><i class="fa fa-info-circle"></i></button></h3></div> <div class="step svelte-1uha8ag"><h3 class="svelte-1uha8ag">2. Escoge tus lentes <button class="info-icon svelte-1uha8ag" title="Ver más sobre los lentes"><i class="fa fa-info-circle"></i></button></h3></div> <div class="lens-section svelte-1uha8ag">`);
    LensSelector($$renderer2);
    $$renderer2.push(`<!----></div> <div class="step svelte-1uha8ag"><h3 class="svelte-1uha8ag">3. Tira una carta</h3></div> <div class="action-buttons svelte-1uha8ag"><button class="btn btn-primary svelte-1uha8ag"><i class="fa fa-sparkles"></i> Sacar Carta</button> <button class="btn btn-secondary svelte-1uha8ag"><i class="fa fa-rotate-right"></i> Nuevo</button></div> <div class="language-section svelte-1uha8ag">`);
    LanguageSwitcher($$renderer2);
    $$renderer2.push(`<!----></div></div></div></aside></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
