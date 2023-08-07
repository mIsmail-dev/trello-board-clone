import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { render, screen } from "@testing-library/react";
import Column from "../Column";

const MockColumn = ({
  column,
  cards,
  onAddCard,
  onDeleteCard,
  onUpdateCard,
  index,
}) => (
  <DragDropContext onDragEnd={jest.fn()}>
    <Droppable droppableId="board" direction="horizontal" type="column">
      {(
        provided // Add this function to provide the droppable props
      ) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <Column
            column={column}
            cards={cards}
            onAddCard={onAddCard}
            onDeleteCard={onDeleteCard}
            onUpdateCard={onUpdateCard}
            index={index.toI}
          />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

const mockColumn = {
  id: "column-1",
  title: "Todo",
  cardIds: ["card-1", "card-2"],
};

const mockCards = [
  { id: "card-1", content: "Card 1 content" },
  { id: "card-2", content: "Card 2 content" },
];
const mockAddCard = jest.fn();
const mockDeleteCard = jest.fn();
const mockUpdateCard = jest.fn();

describe("Column Tests", () => {
  it("should render a Card in the Column by default", () => {
    render(
      <MockColumn
        column={mockColumn}
        cards={mockCards}
        index={"1"}
        onAddCard={mockAddCard}
        onDeleteCard={mockDeleteCard}
        onUpdateCard={mockUpdateCard}
      />
    );

    const cardElement = screen.getByText(/Card 1 content/i);
    expect(cardElement).toBeInTheDocument();
  });
});
