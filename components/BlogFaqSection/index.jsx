import React from "react";
import parse from "html-react-parser";

import ThreeItemLayout from "../ThreeItemLayout";
import BlogCard from "../BlogCard";

/**
 * BlogFaqSection
 * Section displaying blog posts and some FAQ in an accordion
 */
function BlogFaqSection(props) {
  const { content, blogs, faq } = props;
  const { copy, headline } = content;

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
    </section>
  );
}

export default BlogFaqSection;
