import { useState } from "react";
import "./App.css";
import { Children } from "react";

const animesData = [
  {
    mal_id: 21,
    title: "Darling in the FranXX",
    year: 2018,
    image: "https://cdn.myanimelist.net/images/anime/1614/90408.jpg",
    score: 7.2,
    synopsis:
      "In the distant future, humanity has been driven to near-extinction by giant beasts known as Klaxosaurs, forcing the surviving humans to take refuge in massive fortress cities called Plantations. Children raised here are trained to pilot giant mechas known as FranXX—the only weapons known to be effective against the Klaxosaurs—in boy-girl pairs. Bred for the sole purpose of piloting these machines, these children know nothing of the outside world and are only able to prove their existence by defending their race.",
  },
  {
    mal_id: 20,
    title: "Naruto",
    year: 2002,
    image: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
    score: 8.71,
    synopsis:
      "Moments prior to Naruto Uzumaki's birth, a huge demon known as the Kyuubi, the Nine-Tailed Fox, attacked Konohagakure, the Hidden Leaf Village, and wreaked havoc. In order to put an end to the Kyuubi's rampage, the leader of the village, the Fourth Hokage, sacrificed his life and sealed the monstrous beast inside the newborn Naruto.",
  },
  {
    mal_id: 269,
    title: "Bleach",
    year: 2004,
    image: "https://cdn.myanimelist.net/images/anime/3/40451.jpg",
    score: 8.71,
    synopsis:
      "Ichigo Kurosaki is an ordinary high schooler—until his family is attacked by a Hollow, a corrupt spirit that seeks to devour human souls. It is then that he meets a Soul Reaper named Rukia Kuchiki, who gets injured while protecting Ichigo's family from the assailant.",
  },
  {
    mal_id: 31964,
    title: "Boku no Hero Academia",
    year: 2016,
    image: "https://cdn.myanimelist.net/images/anime/10/78745.jpg",
    score: 8.71,
    synopsis:
      'The appearance of "quirks", newly discovered super powers, has been steadily increasing over the years, with 80 percent of humanity possessing various abilities from manipulation of elements to shapeshifting. This leaves the remainder of the world completely powerless, and Izuku Midoriya is one such individual.',
  },
  {
    mal_id: 32222,
    title: "Kyoukai no Kanata",
    year: 2013,
    image: "https://cdn.myanimelist.net/images/anime/3/85468.jpg",
    score: 7.72,
    synopsis:
      'Mirai Kuriyama is the sole survivor of a clan of Spirit World warriors with the power to employ their blood as weapons. As such, Mirai is tasked with hunting down and killing "youmu"—creatures said to be the manifestation of negative human emotions. One day, while deep in thought on the school roof, Mirai comes across Akihito Kanbara, a rare half-breed of youmu in human form. In a panicked state, she plunges her blood saber into him only to realize that he s an immortal being. From then on, the two form an impromptu friendship that revolves around Mirai constantly trying to kill Akihito, in an effort to boost her own wavering confidence as a Spirit World warrior. Eventually, Akihito also manages to convince her to join the Literary Club, which houses two other powerful Spirit World warriors, Hiroomi and Mitsuki Nase.',
  },
  {
    mal_id: 54223,
    title: "Tomo-chan wa Onnanoko! Tomo-chan Is a Girl!",
    year: 2023,
    image: "https://cdn.myanimelist.net/images/anime/1444/131828.jpg",
    score: 7.8,
    synopsis:
      "Childhood friends Tomo Aizawa and Junichirou Jun Kubota do everything together, whether it be training or just enjoying a fun day out. Anyone would think that these two are best friends for life. The only issue is that the tomboyish Tomo is in love with Jun, but he regards her like a brother.At the start of their first year of high school, Tomo confesses her feelings to Jun. However, her rough mannerisms and lack of hesitance to throw a punch do nothing to sway Jun's heart. Realizing that he will remain indifferent to her affections unless she does something about it, Tomo must find a way to knock some sense into Jun and open his eyes to what is right in front of him.",
  },
];

export default function App() {
  const [animes, setAnimes] = useState(animesData);
  const [selectedAnime, setSelectedAnime] = useState(animes[0]);

  function handleSelectedAnime(id) {
    const newAnime = animes.filter((anime) => anime.mal_id === id);
    setSelectedAnime(newAnime[0]);
  }

  return (
    <>
      <NavBar>
        <Search>
          <NumResult animes={animes} />
        </Search>
      </NavBar>

      <Main>
        <Box>
          <AnimeList animes={animes} onSelectedAnime={handleSelectedAnime} />
        </Box>

        <Box>
          <AnimeDetail selectedAnime={selectedAnime} />
        </Box>
      </Main>
    </>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍥</span>
      <h1>WeeBoo</h1>
      <span role="img">🍥</span>
    </div>
  );
}

function Search({ children }) {
  const [query, setQuery] = useState("");

  return (
    <div className="search-container">
      <input
        className="search"
        type="text"
        placeholder="Search anime..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {children}
    </div>
  );
}

function NumResult({ animes }) {
  return (
    <p className="search-results">
      Found <strong>{animes.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function AnimeList({ animes, onSelectedAnime }) {
  return (
    <ul className="list list-anime">
      {animes?.map((anime) => (
        <Anime
          key={anime.mal_id}
          anime={anime}
          onSelectedAnime={onSelectedAnime}
        />
      ))}
    </ul>
  );
}

function Anime({ anime, onSelectedAnime }) {
  return (
    <li onClick={() => onSelectedAnime(anime.mal_id)}>
      <img src={anime.image} alt={`${anime.title} cover`} />
      <h3>{anime.title}</h3>
      <div>
        <p>
          <span>{anime.year}</span>
        </p>
      </div>
    </li>
  );
}

function AnimeDetail({ selectedAnime }) {
  return (
    <div className="details">
      <header>
        <img src={selectedAnime.image} alt={`${selectedAnime.title} cover`} />
        <div className="details-overview">
          <h2>{selectedAnime.title}</h2>
          <p>
            {selectedAnime.year} &bull; {selectedAnime.score}
          </p>
        </div>
      </header>
      <section>
        <p>
          <em>{selectedAnime.synopsis}</em>
        </p>
      </section>
    </div>
  );
}
