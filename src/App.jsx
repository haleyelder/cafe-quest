import React, { useState, useEffect } from "react";
import { getLocations } from "./lib/locations";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// import About from "./components/About"
import headerimg from "./assets/images/header-map.png";


const GetIcon = (locationType) => {
  const iconPath = new URL(`./assets/images/${locationType}-icon-1.png`, import.meta.url).href;

  return L.icon({
    iconUrl: iconPath,
    iconSize:[25, 40],
  });
};



const position = [45.528144, -122.664013];
const zoomLevel = 12;
const currentYear = new Date().getFullYear();

export default function LocationList() {
  const [location, setLocation] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [sortDirection, setSortDirection] = useState("Sort");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getLocations().then(setLocation);
  }, []);

  const toggleClick = (sort) => {
    setToggle(!toggle);
    if (toggle === true) {
      const sortedASC = [...location].sort(
        (
          a,
          b, // location not locations
        ) => (a[sort] > b[sort] ? 1 : b[sort] > a[sort] ? -1 : 0),
      );
      setLocation(sortedASC);
      setSortDirection("↑ A");
    } else {
      const sortedDESC = [...location].sort(
        (
          a,
          b, // location not locations
        ) => (a[sort] < b[sort] ? 1 : b[sort] < a[sort] ? -1 : 0),
      );
      setLocation(sortedDESC);
      setSortDirection("↓ D");
    }
  };

  const resetClick = () => {
    getLocations().then(setLocation); // re-fetch original order on reset
    setSortDirection("Sort");
  };

  const inputHandler = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredData = location.filter((el) => {
    if (searchText === "") return true;
    return (
      el.name.toLowerCase().includes(searchText) ||
      el.type.toLowerCase().includes(searchText)
    );
  });

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
          {/* <ul
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
            {/* <li className="nav-item" role="presentation">
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
          </ul> */}
        </header>
      </div>

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
          ></div>
          {/* SORTING HEADER LEFT AND LIST */}
          <div className="sorting-header">
            <button
              className="sorting-button"
              onClick={() => toggleClick("name")}
            >
              Name
            </button>
            <button
              className="sorting-button"
              onClick={() => toggleClick("neighborhood")}
            >
              Neighborhood
            </button>
            <button
              className="sorting-button"
              onClick={() => toggleClick("type")}
            >
              Type
            </button>
            <button
              className="sorting-button"
              onClick={() => toggleClick("visited")}
            >
              Visited
            </button>
            <div className="separator"></div>
            <button className="sorting-reset" onClick={resetClick}>
              Reset
            </button>
            <div className="sorting-direction">{sortDirection}</div>
          </div>

          <div className="searchbar">
            <input
              type="text"
              placeholder="search..."
              onChange={inputHandler}
            />
          </div>

          <div className="location-list">
            <ul>
              {filteredData.length < 1 ? (
                <p className="no-results">
                  <strong>No Results</strong>
                </p>
              ) : (
                filteredData.map((loc) => (
                  <div key={loc.id} className="locations">
                    <div className="location-name">
                      <span className="location-visited">
                        {String(loc.visited) === "TRUE" ? "✓" : ""}
                      </span>
                      <strong>{loc.name}</strong>{" "}
                      <span className="location-neighborhood">
                        <em> - {loc.neighborhood}</em>
                      </span>
                    </div>
                    <div className="location-directions">
                      <a
                        href={"https://www.google.com/maps?daddr=" + loc.name}
                        target="_blank"
                        rel="noreferrer"
                      >
                        directions{" "}
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    </div>
                    <div className="location-type">
                      <em>{loc.type}</em>
                    </div>
                  </div>
                ))
              )}
            </ul>
          </div>

          {/* right side main map */}
          <div className="main">
            <MapContainer
              center={position}
              zoom={zoomLevel}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {location.map((loc) => (
                <Marker
                  key={loc.id}
                  position={[loc.lat, loc.long]}
                  icon={GetIcon(loc.type)}
                >
                  <Popup>
                    {" "}
                    {String(loc.visited) === "TRUE" ? (
                      <span className="marker-check">{loc.name} ✓</span>
                    ) : (
                      `${loc.name}`
                    )}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
        {/* <div
          className="tab-pane"
          id="pills-about"
          role="tabpanel"
          aria-labelledby="pills-about-tab"
        >
          <About />
        </div> */}

        <footer>Haley Elder | &copy; {currentYear} </footer>
      </div>
    </>
  );
}
