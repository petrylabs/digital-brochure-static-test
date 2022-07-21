import React from "react";
import styles from "./BlogCard.module.scss";
import Image from "next/image";
import PropTypes from "prop-types";

/**
 * BlogCard
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179311185/BlogCard
 */

function BlogCard(props) {
  const { imgUrl, title, tag, minRead } = props;
  return (
    <a href="" className={styles.blogLink}>
      <div className={styles.blogContainer}>
        <div className={styles.blogImage}>
          <Image src={imgUrl} alt="" layout="fill" objectFit="cover" />
        </div>
        <div className={styles.blogTag}>
          <span>{tag}</span>
        </div>
        <div className={styles.blogContent}>
          <div className={styles.blogTitle}>
            <h4>{title}</h4>
          </div>
        </div>
        <span className={styles.blogMinRead}>{minRead}</span>
      </div>
    </a>
  );
}

BlogCard.propTypes = {
  // image url
  imgUrl: PropTypes.string.isRequired,

  // title for the blog
  title: PropTypes.string.isRequired,

  // tag for the blog card
  tag: PropTypes.string.isRequired,

  // min read time
  minRead: PropTypes.string.isRequired,
};

export default BlogCard;
