

const filterList = ['all','mine', 'development','design','marketing','sales']

export default function ProjectFilter({ currentFilter, changeFilter }) {
 const handleClick = (newFilter) => {
    changeFilter(newFilter)
}

  return (
    <div className="project-filter">
        <nav>
            <p>Filter by: </p>
            {filterList.map((listItem) => (
                <button key={listItem}
                onClick={() => handleClick(listItem)}
                className={currentFilter ===  listItem ? 'active' : ''}
                >
                {listItem}
                </button>
            ))}    

        </nav>
    </div>
  )
}
