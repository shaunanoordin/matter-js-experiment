/*
Starter JS
----------

Starter template for JavaScript web app projects.

(Shaun A. Noordin | shaunanoordin.com | 20180413)
 */

import { ImportExample } from "@src/importExample.js";

/*  Primary App Class
 */
//==============================================================================
class App {
  constructor() {
    let importExample = new ImportExample("HI THERE");

    this.console = document.getElementById("console");
    this.console.innerHTML =
      "This is a starter template for JS projects. <br>" +
      importExample.getText();
  }
}
//==============================================================================

/*  Initialisations
 */
//==============================================================================
var app;
window.onload = function() {
  window.app = new App();
};
//==============================================================================
