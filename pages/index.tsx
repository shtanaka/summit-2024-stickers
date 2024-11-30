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

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} w-full font-[family-name:var(--font-geist-sans)] flex items-center justify-center p-4`}
    >
      <main className="w-full border-4 border-green-500 grid grid-cols-6 gap-4 p-4">
        {Array.from({ length: 169 }, (_, index) => (
          <div
            onClick={() => toggleCard(index)}
            key={index}
            className={`p-2 flex items-center justify-center border border-gray-300${selectedCards.includes(index) ? " bg-white text-black" : ""}`}
          >
            {index + 1}
          </div>
        ))}
      </main>
    </div>
  );
}
