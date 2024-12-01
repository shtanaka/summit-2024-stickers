import localFont from "next/font/local";
import { useEffect, useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const toggleCard = (index: number) => {
    if (selectedCards.includes(index)) {
      setSelectedCards(selectedCards.filter((cardIndex) => cardIndex !== index));
    } else {
      setSelectedCards([...selectedCards, index]);
    }
  };

  useEffect(() => {
    const selectedCards = localStorage.getItem("selectedCards");
    if (selectedCards) {
      setSelectedCards(JSON.parse(selectedCards));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedCards", JSON.stringify(selectedCards));
  }, [selectedCards]);

  const totalCards = 169;
  const remainingCardsCount = totalCards - selectedCards.length;
  const totalCardsArr = Array.from({ length: totalCards }, (_, index) => index + 1);
  const unselectedCards = totalCardsArr.filter((_, index) => !selectedCards.includes(index));

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} w-full font-[family-name:var(--font-geist-sans)] flex flex-col items-center justify-center p-4`}
    >
      <main className="w-full border-4 border-green-500 grid grid-cols-6 gap-4 p-4">
        {totalCardsArr.map((cardLabel, index) => (
          <div
            onClick={() => toggleCard(index)}
            key={index}
            className={`p-2 flex items-center justify-center border border-gray-300${
              selectedCards.includes(index) ? " bg-white text-black" : ""
            }`}
          >
            {cardLabel}
          </div>
        ))}
      </main>
      <footer className="w-full border-4 border-green-500 grid grid-cols-1 gap-4 p-4">
        <div className="flex items-center justify-center px-4">
          <div className="">Missing Count: {remainingCardsCount}</div>
        </div>
        <div className="flex items-center justify-center p-4">
          <div className="">Missing Cards: {unselectedCards.join(", ")}</div>
        </div>
      </footer>
    </div>
  );
}
