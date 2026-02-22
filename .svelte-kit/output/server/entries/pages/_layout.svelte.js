import { h as head, s as slot } from "../../chunks/index2.js";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("12qhfyh", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Ludopoiesis - Oráculo Para Jugar la Vida</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Un oráculo interactivo para jugar con la vida"/> <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"/> <meta name="theme-color" content="#004D4D"/> <meta name="apple-mobile-web-app-capable" content="yes"/> <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/> <link rel="manifest" href="/manifest.json"/> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/> <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&amp;display=swap" rel="stylesheet"/> <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>`);
    });
    $$renderer2.push(`<div class="app"><!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _layout as default
};
