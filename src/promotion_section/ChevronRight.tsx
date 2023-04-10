const ChevronRight = ({ parent, handleClick }) => {
  return (
    <span className={`${parent}__ChevronRight`} onClick={handleClick}>
      <div>
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </span>
  )
}

export { ChevronRight }
