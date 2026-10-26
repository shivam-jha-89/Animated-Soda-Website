"use client";

import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Center, Environment, View } from "@react-three/drei";
import { useRef, useState } from "react";
import clsx from "clsx";
import { Group } from "three";
import gsap from "gsap";

import FloatingCan from "@/components/FloatingCan";
import { SodaCanProps } from "@/components/SodaCan";
import { ArrowIcon } from "./ArrowIcon";
import { WavyCircles } from "./WavyCircles";
import { useCart } from "@/hooks/useCart";
import { spawnConfetti } from "@/components/confetti";
import { useToast } from "@/components/ToastContainer";
import { NutritionModal } from "@/components/NutritionModal";

const SPINS_ON_CHANGE = 8;
const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
  price: number;
}[] = [
    { flavor: "blackCherry", color: "#710523", name: "Black Cherry", price: 3.49 },
    { flavor: "grape", color: "#572981", name: "Grape Goodness", price: 3.29 },
    { flavor: "lemonLime", color: "#164405", name: "Lemon Lime", price: 2.99 },
    {
      flavor: "strawberryLemonade",
      color: "#690B3D",
      name: "Strawberry Lemonade",
      price: 3.49,
    },
    { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush", price: 3.19 },
  ];

export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
  const sodaCanRef = useRef<Group>(null);
  const touchStartX = useRef<number | null>(null);
  const [showNutrition, setShowNutrition] = useState(false);
  const { addItem, items } = useCart();
  const { addToast } = useToast();
  const totalCans = items.reduce((s, i) => s + i.quantity, 0);

  function changeFlavor(index: number) {
    if (!sodaCanRef.current) return;

    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

    const tl = gsap.timeline();

    tl.to(
      sodaCanRef.current.rotation,
      {
        y:
          index > currentFlavorIndex
            ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`
            : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0,
    )
      .to(
        ".background, .wavy-circles-outer, .wavy-circles-inner",
        {
          backgroundColor: FLAVORS[nextIndex].color,
          fill: FLAVORS[nextIndex].color,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      )
      .to(".text-wrapper", { duration: 0.2, y: -10, opacity: 0 }, 0)
      .to({}, { onStart: () => setCurrentFlavorIndex(nextIndex) }, 0.5)
      .to(".text-wrapper", { duration: 0.2, y: 0, opacity: 1 }, 0.7);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      changeFlavor(
        diff > 0 ? currentFlavorIndex - 1 : currentFlavorIndex + 1,
      );
    }
    touchStartX.current = null;
  }

  function handleAddToCart(e: React.MouseEvent) {
    const flavor = FLAVORS[currentFlavorIndex];
    addItem({
      flavor: flavor.flavor,
      name: flavor.name,
      price: flavor.price,
    });
    spawnConfetti(e.clientX, e.clientY);
    addToast(
      `${flavor.name} added to cart!`,
      ["🍒", "🍇", "🍋", "🍓", "🍉"][currentFlavorIndex],
      "success",
    );
  }

  return (
    <section
      id="flavors"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />

      <WavyCircles className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#710523]" />

      <h2 className="relative text-center text-5xl font-bold">
        <PrismicText field={slice.primary.heading} />
      </h2>

      <div className="grid grid-cols-[auto,auto,auto] items-center">
        {/* Left */}
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex + 1)}
          direction="left"
          label="Previous Flavor"
        />
        {/* Can */}
        <View className="aspect-square h-[70vmin] min-h-40">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan
              ref={sodaCanRef}
              floatIntensity={0.3}
              rotationIntensity={1}
              flavor={FLAVORS[currentFlavorIndex].flavor}
            />
          </Center>

          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>
        {/* Right */}
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex - 1)}
          direction="right"
          label="Next Flavor"
        />
      </div>

      <div className="text-area relative mx-auto pb-6 text-center">
        <div className="text-wrapper text-4xl font-medium">
          <p>{FLAVORS[currentFlavorIndex].name}</p>
        </div>
        <div className="mt-1 text-2xl font-bold text-white/90">
          ${FLAVORS[currentFlavorIndex].price.toFixed(2)}
        </div>
        {totalCans >= 12 && (
          <p className="mt-1 text-sm font-bold text-yellow-300">🎉 Bundle discount active!</p>
        )}
        <div className="mt-1 text-base font-normal opacity-70">
          <PrismicRichText field={slice.primary.price_copy} />
        </div>
        <div className="mt-3 flex flex-col items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="rounded-full bg-white px-8 py-3 text-base font-black uppercase tracking-wide text-gray-900 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-yellow-300 active:scale-95"
          >
            🛒 Add to Cart
          </button>
          <button
            onClick={() => setShowNutrition(true)}
            className="text-xs font-semibold text-white/70 underline hover:text-white"
          >
            View Nutrition Facts
          </button>
        </div>
      </div>

      {showNutrition && (
        <NutritionModal
          flavor={FLAVORS[currentFlavorIndex].flavor as any}
          onClose={() => setShowNutrition(false)}
        />
      )}
    </section>
  );
};

export default Carousel;

type ArrowButtonProps = {
  direction?: "right" | "left";
  label: string;
  onClick: () => void;
};

function ArrowButton({
  label,
  onClick,
  direction = "right",
}: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20"
    >
      <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")} />
      <span className="sr-only">{label}</span>
    </button>
  );
}
