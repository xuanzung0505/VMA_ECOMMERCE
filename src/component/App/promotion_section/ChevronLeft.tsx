const ChevronLeft = ({ parent, handleClick }) => {
  return (
    <span className={`${parent}__ChevronLeft`} onClick={handleClick}>
      <div>
        <i className="fa-solid fa-chevron-left"></i>
      </div>
    </span>
  )
}

export { ChevronLeft }
