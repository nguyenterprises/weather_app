import React, { useState, useEffect } from 'react'
import Geocoder from '../Geocoder';
import Map from '../Map';
import './weatherStyles.css';
import OtherStats from '../OtherStats';
import CardsSection from '../cards/Cards';
import NWSAlerts from '../Alerts';
import { DailyHighLowBars, TopHourlyBar } from '../Bars';
import { navigatorGeolocation } from '../../functions/navigator';
import { TitleSection } from '../Titlle';
import { weatherTheme } from '../../functions/weatherCodes';
import useWidth from '../../ui/useWidth';
import ScrollUp from '../../ui/scroll/ScrollUp';
import About from '../about/About';
import useMeasure from 'react-use-measure';

function Weather() {

  const [forecast, setForecast] = useState({});
  const [nws, setNws] = useState({});
  const [alerts, setAlerts] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [mapCoords, setMapCoords] = useState({ latitude: '', longitude: '' });
  const [mapToggle, setMapToggle] = useState(false);
  const [aboutToggle, setAboutToggle] = useState(false);
  const [temp, setTemp] = useState('F');
  const [disableNav, setDisableNav] = useState(false);
  const [indexValue, setIndexValue] = useState(0);

  const width= useWidth();
  const [cRef, bounds] = useMeasure();

  useEffect(() => {
    if (!disableNav) navigatorGeolocation({ setUserDetails, setForecast, setMapCoords, setNws, setAlerts, temp });
  },[temp, disableNav]);


  return (
    <>{aboutToggle ? 
      <>
      <About />
      <div style={{ position: 'fixed', right: '1%', bottom: '2%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <ScrollUp />
          <button
            style={{
              marginTop: '.25em',
              boxShadow: 'none',
              fontSize: '.9rem',
              fontWeight: '500',
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              border: 'none',
              textDecoration: 'underline',
              textUnderlinePosition: 'under'
            }}
            onClick={() => setAboutToggle(!aboutToggle)}>Back to weather</button>
        </div>
      </>
    :
      <div id='weather-container' style={{ backgroundImage: forecast.current ? `url(${weatherTheme(forecast.current.weatherCode, forecast.current.currentTime, forecast.daily[0].sunrise, forecast.daily[0].sunset)})` : "url('https://res.cloudinary.com/dmjhwxcjh/image/upload/v1679885508/weather/partlycloudy_rqm80h.jpg')"}}>

        <Geocoder setUserDetails={setUserDetails} setForecast={setForecast} setMapCoords={setMapCoords} setNws={setNws} setAlerts={setAlerts} setTemp={setTemp} temp={temp} setDisableNav={setDisableNav} setIndexValue={setIndexValue} />

        {(forecast.current && forecast.daily && forecast.hourly) &&
          <>
            <OtherStats forecast={forecast} temp={temp} />

            <div style={{ width: (width > 800 ) ? '75%' : '90%', maxWidth: '1200px', minWidth: '300px'}}>
              <div style={{ marginTop: '2em', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', boxShadow: '5px 5px 10px -2px rgba(0,0,0,0.4)', padding: '2em', backdropFilter: 'blur(8px)', backgroundColor:'rgba(255,255,255,.7)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '600', paddingBottom: (width < 500) ? '.5em' : '1.5em', textAlign: 'center' }}>{(!userDetails.city) ? userDetails.town?userDetails.town:userDetails.county : userDetails.city}, {userDetails.state} </div>   
                  <TitleSection nws={nws} forecast={forecast} />
                  <div style={{ width: (width > 800 ) ? '90%' : '100%', maxWidth: '1200px', minWidth: '300px', marginTop: '1em' }}><TopHourlyBar forecast={forecast} start={0} end={25} /></div>
                  <NWSAlerts alerts={alerts} />
              </div>
            </div>
              
              <div ref={cRef} style={{ marginTop: '2em'}}>
                <div  style={{ width: width > 900 ? `890px` : `${width * .95}px`, marginTop: '2em'}}>
                  <CardsSection forecast={forecast} userDetails={userDetails} setTemp={setTemp} temp={temp} indexValue={indexValue} setIndexValue={setIndexValue} />
                </div>
              </div>
        
          <button
            style={{
              marginTop: '3em',
              boxShadow: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: '500',
              padding: '.5em 1em',
              backgroundColor: '#7269af',
              color: '#FFFFFF',
              border: 'none',
            }}
            onClick={() => setMapToggle(!mapToggle)}>{(!mapToggle) ? 'Show Map' : 'Collapse Map'}</button>

          {mapToggle && <div style={{ marginTop: '2em', marginBottom: '1em'}}><Map mapCoords={mapCoords} /></div>}
        
          <div style={{ marginTop: '3em', marginBottom: '3em', width: width < 600 ? '90%' : '85%', maxWidth: '1200px', borderRadius: '10px', padding: width < 600 ? '2em .5em' : '2em', boxShadow: '5px 5px 10px -2px rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', backgroundColor:'rgba(255,255,255,.7)' }}><DailyHighLowBars forecast={forecast} /></div>

        </>
        } 

        <div style={{ position: 'fixed', right: '1%', bottom: '2%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <ScrollUp />
          <button
            style={{
              marginTop: '.25em',
              boxShadow: 'none',
              fontSize: '.9rem',
              fontWeight: '500',
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              border: 'none',
              textDecoration: 'underline',
              textUnderlinePosition: 'under'
            }}
            onClick={() => setAboutToggle(!aboutToggle)}>About</button>
        </div>

        
      </div>
    }
    </>
  )
}

export default Weather