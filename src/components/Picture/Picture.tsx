import { IPicture } from "../../interface/interface";
import {
  useAuthorApiQuery,
  useLocationApiQuery,
} from "../../redux/rtk/picture.api";
import styles from "./Picture.module.scss";

function Picture({ imageUrl, locationId, created, authorId, name }: IPicture) {
  const namePicture = name.toUpperCase();

  const { data: authors } = useAuthorApiQuery("");
  const { data: location } = useLocationApiQuery("");

  const authorsName = authors?.map((authors) =>
    authors.id === authorId ? authors.name.toUpperCase() : ""
  );

  const locationsName = location?.map((location) =>
    location.id === locationId ? location.location.toUpperCase() : ""
  );

  return (
    <li className={styles.picture__box}>
      <img
        src={`https://test-front.framework.team${imageUrl}`}
        alt={name}
        className={styles.picture__img}
      />
      <div className={styles.picture__textArea}>
        <div className={styles.picture__descr}>
          <h1 className={styles.picture__name}>{namePicture}</h1>
          <p className={styles.picture__year}>{created}</p>
        </div>
        <div
          className={`${styles.picture__descr} ${styles.picture__descr__hover}`}
        >
          <h1 className={styles.picture__name}>{authorsName}</h1>
          <p className={styles.picture__year}>{locationsName}</p>
        </div>
      </div>
    </li>
  );
}

export default Picture;
