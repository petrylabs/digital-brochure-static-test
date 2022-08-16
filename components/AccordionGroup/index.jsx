import React, { Children, cloneElement, isValidElement, useState } from "react";

/**
 * AccordionGroup
 * Controls a set of Accordion components, so that only one is open at a time
 * @docs https://economical.atlassian.net/wiki/spaces/SKT/pages/43179409491/Accordion
 */
function AccordionGroup(props) {
  const { children } = props;
  const accordions = Children.toArray(children);
  console.log("I am accordiangroup", accordions);

  const [openAccordion, setOpenAccordion] = useState(null);

  /* Open new item, or close if open item is clicked again */
  const handleAccordionClick = (id) => {
    if (id === openAccordion) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(id);
    }
  };

  return (
    <>
      {Children.map(accordions, (child) => {
        console.log("child", child);
        if (!isValidElement(child)) {
          console.log("I m in if loop");
          return null;
        }

        const isOpenAccordion = child.props.id === openAccordion;
        console.log("isOpenAccordion", isOpenAccordion);

        /* Replace child with clone that has added props */
        return cloneElement(child, {
          expanded: isOpenAccordion,
          onChange: () => handleAccordionClick(child.props.id),
        });
      })}
    </>
  );
}

export default AccordionGroup;
