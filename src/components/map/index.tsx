import { useRef } from "react"
import GoogleMapReact from "google-map-react"
import { StyledMarker, StyledPlaceIcon } from "./styles"
import { KEY_GOOGLE_MAPS } from "../../config/environment"

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

    const mapRef = useRef<any>(null)

    const createMapOptions = {
        zoomControl: false,
        scrollwheel: false,
        draggable: false, 
    }

    return (
        <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
            ref={mapRef}
            yesIWantToUseGoogleMapApiInternals
            bootstrapURLKeys={{
                key: KEY_GOOGLE_MAPS,
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
