"use client";
import { useEffect, useState } from "react";
import { fetchRickAndMorty } from "@/app/actions/actions";
import Pagination from "../ui/Pagination";

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  gender: string;
}

export const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const data = await fetchRickAndMorty();
        setCharacters(data.results);
      } catch (error: any) {}
    };

    getCharacters();
  }, []);

  return (
    <main>
      <div className="grid place-content-center text-5xl mt-10 text-green-500 ">
        <h1>Characters Rick and Morty</h1>
      </div>
      <div className="grid grid-cols-4 place-items-center mt-10 box-border text-center gap-4">
        {characters.map((character) => (
          <article className="" key={character.id}>
            <div className="text-2xl text-green-300 font-semibold">
              <img className="w-[100%]" src={character.image} />
              <h1>{character.name}</h1>
            </div>
            <div className="grid">
              <span>{character.species}</span>
              <span>{character.gender}</span>
              <span>{character.status}</span>
            </div>
          </article>
        ))}
      </div>
      <div className="flex justify-center py-4 mt-3">
        <Pagination />
      </div>
    </main>
  );
};
