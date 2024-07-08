import ReactPaginate from "react-paginate"
import VectorRight from "../icons/VectorRight"
import VectorLeft from "../icons/VectorLeft"
import styles from './Pagination.module.scss'

const Pagination: React.FC <{ onChangePage : (number: number) => void }> = ({onChangePage}) => {
  return (
    <>
      <ReactPaginate pageCount={9} nextLabel={<VectorRight/>} previousLabel={<VectorLeft/>} pageRangeDisplayed={3} breakLabel='...' className={styles.paginate_block} marginPagesDisplayed={1} onPageChange={(event) => onChangePage(event.selected + 1)}/>
    </>
  )
}

export default Pagination