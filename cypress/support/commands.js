// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { getDroppableSelector, getHandleSelector } from "../e2e/util";
import * as keyCodes from "../e2e/key-codes";

Cypress.Commands.add(
  "dragAndDropCard",
  (sourceColumnIndex, destinationColumnIndex, cardContent) => {
    cy.get(getDroppableSelector()).eq(sourceColumnIndex).as("first-list");
    cy.get(getDroppableSelector()).eq(destinationColumnIndex).as("second-list");

    cy.get("@first-list")
      .contains(cardContent)
      .closest(getHandleSelector())
      .focus()
      .trigger("keydown", { keyCode: keyCodes.space })
      .trigger("keydown", { keyCode: keyCodes.arrowRight, force: true })
      .wait(1 * 1000)
      .trigger("keydown", { keyCode: keyCodes.space, force: true });

    cy.get("@second-list").contains(cardContent).should("exist");
  }
);
