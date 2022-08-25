import React from "react";
import styles from "./BlogCard.module.scss";
import Image from "next/image";
import PropTypes from "prop-types";

/**
 * BlogCard
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179311185/BlogCard
 */

function BlogCard(props) {
  const { imgUrl, imgAltText, title, tag, minRead, link } = props;
  return (
    <a href={link} className={styles.blogLink} ariaLabelledby="blogTitle">
      <div className={styles.blogContainer}>
        <div className={styles.blogImage}>
          <Image
            loader={() => imgUrl}
            src={imgUrl}
            alt={imgAltText}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <span className={styles.blogTag}>{tag}</span>
        <div className={styles.blogContent}>
          <h3 id="blogTitle" className={styles.blogTitle}>
            {title}
          </h3>
        </div>
        <span className={styles.blogMinRead}>{minRead}</span>
      </div>
    </a>
  );
}

BlogCard.propTypes = {
  // image url
  imgUrl: PropTypes.string.isRequired,

  // image alt text
  imgAltText: PropTypes.string.isRequired,

  // title for the blog
  title: PropTypes.string.isRequired,

  // tag for the blog card
  tag: PropTypes.string.isRequired,

  // min read time
  minRead: PropTypes.string.isRequired,

  // blog link
  link: PropTypes.string.isRequired,
};

export default BlogCard;
