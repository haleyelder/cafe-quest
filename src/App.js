import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import About from "./components/About";
import LocationList from "./components/LocationList";
import locationData from "./locations";
import headerimg from "./images/header-map.png";

import L from "leaflet";

const GetIcon = (locationType) => {
  return L.icon({
    iconUrl: require(`./images/${locationType}-icon-1.png`),
    iconSize: [25, 40],
  });
};

function App() {
  const position = [45.528144, -122.664013];
  const zoomLevel = 12;
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div>
        <header>
          <div className="header-graphic">
            <img
              className="img-fluid"
              src={headerimg}
              alt="Cafe Quest map graphic"
            />
          </div>
          <ul
            className="nav nav-pills justify-content-center"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Map
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-about-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-about"
                type="button"
                role="tab"
                aria-controls="pills-about"
                aria-selected="false"
              >
                About
              </button>
            </li>
          </ul>
        </header>

        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div
              className="tab-pane show active"
              id="map"
              role="tabpanel"
              aria-labelledby="map-tab"
            >
              <div className="main">
                {/* <SortingHeader/> */}
                <LocationList locations={locationData} className="location" />

                <MapContainer
                  center={position}
                  zoom={zoomLevel}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {locationData.map((location) => (
                    <Marker
                      key={location.id}
                      position={[location.lat, location.long]}
                      icon={GetIcon(location.type)}
                    >
                      <Popup>
                        {" "}
                        {String(location.visited) === "true" ? (
                          <span className="marker-check">
                            {location.name} ✓
                          </span>
                        ) : (
                          `${location.name}`
                        )}
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>
          <div
            className="tab-pane"
            id="pills-about"
            role="tabpanel"
            aria-labelledby="pills-about-tab"
          >
            <About />
          </div>
        </div>

        <footer>Haley Elder | &copy; {currentYear} </footer>
      </div>
    </>
  );
}

export default App;
