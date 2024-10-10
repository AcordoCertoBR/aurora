import React from 'react'

type FieldInputHolderProps = {
  children?: React.ReactNode
  rightSideSlot?: React.ReactNode
}

export const FieldInputHolder = ({
  children,
  rightSideSlot,
}: FieldInputHolderProps) => {
  return (
    <div className="au-field__input-holder">
      {children}
      {rightSideSlot && (
        <div className="au-field__right-slot">{rightSideSlot}</div>
      )}
    </div>
  )
}
