import { useEffect, useState } from "react";

import Tmdb from "./services/Api";
import MovieRow from './components/MovieRow/';
import FeatureMovie from './components/FeatureMovie/';
import Header from './components/Header/';

import './App.css';

// import { isConstructorDeclaration } from "typescript";

// type List = {
//   slug: string,
//   title: string,
//   items: []
// }

function App() {

  // const [movieList, setMovieList] = useState<List[]>([]);
  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {  
    const loadAll = async () => {
      //Pega lista
      let list = await Tmdb.getHomeList();  
      setMovieList(list);

      //Pega Filme Destaque
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);

    }
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListner = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListner);
    return () => {
      window.removeEventListener('scroll', scrollListner);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />

      { featureData && 
        <FeatureMovie  item={featureData} />
      }
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Direitos de imagem para Netflix<br/>
        Informações obtidas do site themoviedb.org<br/>
      </footer>


      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="loading"></img>
        </div>
      }
    </div>
  );
}

export default App;