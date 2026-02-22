import { a8 as attr_class, e as escape_html, a7 as store_get, a9 as ensure_array_like, ab as attr, aa as unsubscribe_stores } from "../../../chunks/index2.js";
import { C as Card, a as CardModal, L as LensSelector, b as LanguageSwitcher, i as idioma } from "../../../chunks/LanguageSwitcher.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let drawnCards = [];
    let enlargedCard = null;
    let mobileStep = 0;
    const positions = [
      {
        name: { es: "Mente", pt: "Mente" },
        sub: { es: "Lo que piensas", pt: "O que você pensa" }
      },
      {
        name: { es: "Corazón", pt: "Coração" },
        sub: { es: "Lo que sientes", pt: "O que você sente" }
      },
      {
        name: { es: "Manos", pt: "Mãos" },
        sub: { es: "Lo que haces", pt: "O que você faz" }
      }
    ];
    function handleEnlargeCard(card) {
      enlargedCard = card;
    }
    function closeModal() {
      enlargedCard = null;
    }
    $$renderer2.push(`<div${attr_class("page-container svelte-ds72y6", void 0, { "mobile-card-view": mobileStep > 0 })}><header class="header svelte-ds72y6"><a href="/" class="back-link svelte-ds72y6"><i class="fa fa-arrow-left"></i> Volver</a> <h1 class="svelte-ds72y6"><span class="title-main svelte-ds72y6">${escape_html(store_get($$store_subs ??= {}, "$idioma", idioma) === "es" ? "Lectura de 3 Cartas" : "Leitura de 3 Cartas")}</span> <span class="title-sub svelte-ds72y6">${escape_html(store_get($$store_subs ??= {}, "$idioma", idioma) === "es" ? "Mente • Corazón • Manos" : "Mente • Coração • Mãos")}</span></h1></header> <main class="main-content svelte-ds72y6"><div class="spread-info svelte-ds72y6"><p>${escape_html(store_get($$store_subs ??= {}, "$idioma", idioma) === "es" ? "Tres dimensiones de tu situación: lo que piensas, lo que sientes y lo que haces." : "Três dimensões da sua situação: o que você pensa, o que você sente e o que você faz.")}</p></div> <div class="three-card-spread svelte-ds72y6"><!--[-->`);
    const each_array = ensure_array_like(drawnCards);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let card = each_array[i];
      $$renderer2.push(`<div class="spread-position svelte-ds72y6"><div class="position-header svelte-ds72y6"><div class="position-label svelte-ds72y6">${escape_html(card.positionName[store_get($$store_subs ??= {}, "$idioma", idioma)])}</div> <div class="position-sub svelte-ds72y6">${escape_html(card.positionSub[store_get($$store_subs ??= {}, "$idioma", idioma)])}</div></div> `);
      Card($$renderer2, { card, scale: 1, rotation: 0, onEnlarge: handleEnlargeCard });
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    const each_array_1 = ensure_array_like(Array(3 - drawnCards.length));
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      each_array_1[i];
      $$renderer2.push(`<div class="spread-position empty svelte-ds72y6"><div class="position-header svelte-ds72y6"><div class="position-label svelte-ds72y6">${escape_html(positions[drawnCards.length + i].name[store_get($$store_subs ??= {}, "$idioma", idioma)])}</div> <div class="position-sub svelte-ds72y6">${escape_html(positions[drawnCards.length + i].sub[store_get($$store_subs ??= {}, "$idioma", idioma)])}</div></div> <div class="empty-card svelte-ds72y6"><i class="fa fa-question"></i></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></main> `);
    CardModal($$renderer2, { card: enlargedCard, onClose: closeModal });
    $$renderer2.push(`<!----> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <aside class="control-panel svelte-ds72y6"><div class="control-inner svelte-ds72y6"><div class="instructions svelte-ds72y6"><div class="step svelte-ds72y6"><h3 class="svelte-ds72y6">Escoge tus lentes</h3></div> <div class="lens-section svelte-ds72y6">`);
    LensSelector($$renderer2);
    $$renderer2.push(`<!----></div> <div class="progress-indicator svelte-ds72y6"><p>${escape_html(drawnCards.length)} / 3 cartas</p></div> <div class="action-buttons svelte-ds72y6"><button class="btn btn-primary svelte-ds72y6"${attr("disabled", drawnCards.length >= 3, true)}><i class="fa fa-sparkles"></i> ${escape_html(drawnCards.length < 3 ? store_get($$store_subs ??= {}, "$idioma", idioma) === "es" ? "Sacar: " + positions[drawnCards.length].name.es : "Tirar: " + positions[drawnCards.length].name.pt : store_get($$store_subs ??= {}, "$idioma", idioma) === "es" ? "Lectura Completa" : "Leitura Completa")}</button> <button class="btn btn-secondary svelte-ds72y6"><i class="fa fa-rotate-right"></i> Nueva Lectura</button></div> <div class="language-section svelte-ds72y6">`);
    LanguageSwitcher($$renderer2);
    $$renderer2.push(`<!----></div></div></div></aside></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
