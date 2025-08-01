// src/pages/Home.tsx

import { Hero, Teaser } from "@/components/sections";
import { SECTIONS } from "@/data/home.data";

const Home = () => {
  return (
    <>
      <Hero />
      {SECTIONS.map((section, index) => (
        <Teaser key={index} {...section} backgroundColor="bg-background" />
      ))}
    </>
  );
};

export default Home;
