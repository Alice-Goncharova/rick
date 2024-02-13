import { useState } from "react";
import { Collapse } from "./Collapse";
import { CharacterList } from "./CharacterList";
import { LocationList } from "./LocationList";
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
            <>
              <CharacterList characters={episode.characters} />
              <LocationList locations={episode.locations} />
            </>
          }
          open={episode.id === openEpisodeId}
          onClick={() => handleEpisodeClick(episode.id)}
        />
      ))}
    </div>
  );
};
