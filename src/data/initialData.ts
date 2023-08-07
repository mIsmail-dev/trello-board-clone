export interface ICard {
  id: string
  content: string
}

export interface IColumn {
  id: string
  title: string
  cardIds: string[]
}

interface InitialData {
  cards: Record<string, ICard>
  columns: Record<string, IColumn>
  columnOrder: string[]
}

const initialData: InitialData = {
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

export default initialData
