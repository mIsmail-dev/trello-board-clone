export interface ICard {
  id: string
  content: string
}

export interface IColumn {
  id: string
  title: string
  cardIds: string[]
}

export interface IBoardState {
  cards: Record<string, ICard>
  columns: Record<string, IColumn>
  columnOrder: string[]
}
