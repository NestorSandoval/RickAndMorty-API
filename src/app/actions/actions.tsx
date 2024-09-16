export async function fetchRickAndMorty() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=3`
    );
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.name || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
