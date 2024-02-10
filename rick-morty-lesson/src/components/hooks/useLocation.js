import { useState, useEffect } from "react";
import { fetchLocations } from "../../api";

export const useLocations = () => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchLocations().then((data) => {
      setLocations(data);
      setIsLoading(false);
    });
  }, []);

  return { locations, isLoading };
};
