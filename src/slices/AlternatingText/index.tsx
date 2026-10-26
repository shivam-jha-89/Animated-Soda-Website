"use client";

import { Bounded } from "@/components/Bounded";
import { asText, Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type AlternatingTextProps =
  SliceComponentProps<Content.AlternatingTextSlice>;

const AlternatingText = ({ slice }: AlternatingTextProps): JSX.Element => {
  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".alternating-section");
    sections.forEach((section) => {
      gsap.from(section.querySelectorAll("h2, div"), {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
      });
    });
  }, []);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="alternating-text-container relative bg-yellow-300 text-sky-950 dark:bg-sky-900 dark:text-white"
    >
      <div>
        <div className="relative z-[100] grid">
          <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
            <Scene />
          </View>

          {slice.primary.text_group.map((item, index) => (
            <div
              key={asText(item.heading)}
              className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2"
            >
              <div
                className={clsx(
                  index % 2 === 0 ? "col-start-1" : "md:col-start-2",
                  "rounded-2xl p-6 shadow-xl backdrop-blur-lg max-md:bg-white/30 dark:max-md:bg-sky-800/30",
                )}
              >
                <h2 className="text-balance text-6xl font-bold">
                  <PrismicText field={item.heading} />
                </h2>
                <div className="mt-4 text-xl opacity-80">
                  <PrismicRichText field={item.body} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AlternatingText;
