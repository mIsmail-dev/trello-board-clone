import { fireEvent, render, screen } from "@testing-library/react";
import AddCard from "../AddCard";

describe("Add Card Input Tests", () => {
  it("should be able to type input in the Add Card", () => {
    render(<AddCard column={{}} onAddCard={jest.fn()} />);

    const inputElement = screen.getByPlaceholderText("Enter card content");
    fireEvent.change(inputElement, {
      target: {
        value: "Go to the Grocery Shopping",
      },
    });
    expect(inputElement.value).toBe("Go to the Grocery Shopping");
  });
});
