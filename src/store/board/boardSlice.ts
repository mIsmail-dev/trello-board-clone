import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { IBoardState } from './board.types'

const initialState: IBoardState = {
  cards: {
    'card-1': { id: 'card-1', content: 'Card 1 content' },
    'card-2': { id: 'card-2', content: 'Card 2 content' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Todo',
      cardIds: ['card-1', 'card-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Doing',
      cardIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      cardIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addCard: (
      state,
      action: PayloadAction<{ columnId: string; content: string }>,
    ) => {
      const { columnId, content } = action.payload
      const newCardId: string = `new-card-${Date.now()}`
      state.cards[newCardId] = { id: newCardId, content }
      // Adding Card Id to the column
      state.columns[columnId].cardIds.push(newCardId)
    },
    updateCard: (
      state,
      action: PayloadAction<{ id: string; content: string }>,
    ) => {
      const { id, content } = action.payload
      if (state.cards[id]) {
        state.cards[id].content = content
      }
    },
    deleteCard: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload
      delete state.cards[id]

      // Remove the card id from the corresponding column's `cardIds` array
      for (const columnId of Object.keys(state.columns)) {
        const column = state.columns[columnId]
        const updatedCardIds = column.cardIds.filter((cardId) => cardId !== id)
        column.cardIds = updatedCardIds
      }
    },
    addColumn: (state, action: PayloadAction<{ columnName: string }>) => {
      const { columnName } = action.payload
      const newColumnId = `new-column-${Date.now()}`
      const newColumn = {
        id: newColumnId,
        title: columnName,
        cardIds: [],
      }

      state.columns[newColumnId] = newColumn
      state.columnOrder.push(newColumnId)
    },
    moveCardWithinColumn: (
      state,
      action: PayloadAction<{
        columnId: string
        startIndex: number
        endIndex: number
      }>,
    ) => {
      const { columnId, startIndex, endIndex } = action.payload
      const column = state.columns[columnId]
      const cardIds = Array.from(column.cardIds)
      const [removed] = cardIds.splice(startIndex, 1)
      cardIds.splice(endIndex, 0, removed)

      state.columns[columnId].cardIds = cardIds
    },
    moveCardBetweenColumns: (
      state,
      action: PayloadAction<{
        startColumnId: string
        endColumnId: string
        startIndex: number
        endIndex: number
      }>,
    ) => {
      const {
        startColumnId,
        endColumnId,
        startIndex,
        endIndex,
      } = action.payload
      const startColumn = state.columns[startColumnId]
      const endColumn = state.columns[endColumnId]
      const startCardIds = Array.from(startColumn.cardIds)
      const endCardIds = Array.from(endColumn.cardIds)
      const [removed] = startCardIds.splice(startIndex, 1)
      endCardIds.splice(endIndex, 0, removed)

      state.columns[startColumnId].cardIds = startCardIds
      state.columns[endColumnId].cardIds = endCardIds
    },
  },
})

export const {
  addCard,
  updateCard,
  deleteCard,
  addColumn,
  moveCardWithinColumn,
  moveCardBetweenColumns,
} = boardSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectBoard = (state: RootState) => state.board

export default boardSlice.reducer
