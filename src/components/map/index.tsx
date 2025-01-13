import GoogleMapReact from "google-map-react"
import { StyledMarker, StyledPlaceIcon } from "./styles"
import { GOOGLE_MAPS_LANGUAGE, KEY_GOOGLE_MAPS } from "../../config/environment"

interface IMapComponentProps {
    lat: number
    lng: number
}

const MapComponent = ({lat, lng}: IMapComponentProps) => {
    if (!lat || !lng) return null

    const center = {
        lat,
        lng,
    }

    const createMapOptions = {
        zoomControl: false,
        scrollwheel: false,
        draggable: false, 
    }

    return (
        <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
            yesIWantToUseGoogleMapApiInternals
            bootstrapURLKeys={{
                key: KEY_GOOGLE_MAPS,
                language: GOOGLE_MAPS_LANGUAGE
            }}
            center={center}
            zoom={5}
            options={createMapOptions}
        >
            <StyledMarker>
                <StyledPlaceIcon />
            </StyledMarker>
        </GoogleMapReact>
        </div>
    )
}

export default MapComponent
