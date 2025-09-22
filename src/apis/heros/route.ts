interface PageInfo {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

interface AllHero extends PageInfo {
  items: Hero[];
}

export default async function fetchAllSuperheroes(url: string): Promise<AllHero> {
    const res = await fetch(url)
    if(!res.ok)
        throw new Error("Fetch failed");
    
    return res.json()
}
