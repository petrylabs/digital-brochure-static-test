import React from "react";

import ThreeItemLayout from "../ThreeItemLayout";
import InfoCard from "../InfoCard";
import LargeScreenImage from "../LargeScreenImage";
import styles from "./SectionSix.module.scss";
import { baseUrl, breakpoints } from "../../config";
import { customLoader } from "../../utils";


/* Displays Section 6 with one LargeScreenImage on home page */

function SectionSix(props){
const{content} =props;
return(
  <section className={`${styles.threeItemWithLargeScreenImage} ${styles.container}`} style={{ paddingBottom: "13px" }}>
    <ThreeItemLayout>
        <InfoCard
            title={content[6].headline}
            iconUrl={content[6].fields[0].icon.url}
            alt={content[6].fields[0].icon.altText}
            content={content[6].copy}
            withBorder={true}
        />
        <InfoCard
            title={content[7].headline}
            iconUrl={content[7].fields[0].icon.url}
            alt={content[7].fields[0].icon.altText}
            content={content[7].copy}
            withBorder={true}
        />
        <LargeScreenImage
            src={`${baseUrl}${content[8].fileAsset}`}
            layout="fill"
            objectFit="cover"
            loader={customLoader}
            breakpoint={breakpoints.lg}
        />
    </ThreeItemLayout>   
  </section>
  ) 
}

export default SectionSix;