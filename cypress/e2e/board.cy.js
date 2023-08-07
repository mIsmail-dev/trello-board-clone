import { getDroppableSelector, getHandleSelector } from "./util";
import * as keyCodes from "./key-codes";

export const dragAndDropCard = (
  sourceColumnIndex,
  destinationColumnIndex,
  cardContent
) => {
  cy.get(getDroppableSelector()).eq(sourceColumnIndex).as("first-list");
  cy.get(getDroppableSelector()).eq(destinationColumnIndex).as("second-list");

  cy.get("@first-list")
    .contains(cardContent)
    .closest(getHandleSelector())
    // .focus()
    .trigger("keydown", { keyCode: keyCodes.space })
    .trigger("keydown", { keyCode: keyCodes.arrowRight, force: true })
    .wait(1 * 1000)
    .trigger("keydown", { keyCode: keyCodes.space, force: true });

  cy.get("@second-list").contains(cardContent).should("exist");
};

describe("Board Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should do test the whole board overflow", () => {
    // Get the enter column name input and type in it
    cy.get('input[placeholder="Enter column name"]').type("Analysis");
    // Click the "Add Column" button to create the new column
    cy.contains("Add Column").click();
    // Wait for the column to be added
    cy.contains("Analysis").should("exist");

    // Get the Enter Card Content Input and Type in it.
    cy.get('input[placeholder="Enter card content"]')
      .eq(0)
      .should("exist")
      .type("New Card Content");
    // Click the Add Card Button
    cy.contains("Add Card").click();
    // Check if the New Card Content EXIST Or not
    cy.contains("New Card Content").should("exist");

    // Call the function to perform the drag-and-drop action
    dragAndDropCard(1, 2, "New Card Content");
    dragAndDropCard(1, 2, "Card 2 content");
    dragAndDropCard(2, 3, "New Card Content");
  });
});
