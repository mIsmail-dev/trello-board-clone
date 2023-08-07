import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import Column from '../Column/Column'
import AddColumn from '../AddColumn/AddColumn'
import { RootState } from '../../store/store'
import {
  addCard,
  addColumn,
  deleteCard,
  moveCardBetweenColumns,
  moveCardWithinColumn,
  updateCard,
} from '../../store/board/boardSlice'

const Board = () => {
  const boardSlice = useSelector((state: RootState) => state.board)
  const { cards, columns, columnOrder } = boardSlice
  const dispatch = useDispatch()

  const addCardToColumn = (columnId: string, cardContent: string) => {
    dispatch(addCard({ columnId, content: cardContent }))
  }

  const updateCardToColumn = (cardId: string, newContent: string) => {
    dispatch(updateCard({ id: cardId, content: newContent }))
  }

  const deleteCardFromColumn = (cardId: string) => {
    dispatch(deleteCard({ id: cardId }))
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId) {
      // Move card within the same column
      dispatch(
        moveCardWithinColumn({
          columnId: source.droppableId,
          startIndex: source.index,
          endIndex: destination.index,
        }),
      )
    } else {
      // Move card between columns
      dispatch(
        moveCardBetweenColumns({
          startColumnId: source.droppableId,
          endColumnId: destination.droppableId,
          startIndex: source.index,
          endIndex: destination.index,
        }),
      )
    }
  }

  const addColumnToBoard = (columnName: string) => {
    dispatch(addColumn({ columnName }))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="board"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {columnOrder.map((columnId, index) => {
              const currentColumn = columns[columnId]
              const currentCards = currentColumn.cardIds.map(
                (cardId) => cards[cardId],
              )

              return (
                <Column
                  key={currentColumn.id}
                  column={currentColumn}
                  cards={currentCards}
                  onAddCard={addCardToColumn}
                  onUpdateCard={updateCardToColumn}
                  onDeleteCard={deleteCardFromColumn}
                  index={index}
                />
              )
            })}
            <AddColumn onAddColumn={addColumnToBoard} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Board
