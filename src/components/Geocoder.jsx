import React, { useState, useEffect, useRef } from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { getTimeZone } from '../functions/timeZone';
import { getForecastGeocoder } from '../functions/forecast/getForecast';
import useWidth from '../ui/useWidth';

function Geocoder({ setUserDetails, setForecast, setMapCoords, setNws, setAlerts, temp, setTemp, setDisableNav, setIndexValue }) {

    const width = useWidth();
    const geoContainer = useRef(null);
    const geocoder = useRef(null);
    const [geoData, setGeoData] = useState({ place_name: '', latitude: "", longitude: "" });
    const [timezone, setTimezone] = useState();


    useEffect(() => {
        if (geocoder.current) return;
        geocoder.current = new MapboxGeocoder({
            accessToken: import.meta.env.VITE_API_KEY,
            types: 'country, region, place, postcode, locality, neighborhood'
        });
        geocoder.current.addTo('#geocoder');
        
    },[])
    
    useEffect(() => {
        if (!geocoder.current) return;
        geocoder.current.on('result', (e) => {
            setGeoData({ place_name: e.result.place_name, latitude: e.result.center[1], longitude: e.result.center[0] });
            let placeArray = e.result.place_name.split(',');
            setUserDetails({  city: placeArray[0], county: placeArray[0], state: placeArray[1], country: placeArray[2] });
            setMapCoords({ latitude: e.result.center[1], longitude: e.result.center[0] });
            setDisableNav(true);
            setIndexValue(0);
        })
    },[])

    useEffect(() => {
        if (geoData.latitude && geoData.longitude) {
        setTimezone('');
        getTimeZone(geoData.latitude, geoData.longitude, setTimezone);
        }
    },[geoData])

    useEffect(() => {
        if (timezone){
        getForecastGeocoder({ geoData, timezone, setForecast, setNws, setAlerts, temp });
        }
    },[timezone, temp])

   

  return (
    <div style={{
        display: 'flex',
        flexDirection: (width < 650) ? 'column' : 'row',
        rowGap: (width < 650) ? '.5em' : '',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(209, 202, 202)', 
        padding: (width > 651 && width < 870) ? '1em 1em 2em 1em' : '1em',
        width: '100vw',
        position: 'relative'
    }}>

        <div style={{ marginLeft: (width > 450) ? '-3.5em' : '' }} ref={geoContainer} id='geocoder'></div>

        <div style={{ 
            display: 'flex',
            fontSize: '1.1rem',
            position: (width < 650) ? '' : 'absolute',
            top: (width < 650) ? '' : '50%',
            right: (width < 650) ? '' : '6%',
            transform: (width < 650) ? '' : 'translate(-3%, -50%)'
        }}>
            <div onClick={() => setTemp('C')} style={{ textDecoration: (temp == 'F') ? 'none' : 'underline', textUnderlinePosition: 'under', fontWeight: (temp == 'F') ? '400' : '500', boxShadow: (temp == 'F') ? '' : 'rgba(0, 0, 0, 0.2) 0px 5px 10px 0px inset', cursor: 'pointer', padding: '.75em', borderRadius: '10px' }}>&deg;C</div>
            <div onClick={() => setTemp('F')} style={{ textDecoration: (temp != 'F') ? 'none' : 'underline', textUnderlinePosition: 'under', fontWeight: (temp != 'F') ? '400' : '500', boxShadow: (temp != 'F') ? '' : 'rgba(0, 0, 0, 0.2) 0px 5px 10px 0px inset', cursor: 'pointer', padding: '.75em', borderRadius: '10px' }}>&deg;F</div>
        </div>
   
    </div>
  )
}

export default Geocoder