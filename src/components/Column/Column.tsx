import React, { FC } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Card from '../Card/Card'
import AddCard from '../AddCard/AddCard'
import { ICard, IColumn } from '../../data/initialData'

interface IColumnProps {
  column: IColumn
  cards: ICard[]
  onAddCard: (columnId: string, cardContent: string) => void
  onUpdateCard: (cardId: string, newContent: string) => void
  onDeleteCard: (cardId: string) => void
  index: number
}

const Column: FC<IColumnProps> = ({
  column,
  cards,
  onAddCard,
  onDeleteCard,
  onUpdateCard,
  index,
}) => {
  return (
    <Draggable draggableId={column.id.toString()} index={index}>
      {(provided) => (
        <div
          className="column"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <h3 {...provided.dragHandleProps}>{column.title}</h3>
          <Droppable droppableId={column.id.toString()} type="card">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {cards.map((card, index) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={index}
                    onDeleteCard={onDeleteCard}
                    onUpdateCard={onUpdateCard}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <AddCard onAddCard={onAddCard} column={column} />
        </div>
      )}
    </Draggable>
  )
}

export default Column
