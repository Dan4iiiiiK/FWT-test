import React, { useState } from "react";
import Search from "../icons/Search";
import Settings from "../icons/Settings";
import styles from "./Filter.module.scss";
import Closed from "../icons/Closed";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  selectAuthorFilter,
  selectLocationFilter,
  selectTitleFilter,
  setAuthorFilter,
  setLocationFilter,
  setTitleFilter,
  selectFromFilter,
  selectToFilter,
  setFromFilter,
  setToFilter,
  setAddFilter,
  setClearFilter,
  setClearTitleFilter,
  setLimit,
} from "../../redux/filter/flterSlice";
import {
  useAuthorApiQuery,
  useLocationApiQuery,
} from "../../redux/rtk/picture.api";
import Selector from "../icons/Selector";
import ClosedTitle from "../icons/ClosedTitle";

function Filter() {
  const dispatch = useAppDispatch();

  //useSelect

  const titleFilter = useAppSelector(selectTitleFilter);
  const authorFilter = useAppSelector(selectAuthorFilter);
  const locationFilter = useAppSelector(selectLocationFilter);
  const fromFilter = useAppSelector(selectFromFilter);
  const toFilter = useAppSelector(selectToFilter);

  //query

  const { data: authors } = useAuthorApiQuery(authorFilter);
  const { data: locations } = useLocationApiQuery(locationFilter);

  //selector

  const [dropdownAuthor, setDropdownAuthor] = useState(false);
  const [dropdownLocation, setDropdownLocation] = useState(false);

  //subscribe

  const authorId = authors?.map((author) =>
    author.name === authorFilter ? author.id : null
  );
  const locationId = locations?.map((location) =>
    location.location === locationFilter ? location.id : null
  );
  const setFromFilterObject = fromFilter.length > 3 ? fromFilter : null;
  const setToFilterObject = toFilter.length > 3 ? toFilter : null;

  const object = {
    authorId: authorId,
    locationId: locationId,
    from: setFromFilterObject,
    to: setToFilterObject,
  };

  //dispatch

  const handleLimitChange = (limit: number) => {
    dispatch(setLimit(limit));
  };

  const handleTitleFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    const filter = dispatch(setTitleFilter(e.currentTarget.value));
    const limit =
      e.currentTarget.value !== ""
        ? handleLimitChange(33)
        : handleLimitChange(6);

    return filter && limit;
  };

  const handleAuthorFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(setAuthorFilter(e.currentTarget.value));
  };

  const handleLocationFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(setLocationFilter(e.currentTarget.value));
  };

  const handleFromFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(setFromFilter(e.currentTarget.value));
  };

  const handleToFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(setToFilter(e.currentTarget.value));
  };

  const handleClearClick = () => {
    dispatch(setClearFilter());
  };

  const handleClearTitleClick = () => {
    const clear = dispatch(setClearTitleFilter(""));
    const limit =
      clear.payload !== "" ? handleLimitChange(33) : handleLimitChange(6);

    return clear && limit;
  };

  const handleClick = () => {
    dispatch(setAddFilter(object));
  };

  //li dispatch

  const clickAuthorHandler = (authorName: string) => {
    dispatch(setAuthorFilter(authorName));
  };

  const clickLocationHandler = (location: string) => {
    dispatch(setLocationFilter(location));
  };

  //open

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={styles.section__filter}>
      <div className={styles.filter__container}>
        <label htmlFor="" className={styles.label__form}>
          <span className={styles.icon__search}>
            <Search />
          </span>
          <input
            className={styles.search__title}
            value={titleFilter}
            type="text"
            placeholder="Painting title"
            onChange={handleTitleFilterChange}
          />
          {titleFilter.length > 0 ? (
            <button
              className={styles.button__closed}
              onClick={handleClearTitleClick}
            >
              <ClosedTitle />
            </button>
          ) : null}
        </label>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.button__filter}
        >
          <Settings />
        </button>
      </div>
      {isOpen && (
        <div className={styles.filter__menu}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.filter__closed}
          >
            <Closed />
          </button>
          <div className={styles.filter__block}>
            <details className={styles.filter__form}>
              <summary className={styles.filter__summuryText}>ARTIST</summary>
              <label htmlFor="" className={styles.filter__block__label}>
                <input
                  type="text"
                  className={styles.filter__select}
                  value={authorFilter}
                  placeholder="Select the artist"
                  onClick={() => setDropdownAuthor(!dropdownAuthor)}
                  onChange={handleAuthorFilterChange}
                />
                <span
                  className={`${styles.filter__svg} ${
                    dropdownAuthor === true ? styles.filter__svg__active : null
                  }`}
                >
                  <Selector />
                </span>
              </label>
              {dropdownAuthor === true && (
                <ul className={styles.filter__select__block}>
                  {authors?.length === 0 ? (
                    <li className={styles.filter__select__text}>
                      <p>There are no matching results for your query.</p>
                    </li>
                  ) : authors ? (
                    authors?.map((author) => (
                      <li
                        className={styles.filter__select__text}
                        onClick={() => clickAuthorHandler(author.name)}
                        key={author.id}
                      >
                        {author.name}
                      </li>
                    ))
                  ) : null}
                </ul>
              )}
            </details>
            <details className={styles.filter__form}>
              <summary className={styles.filter__summuryText}>LOCATION</summary>
              <label htmlFor="" className={styles.filter__block__label}>
                <input
                  type="text"
                  className={styles.filter__select}
                  value={locationFilter}
                  placeholder="Select the artist"
                  onClick={() => setDropdownLocation(!dropdownLocation)}
                  onChange={handleLocationFilterChange}
                />
                <span
                  className={`${styles.filter__svg} ${
                    dropdownLocation === true
                      ? styles.filter__svg__active
                      : null
                  }`}
                >
                  <Selector />
                </span>
              </label>
              {dropdownLocation === true && (
                <ul className={styles.filter__select__block}>
                  {locations?.length === 0 ? (
                    <li className={styles.filter__select__text}>
                      <p>There are no matching results for your query.</p>
                    </li>
                  ) : locations ? (
                    locations?.map((location) => (
                      <li
                        className={styles.filter__select__text}
                        onClick={() => clickLocationHandler(location.location)}
                        key={location.id}
                      >
                        {location.location}
                      </li>
                    ))
                  ) : null}
                </ul>
              )}
            </details>
            <details className={styles.filter__form}>
              <summary className={styles.filter__summuryText}>YEARS</summary>
              <div className={styles.filter__block__flex}>
                <input
                  type="number"
                  placeholder="From"
                  className={styles.filter__years}
                  value={fromFilter}
                  onChange={handleFromFilterChange}
                />
                <div className={styles.filter__from}></div>
                <input
                  type="number"
                  placeholder="To"
                  className={styles.filter__years}
                  value={toFilter}
                  onChange={handleToFilterChange}
                />
              </div>
            </details>
          </div>
          <div className={styles.filter__button__block}>
            <button className={styles.filter__button} onClick={handleClick}>
              SHOW THE RESULTS
            </button>
            <button
              className={`${styles.filter__button} ${styles.grey__filter__button}`}
              onClick={handleClearClick}
            >
              CLEAR
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Filter;
