import { useState } from "react";

type UseUserLocation = [GeolocationCoordinates | null, Status, string, () => void];

// Status to give useful info about the current status
type Status = "Loading" | "Error" | "Done" | "Standby"

const useUserLocation = (): UseUserLocation => {
	const [coordinates, setCoordinates] = useState<GeolocationCoordinates | null>(null);
	const [status, setStatus] = useState<Status>("Standby");
	const [info, setInfo] = useState("Location has not been obtained yet");

	const successHandler = (position: GeolocationPosition) => {
		setCoordinates(position.coords);
		setStatus("Done");
		setInfo("Location obtained");
	}

	const errorHandler = () => {
		setStatus("Error");
		setInfo("Unable to obtain location");
	}

	const findClientLocation = () => {
		setCoordinates(null);
		setStatus("Loading")
		setInfo("Finding location");

		if (navigator.geolocation)
			return navigator.geolocation.getCurrentPosition(successHandler, errorHandler);

		setStatus("Error");
		setInfo("Geolocation is not supported by your browser");
	}

	return [coordinates, status, info, findClientLocation];
}

export default useUserLocation;
