import { useState } from "react"
import { IPicture } from "../../interface/interface"
import {  usePictureApiQuery } from "../../redux/rtk/picture.api"
import Picture from "../Picture/Picture"
import styles from "./PictureList.module.scss"
import { useAppSelector } from "../../hooks/redux"
import {  selectAddFilter, selectLimit, selectTitleFilter} from "../../redux/filter/flterSlice"
import Pagination from "../Pages/Pagination"


function PictureList() {
  const [ pageActive, setPageActive ] = useState(1)

  const limit = useAppSelector(selectLimit)

  const titleFilter = useAppSelector(selectTitleFilter)
  const filter = useAppSelector(selectAddFilter)
  const {authorId, locationId, from, to} = filter

  const { isError, isLoading, data: pictures} = usePictureApiQuery({search: titleFilter, page: pageActive, limit: limit, authorId: authorId, locationId: locationId, from: from, to: to})

  return (
    <section className={styles.section__pictureList}>
      <ul className={styles.picture__container}>
        { isError ? 
          <h1 className={styles.text__error}>error</h1> :
          isLoading ? 
          <h1 className={styles.text__loading}>Loading...</h1> :
          pictures?.length === 0 ? (
          <div className={styles.picture_container_titleSearch}>
            <li className={styles.not__found}>
              <h1 className={styles.not__found__h1}>No matches for <span>{titleFilter}</span></h1>
              <p className={styles.not__found__p}>Please try again with a different spelling or keywords.</p>
            </li>
          </div> 
          ) :
          pictures ? (
            pictures?.map((picture: IPicture) => {return <Picture {...picture} key={picture.id}/>})) :
          null
        }
      </ul>
      {titleFilter.length > 0 ? null :
      <div className={styles.pages_container}>
        <Pagination onChangePage = {(number: number) => setPageActive(number)}/>
      </div>
      }
    </section>
  )
}


export default PictureList
