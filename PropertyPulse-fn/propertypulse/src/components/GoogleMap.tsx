import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

// export default function DashboardMap({ listings }) {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
//   });

//   if (!isLoaded) return <p>Loading map...</p>;

//   return (
//     <GoogleMap
//       center={{ lat: 6.9271, lng: 79.8612 }}
//       zoom={11}
//       mapContainerStyle={{ width: "100%", height: "350px" }}
//     >
//       {listings.map((listing) => (
//         <MarkerF
//           key={listing._id}
//           position={{
//             lat: listing.latitude,
//             lng: listing.longitude,
//           }}
//         />
//       ))}
//     </GoogleMap>
//   );
// }
