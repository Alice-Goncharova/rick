import { useEffect, useState } from "react";
import { fetchEpisodes, fetchCharacters } from "../api";
import { useLocations } from "./hooks/useLocation";
import { EpisodeList } from "./presentational/EpisodeList";
import { LocationList } from "./presentational/LocationList";
import "./Rick.css";

export const Rick = () => {
  const [episodes, setEpisodes] = useState([]);
  const [charactersByEpisodes, setCharactersByEpisodes] = useState({});
  const [isLoadingByEpisodes, setIsLoadingByEpisodes] = useState({});
  const { locations, isLoading } = useLocations();
  const [activeTab, setActiveTab] = useState("episodes");

  useEffect(() => {
    fetchEpisodes().then((data) => {
      console.log(data);
      setEpisodes(data);
    });
  }, []);

  const handleEpisodeClick = (episode) => {
    const ids = episode.characters.map((character) => {
      const id = character.split("/").pop();
      return id;
    });

    setIsLoadingByEpisodes({ ...isLoadingByEpisodes, [episode.id]: true });

    fetchCharacters(ids).then((data) => {
      console.log(data);
      setCharactersByEpisodes({ ...charactersByEpisodes, [episode.id]: data });
      setIsLoadingByEpisodes({ ...isLoadingByEpisodes, [episode.id]: false });
    });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Alive":
        return "character-alive";
      case "Dead":
        return "character-dead";
      default:
        return "character-unknown";
    }
  };

  return (
    <div>
<div className="tabs">
  <button
    className={activeTab === "episodes" ? "active" : ""}
    onClick={() => handleTabClick("episodes")}
  >
    Эпизоды
  </button>
  <button
    className={activeTab === "locations" ? "active" : ""}
    onClick={() => handleTabClick("locations")}
  >
    Локации
  </button>
</div>
      {activeTab === "episodes" ? (
        <EpisodeList
          episodes={episodes}
          charactersByEpisodes={charactersByEpisodes}
          isLoadingByEpisodes={isLoadingByEpisodes}
          handleEpisodeClick={handleEpisodeClick}
          getStatusClass={getStatusClass}
        />
      ) : (
        <LocationList locations={locations} isLoading={isLoading} />
      )}
    </div>
  );
};
