import { useLocation } from 'react-router-dom'

{
  /* 
    TH1 : totalPage < 11 ko co gi
    TH2 : totalPage >= 11{
        a) current - innerL - outerL - 1 <= 0
        1 2 3 4 '5' 6 7 ... totalPage-1 totalPage
        b) 
        current - innerL - outerL - 1 > 0
        &&
        current + innerR + outerR + 1 <= totalPage
        1 2 ... 4 5 '6' 7 8 ... totalPage-1 totalPage
        c)
        current + innerR + outerR + 1 > totalPage
        1 2 ... 5 6 '7' 8 9 10 11
    }
*/
}
{
  /* 1 2 ... 4 5 '6' 7 8 ... 10 11 */
}

const pagiLimit = 11
const outerLeft = 2
const outerRight = 2
const innerLeft = 2
const innerRight = 2

const makeArray = (min: number, max: number) => {
  const result = []
  for (let i = min; i <= max; i++) {
    result.push(i)
  }
  return result
}

const PagiButton = ({
  value,
  setCurrentPage,
  isActive,
  // queryKey,
  setSearchParams,
  query,
}) => {
  const handleClick = () => {
    query.set('page', value)
    setSearchParams(query)
    // setCurrentPage(value)
  }

  if (isActive === true) {
    return <button className="active">{value}</button>
  } else {
    return <button onClick={handleClick}>{value}</button>
  }
}

const Pagination = ({
  currentPage,
  setCurrentPage,
  // queryKey,
  // query,
  setSearchParams,
  totalPage,
}) => {
  const useQuery = () => new URLSearchParams(useLocation().search)
  const query = useQuery()

  if (totalPage < 11) {
    return makeArray(1, totalPage).map((item) => {
      if (currentPage == item)
        return (
          <PagiButton
            value={item} //
            // //setCurrentPage={setCurrentPage}
            isActive={true}
          />
        )
      return (
        <PagiButton
          value={item} //
          setCurrentPage={setCurrentPage}
          isActive={false}
          query={query}
          // //queryKey={queryKey}
          setSearchParams={setSearchParams}
        />
      )
    })
  } else {
    if (currentPage - innerLeft - outerLeft - 1 <= 0) {
      return makeArray(1, outerLeft + innerLeft + 1 + innerRight)
        .map((item) => {
          if (currentPage == item)
            return (
              <PagiButton
                value={item} //
                //setCurrentPage={setCurrentPage}
                isActive={true}
              />
            )
          return (
            <PagiButton
              value={item} //
              //setCurrentPage={setCurrentPage}
              isActive={false}
              //queryKey={queryKey}
              query={query}
              setSearchParams={setSearchParams}
            />
          )
        })
        .concat(<button>...</button>)
        .concat(
          makeArray(totalPage - 1, totalPage).map((item) => {
            return (
              <PagiButton
                value={item} //
                //setCurrentPage={setCurrentPage}
                isActive={false}
                //queryKey={queryKey}
                query={query}
                setSearchParams={setSearchParams}
              />
            )
          })
        )
    } else if (
      currentPage - innerLeft - outerLeft - 1 > 0 &&
      currentPage + innerRight + outerRight + 1 <= totalPage
    ) {
      return makeArray(1, 2)
        .map((item) => {
          return (
            <PagiButton
              value={item} //
              //setCurrentPage={setCurrentPage}
              isActive={false}
              //queryKey={queryKey}
              query={query}
              setSearchParams={setSearchParams}
            />
          )
        })
        .concat(<button>...</button>)
        .concat(
          makeArray(currentPage - 2, currentPage + 2).map((item) => {
            if (currentPage == item)
              return (
                <PagiButton
                  value={item} //
                  //setCurrentPage={setCurrentPage}
                  isActive={true}
                />
              )
            return (
              <PagiButton
                value={item} //
                //setCurrentPage={setCurrentPage}
                isActive={false}
                //queryKey={queryKey}
                query={query}
                setSearchParams={setSearchParams}
              />
            )
          })
        )
        .concat(<button>...</button>)
        .concat(
          makeArray(totalPage - 1, totalPage).map((item) => {
            return (
              <PagiButton
                value={item} //
                //setCurrentPage={setCurrentPage}
                isActive={false}
                //queryKey={queryKey}
                query={query}
                setSearchParams={setSearchParams}
              />
            )
          })
        )
    } else if (currentPage + innerRight + outerRight + 1 > totalPage) {
      return makeArray(1, 2)
        .map((item) => {
          return (
            <PagiButton
              value={item} //
              //setCurrentPage={setCurrentPage}
              isActive={false}
              //queryKey={queryKey}
              query={query}
              setSearchParams={setSearchParams}
            />
          )
        })
        .concat(<button>...</button>)
        .concat(
          makeArray(
            totalPage - outerRight - innerRight - 1 - innerLeft + 1,
            totalPage
          ).map((item) => {
            if (currentPage == item)
              return (
                <PagiButton
                  value={item} //
                  //setCurrentPage={setCurrentPage}
                  isActive={true}
                />
              )
            return (
              <PagiButton
                value={item} //
                //setCurrentPage={setCurrentPage}
                isActive={false}
                //queryKey={queryKey}
                query={query}
                setSearchParams={setSearchParams}
              />
            )
          })
        )
    }
    return <>?</>
  }
}

export { Pagination }
