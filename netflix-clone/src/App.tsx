import { useEffect, useState } from "react";
import Tmdb from "./services/Api";

type List = {
  slug: string,
  title: string,
  items: []
}

function App() {

  const [movieList, setMovieList] = useState<List[]>([]);

  useEffect(() => {  
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();  
      setMovieList(list);
    }
    loadAll();
  }, []);

  return (
    <div className="page">
      <section className="lists">
        {movieList.map((item)=>(
          <div>{item.title}</div>
        ))}
      </section>
    </div>
  );
}

export default App;