import { useState } from "react";

type UseUserLocation = [Status, string, () => Promise<GeolocationCoordinates>];

// Status to give useful info about the current status
type Status = "Loading" | "Error" | "Done" | "Standby"

const useUserLocation = (): UseUserLocation => {
	const [status, setStatus] = useState<Status>("Standby");
	const [info, setInfo] = useState("Location has not been obtained yet");

	const findClientLocation = () =>
		new Promise<GeolocationCoordinates>((resolve, reject) => {
			setStatus("Loading")
			setInfo("Finding location");

			if (navigator.geolocation)
				return navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
					setStatus("Done");
					setInfo("Location obtained");
					resolve(position.coords);
				}, () => {
					setStatus("Error");
					setInfo("Unable to obtain location");
					reject(null);
				});

			setStatus("Error");
			setInfo("Geolocation is not supported by your browser");
			reject(null);
		});

	return [status, info, findClientLocation];
}

export default useUserLocation;
