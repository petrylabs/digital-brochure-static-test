import React from "react";

import ThreeItemLayout from "../ThreeItemLayout";
import Accordion from "../Accordion";
import AccordionGroup from "../AccordionGroup";
import ParsedCopy from "../ParsedCopy";
import BlogCard from "../BlogCard";
import styles from "./BlogFaqSection.module.scss";

/**
 * BlogFaqSection
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43286036647/BlogFaqSection
 * Section displaying blog posts and some FAQ in an accordion
 */
function BlogFaqSection(props) {
  const { content, blogs, faq } = props;
  const { copy, headline } = content;
  const accordionItems = faq?.fields;

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h2>{headline}</h2>
        {copy && <ParsedCopy copy={copy} />}
      </div>

      {/* BLOGS */}
      <div className={styles.blogContainer}>
        <ThreeItemLayout>
          {blogs.map((blog, i) => (
            <BlogCard key={i} content={blog} />
          ))}
        </ThreeItemLayout>
      </div>

      {/* FAQ */}
      {faq && (
        <div className={styles.accordions}>
          <AccordionGroup>
            {accordionItems.map((item) => (
              <Accordion
                key={item.identifier}
                id={item.identifier}
                details={<ParsedCopy copy={item.answer} />}
                summary={<ParsedCopy copy={item.question} />}
              />
            ))}
          </AccordionGroup>
        </div>
      )}
    </section>
  );
}

export default BlogFaqSection;
