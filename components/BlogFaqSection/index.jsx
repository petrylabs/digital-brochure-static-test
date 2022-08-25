import React from "react";
import parse from "html-react-parser";

/**
 * BlogFaqSection
 * Section displaying blog posts and some FAQ in an accordion
 */
function BlogFaqSection(props) {
  const { content } = props;
  const { copy, headline } = content;

  return (
    <section className="bg-white">
      <h2>{headline}</h2>

      {parse(copy)}
    </section>
  );
}

export default BlogFaqSection;
