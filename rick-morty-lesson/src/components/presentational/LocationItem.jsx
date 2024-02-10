export const LocationItem = ({ location }) => {
    return (
      <div className="location">
        <h3>{location.name}</h3>
        <div>Type: {location.type}</div>
        <div>Dimension: {location.dimension}</div>
      </div>
    );
  };