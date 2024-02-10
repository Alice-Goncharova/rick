import { useLocations } from "../hooks/useLocation";
import { LocationItem } from "./LocationItem";

export const LocationList = () => {
  const { locations, isLoading } = useLocations();

  if (isLoading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="locations-container">
      {locations.map((location) => (
        <LocationItem key={location.id} location={location} />
      ))}
    </div>
  );
};
