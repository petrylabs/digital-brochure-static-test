import React, { useContext } from "react";
import Image from "next/image";
import PropTypes from "prop-types";

import { baseUrl } from "../../config";
import { customLoader, imageAlt, imageSrc } from "../../utils/images";
import styles from "./BlogCard.module.scss";
import { getLanguageVariable } from "../../utils/languageVariable";
import LanguageContext from "../../context/language";

/**
 * BlogCard
 * Receives contentType: `Blog` and displays content in a linked card
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179311185/BlogCard
 */
function BlogCard(props) {
  const { lang } = useContext(LanguageContext);
  const { content } = props;
  const { category, headline, timeToRead, url } = content;

  /* Where does this actually come from? */
  const tag = getLanguageVariable(
    `category-${Object.values(category?.[0])[0]}`,
    lang
  );

  return (
    <a
      href={`${baseUrl}${url}`}
      className={styles.blogLink}
      aria-labelledby="blogTitle"
    >
      <div className={styles.blogContainer}>
        <div className={styles.blogImage}>
          <Image
            loader={customLoader}
            src={imageSrc(content, "image")}
            alt={imageAlt(content, "image")}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <span className={styles.blogTag}>{tag}</span>

        <div className={styles.blogContent}>
          <h3 id="blogTitle" className={styles.blogTitle}>
            {headline}
          </h3>
        </div>

        <span className={styles.blogMinRead}>{timeToRead}</span>
      </div>
    </a>
  );
}

BlogCard.propTypes = {
  content: PropTypes.shape({
    headline: PropTypes.string.isRequired,
    timeToRead: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogCard;
