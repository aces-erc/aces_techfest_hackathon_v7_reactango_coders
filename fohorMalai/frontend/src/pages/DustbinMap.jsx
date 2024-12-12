import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Corrected custom icon URL
const dustbinIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2991/2991055.png",
  iconSize: [32, 32],
});
const mockDustbins = [
  // North (Public Park & Bus Station)
  { id: 1, name: "Dustbin A", position: [26.672, 87.285] },
  { id: 2, name: "Dustbin B", position: [26.674, 87.283] },

  // South (Near Hospitals & Markets)
  { id: 3, name: "Dustbin C", position: [26.663, 87.282] },
  { id: 4, name: "Dustbin D", position: [26.661, 87.284] },

  // East (Commercial Area)
  { id: 5, name: "Dustbin E", position: [26.667, 87.287] },
  { id: 6, name: "Dustbin F", position: [26.665, 87.289] },

  // West (Residential and Schools)
  { id: 7, name: "Dustbin G", position: [26.668, 87.279] },
  { id: 8, name: "Dustbin H", position: [26.666, 87.277] },

  // Center (Main Square)
  { id: 9, name: "Dustbin I", position: [26.6667, 87.2833] },
  { id: 10, name: "Dustbin J", position: [26.667, 87.281] },
];

function DustbinMap() {
  return (
    <MapContainer
      center={[26.6667, 87.2833]}
      zoom={16}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {mockDustbins.map((dustbin) => (
        <Marker key={dustbin.id} position={dustbin.position} icon={dustbinIcon}>
          <Popup>{dustbin.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default DustbinMap;
