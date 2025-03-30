import mapGeoJson from './mapGeoJson.js';
import loadElements from './loadElements.js';


class NasaMap {
    constructor() {
        const apiKey = "b19672e7064f4443a3b94527252703"; 
        this.baseUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&aqi=no&q=`;
       
        this.mapElement = document.getElementById('map');

        const centerOfUS = [39.8283, -98.5795];
        const panLimit = [40, 40];
        const southWestCorner = [centerOfUS[0] - panLimit[0], centerOfUS[1] - panLimit[1]];
        const northEastCorner = [centerOfUS[0] + panLimit[0], centerOfUS[1] + panLimit[1]];

        this.map = L.map('map', { 
            zoomControl: false,
            attributionControl: false,
            minZoom: 3,
            maxZoom: 5,
            zoom: 4,
            center: centerOfUS,
            maxBounds: L.latLngBounds(
                L.latLng(southWestCorner[0], southWestCorner[1]),  
                L.latLng(northEastCorner[0], northEastCorner[1])     
            ),
            maxBoundsViscosity: .9
        })        
        
        L.geoJSON(mapGeoJson, {className: 'country-outline'}).addTo(this.map);
        this.getNASAFacilities();    
    }

    getNASAFacilities() {
        fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
        .then(res => res.json())
        .then(data => {  
            this.uniqueFacilities = new Set; 
        
            data.forEach(fac => {
                if (this.uniqueFacilities.has(fac.center)) return;
                this.uniqueFacilities.add(fac.center);
        
                const marker = L.circleMarker([fac.location.latitude, fac.location.longitude], {
                    className: 'nasa-pin loadable',
                    radius: 6,
                    pane: "markerPane"
                })
                .on('click', () => {
                    this.getWeather(marker, fac);
                })
                .bindPopup(`<div class="custom-popup shadow-box solid-shadow text-flow">
                    <div>
                        <h2>${fac.center}</h2>
                        <div class="coordinates">Coordinates: ${fac.location.latitude}, ${fac.location.longitude}</div>
                        <div class="temperature">Temperature: Loading...</div>
                        <div class="weather">Weather: Loading...</div>
                    </div>
                </div>`)
                .addTo(this.map);

                loadElements();
            });
        });
    }
    getWeather(marker, fac) {
        if (marker.hasWeather) return;        
        marker.hasWeather = true;

        const url = `${this.baseUrl}${fac.location.latitude},${fac.location.longitude}`;

        fetch(url)
        .then(res => res.json())
        .then(data => {
            marker.bindPopup(`<div class="custom-popup shadow-box solid-shadow text-flow">
                <div>
                    <h2>${fac.center}</h2>
                    <div class="coordinates">Coordinates: ${fac.location.latitude}, ${fac.location.longitude}</div>
                    <div class="temperature">Temperature: ${data.current.temp_f}°F / ${data.current.temp_c}°C</div>
                    <div class="weather">Weather: ${data.current.condition.text}</div>
                </div>
            </div>`)
        });
    }
}

const nasaMap = new NasaMap();
loadElements();