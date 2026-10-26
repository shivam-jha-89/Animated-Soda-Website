"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type BigTextProps = SliceComponentProps<Content.BigTextSlice>;

const BigText = ({ slice }: BigTextProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-screen w-screen overflow-hidden bg-[#FE6334] text-[#FEE832] dark:bg-sky-900 dark:text-orange-300"
    >
      {/* Marquee top */}
      <div className="overflow-hidden border-b-4 border-[#FEE832]/30 py-4 dark:border-orange-300/20">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="mr-12 text-2xl font-black uppercase tracking-widest opacity-60"
            >
              🥤 Fizzi &bull; Refreshingly Bold &bull; Pick Your Flavor &bull;
            </span>
          ))}
        </div>
      </div>

      <h2 className="grid w-full gap-[3vw] py-10 text-center font-black uppercase leading-[.7]">
        <div className="text-[34vw] drop-shadow-[0_4px_32px_rgba(254,232,50,0.3)]">
          Soda
        </div>
        <div className="grid gap-[3vw] text-[34vw] md:flex md:text-[11vw]">
          <span className="inline-block">that </span>
          <span className="inline-block max-md:text-[27vw]">makes </span>
          <span className="inline-block max-md:text-[40vw]">you </span>
        </div>
        <div className="text-[32vw] drop-shadow-[0_4px_32px_rgba(254,232,50,0.3)]">
          Smile
        </div>
      </h2>

      {/* Marquee bottom */}
      <div className="overflow-hidden border-t-4 border-[#FEE832]/30 py-4 dark:border-orange-300/20">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="mr-12 text-2xl font-black uppercase tracking-widest opacity-60"
            >
              ⚡ Zero Sugar &bull; All Flavor &bull; Fizzi Life &bull;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BigText;

