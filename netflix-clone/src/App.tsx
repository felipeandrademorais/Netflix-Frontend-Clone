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
        {movieList.map((item) => (
          <div>{item.title}</div>

          /*
            Aqui chamar componente que mostra uma linha contendo lista de filmes
            e passar para o componente o array com os filmes {item.items} para 
            dentro do componente iterar esses items e exibir como cards de filmes;
          */

        ))}
      </section>
    </div>
  );
}

export default App;