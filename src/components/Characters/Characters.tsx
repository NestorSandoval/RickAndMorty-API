"use client";
import { useEffect, useState } from "react";
import { fetchRickAndMorty } from "@/app/actions/actions";
import { PaginationComponent } from "../ui";

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  gender: string;
}

export function Characters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const data = await fetchRickAndMorty(currentPage);
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (error: any) {
        console.error(error);
      }
    };

    getCharacters();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="flex flex-col items-center p-4">
      <div className="text-5xl text-green-500 mt-10 bg-gray-800 rounded-lg px-10 py-2">
        <h1>Characters Rick and Morty</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        {characters.map((character) => (
          <article
            className="flex flex-col items-center p-4 bg-gray-800 rounded-lg w-64 h-auto max-w-xs"
            key={character.id}
          >
            <div className="w-40 h-40 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={character.image}
                alt={character.name}
              />
            </div>
            <div className="text-center text-white mt-2">
              <h2 className="text-xl text-green-300 font-semibold truncate">
                {character.name}
              </h2>
              <div className="mt-2">
                <span>Especie: {character.species}</span>
                <br />
                <span>Género: {character.gender}</span>
                <br />
                <span>Estatus: {character.status}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="flex justify-center py-4 mt-3 sticky">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
