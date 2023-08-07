import React, { FC, useState } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { Draggable } from 'react-beautiful-dnd'
import { ICard } from '../../data/initialData'

interface ICardProps {
  card: ICard
  index: number
  onUpdateCard: (cardId: string, newContent: string) => void
  onDeleteCard: (cardId: string) => void
}

const Card: FC<ICardProps> = ({ card, index, onDeleteCard, onUpdateCard }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(card.content)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onUpdateCard(card.id, editedContent)
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDeleteCard(card.id)
  }

  return (
    <Draggable draggableId={card.id.toString()} index={index}>
      {(provided) => (
        <div
          className={`card ${isEditing ? 'edit-mode' : ''}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isEditing ? (
            <div className="edit-input-container">
              <textarea
                role={`${card.id}-update-input`}
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <button
                role={`${card.id}-save-btn`}
                onClick={handleSave}
                className="save-button"
              >
                Save
              </button>
            </div>
          ) : (
            <>
              <p>{card.content}</p>
              <div className="icon-container">
                <FaEdit
                  role={`${card.id}-edit-btn`}
                  onClick={handleEdit}
                  className="edit-icon"
                />
                <FaTrashAlt
                  role={`${card.id}-delete-btn`}
                  onClick={handleDelete}
                  className="delete-icon"
                />
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  )
}

export default Card
