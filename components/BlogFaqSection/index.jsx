import React from "react";
import parse from "html-react-parser";

import ThreeItemLayout from "../ThreeItemLayout";
import Accordion from "../Accordion";
import AccordionGroup from "../AccordionGroup";
import BlogCard from "../BlogCard";
import styles from "./BlogFaqSection.module.scss";

/**
 * BlogFaqSection
 * Section displaying blog posts and some FAQ in an accordion
 */
function BlogFaqSection(props) {
  const { content, blogs, faq } = props;
  const { copy, headline } = content;

  const accordionItems = faq.fields;

  console.log(faq);

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h2>{headline}</h2>
        {parse(copy)}
      </div>

      {/* BLOGS */}
      <ThreeItemLayout>
        {blogs.map((blog, i) => (
          <BlogCard key={i} content={blog} />
        ))}
      </ThreeItemLayout>

      {/* FAQ */}
      <div className={styles.accordions}>
        <AccordionGroup>
          {accordionItems.map((item) => (
            <Accordion
              key={item.identifier}
              id={item.identifier}
              details={parse(item.answer)}
              summary={parse(item.question)}
            />
          ))}
        </AccordionGroup>
      </div>
    </section>
  );
}

export default BlogFaqSection;
