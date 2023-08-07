import { fireEvent, render, screen } from "@testing-library/react";
import Board from "../Board";

describe("Trello Board Tests", () => {
  it("should be able to add a card in the column", () => {
    render(<Board />);
    const inputElement = screen.getByTestId("column-1-input");
    const buttonElement = screen.getByTestId("column-1");
    fireEvent.change(inputElement, {
      target: {
        value: "Go to the Grocery Shopping",
      },
    });
    fireEvent.click(buttonElement);
    const newCardElement = screen.getByText("Go to the Grocery Shopping");
    expect(newCardElement).toBeInTheDocument();
  });

  it("should be able to delete a card in the column", () => {
    render(<Board />);
    const cardElement = screen.getByText("Card 1 content");
    expect(cardElement).toBeInTheDocument();
    const buttonElement = screen.getByRole("card-1-delete-btn");
    fireEvent.click(buttonElement);
    expect(cardElement).not.toBeInTheDocument();
  });

  it("should be able to update a card in the column", () => {
    render(<Board />);
    const cardElement = screen.getByText("Card 1 content");
    expect(cardElement).toBeInTheDocument();
    const buttonElement = screen.getByRole("card-1-edit-btn");
    fireEvent.click(buttonElement);
    const inputElement = screen.getByRole("card-1-update-input");
    fireEvent.change(inputElement, {
      target: {
        value: "updated content",
      },
    });
    const saveButton = screen.getByRole("card-1-save-btn");
    fireEvent.click(saveButton);
    const updatedCardElement = screen.getByText("updated content");
    expect(updatedCardElement).toBeInTheDocument();
  });
});
