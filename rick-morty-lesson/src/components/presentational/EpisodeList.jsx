import { useState } from "react";
import { Collapse } from "./Collapse";
import { useEpisodes } from "../hooks/useEpisodes";

export const EpisodeList = () => {
  const { episodes } = useEpisodes();
  const [openEpisodeId, setOpenEpisodeId] = useState(null);

  const handleEpisodeClick = (episodeId) => {
    setOpenEpisodeId(episodeId === openEpisodeId ? null : episodeId);
  };

  return (
    <div>
      {episodes.map((episode) => (
        <Collapse
          key={episode.id}
          className="episode"
          title={episode.episode + ":" + episode.name}
          content={
            <div>
              {episode.characters.map((character) => (
                <div key={character.id}>
                  <img src={character.image} alt={character.name} />
                  <p>{character.name}</p>
                </div>
              ))}
            </div>
          }
          open={episode.id === openEpisodeId}
          onClick={() => handleEpisodeClick(episode.id)}
        />
      ))}
    </div>
  );
};
