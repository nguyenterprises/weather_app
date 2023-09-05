import React, { useState, useEffect } from 'react'
import { uvColor } from "../functions/uvColor";
import useWidth from "../ui/useWidth";
import useMeasure from 'react-use-measure';


const bold = { fontWeight: '600' };

function OtherStats ({ forecast, temp }) {
    const width = useWidth();
    let [ref, bounds] = useMeasure();
    const [scrolled, setScrolled] = useState(false);

    const metersToMiles = (meters) => {
      return Math.round(meters * 0.000621371192);
    }
    const metersToKilometers = (meters) => {
      return Math.round(meters / 1000);
    }
    const scrollRight = () => {
      const statsBar = document.getElementById('stats-bar');
      statsBar.scrollBy(100,0);
    }
    const scrollLeft = () => {
      const statsBar = document.getElementById('stats-bar');
      statsBar.scrollBy(-100,0);
    }
    useEffect(() => {
      window.addEventListener('scroll', () => {
          (window.scrollY > 5) ? setScrolled(true) : setScrolled(false);
      }, { capture: true, passive: true });
      return(() => {
          window.removeEventListener('scroll', () => {
              (window.scrollY > 5) ? setScrolled(true) : setScrolled(false);
          }, { capture: true, passive: true });
      });
    }, []);
    return (
      <div id='stats-bar' ref={ref} style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflowX: 'auto',
        flexWrap: 'nowrap',
        whiteSpace: 'nowrap',
        columnGap: '1em',
        marginTop: '0em',
        backgroundColor: 'rgb(238, 235, 235)',
        padding: '.5em 1em',
        width: '100%',
      }}>
        <div style={{ display: 'flex', flexDirection: 'row', columnGap: '.5em'}}>
          <div><span style={bold}>Wind: </span>{forecast.hourly[0].windSpeed} {temp =='F' ? 'mph' : 'km/h'}</div>
          <div>
            <img src='https://res.cloudinary.com/dmjhwxcjh/image/upload/v1678831286/weather/arrow_up_xe2zrl.svg' alt='wind direction' style={{ rotate: `${forecast.hourly[0].windDirection}deg`, width: '100%' }}/>
          </div>
        </div>
        <div><span style={bold}>Humidity: </span>{forecast.hourly[0].humidity}%</div>
        <div><span style={bold}>Dew Pt: </span>{forecast.hourly[0].dewpoint}&deg;</div>
        <div><span style={bold}>UV Index: </span><span style={{ background: uvColor(Math.round(forecast.daily[0].uvIndex)), padding: '.15em .35em', borderRadius: '5px' }}>{Math.round(forecast.daily[0].uvIndex)}</span></div>
        <div><span style={bold}>Visibility: </span>{temp =='F' ? metersToMiles(forecast.hourly[0].visibility_meters/10) : metersToKilometers(forecast.hourly[0].visibility_meters/10)} {temp =='F' ? 'mi' : 'km'}</div>
        <div><span style={bold}>Pressure: </span>{forecast.hourly[0].pressure} {temp =='F' ? 'mb' : 'hPa'}</div>
        {(width < 870 && !scrolled) && <>
          <button style={{ position: 'fixed', right: '0%', top: `${bounds.top - 20}px`, display: 'flex', flexDirection: 'row', columnGap: '.15em', justifyContent: 'center', alignItems: 'center', border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={scrollRight}>
            <span style={{  fontSize: '.8rem' }}>Scroll</span>
            <span>
              <img src="https://res.cloudinary.com/dmjhwxcjh/image/upload/v1678831286/weather/arrow_up_xe2zrl.svg" alt="right-arrow" style={{ rotate: `90deg`, width: '80%' }} />
            </span>
          </button>
          <button style={{ position: 'fixed', left: '0%', top: `${bounds.top - 20}px`, display: 'flex', flexDirection: 'row', columnGap: '.15em', justifyContent: 'center', alignItems: 'center', border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={scrollLeft}>
            <span>
              <img src="https://res.cloudinary.com/dmjhwxcjh/image/upload/v1678831286/weather/arrow_up_xe2zrl.svg" alt="right-arrow" style={{ rotate: `-90deg`, width: '80%' }} />
            </span>
            <span style={{  fontSize: '.8rem' }}>Scroll</span>
          </button>
        </>}
      </div>
    )
};

export default OtherStats