import React from "react";
import parse from "html-react-parser";

import ThreeItemLayout from "../ThreeItemLayout";
import Accordion from "../Accordion";
import AccordionGroup from "../AccordionGroup";
import BlogCard from "../BlogCard";

/**
 * BlogFaqSection
 * Section displaying blog posts and some FAQ in an accordion
 */
function BlogFaqSection(props) {
  const { content, blogs, faq } = props;
  const { copy, headline } = content;

  const accordionItems = faq.fields;

  return (
    <section className="bg-white">
      <h2>{headline}</h2>

      {parse(copy)}

      {/* BLOGS */}
      <ThreeItemLayout>
        {blogs.map((blog, i) => (
          <BlogCard key={i} content={blog} />
        ))}
      </ThreeItemLayout>

      {/* FAQ */}
      <AccordionGroup>
        {accordionItems.map((item) => (
          <Accordion
            key={item.identifier}
            id={item.identifier}
            details={parse(item.metaDescription)}
            summary={parse(item.metaTitle)}
          />
        ))}
      </AccordionGroup>
    </section>
  );
}

export default BlogFaqSection;
