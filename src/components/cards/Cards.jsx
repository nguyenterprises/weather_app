import React, { useState, useEffect } from 'react'
import './cardsStyles.css';
import { humanTimeHour, humanTimeDayOfWeek, humanTimeMinute, timeLowerCase } from "../../functions/time";
import { weatherIcon, weatherAka } from "../../functions/weatherCodes";
import { sliceOfDay } from '../../functions/sliceOfDay';
import useWidth from '../../ui/useWidth';

function CardsSection ({ forecast, userDetails, temp, setTemp, indexValue, setIndexValue })  {

  const width = useWidth();
  const [sliceState, setSliceState] = useState({ start: 0, end: 22 });

  useEffect(() => {
    setSliceState({ start: 0, end: 22 });
  },[forecast, userDetails])

  return (
    <div id='card-box' style={{ padding: width < 800 ? ".5em .5em 1.5em .5em" : "2em" }}>
      
      <div id='cc-top'>
        <div style={{ position: 'relative' }}>
          <div className='cc-text'>
            <div style={{ fontSize: '1.8rem', fontWeight: '600' }}>{forecast.daily && weatherAka(forecast.daily[indexValue].weatherCode)}</div>
            <div  style={{ fontSize: '1.2rem', fontWeight: '400', marginTop: '.15em' }}>{(!userDetails.city) ? userDetails.county : userDetails.city}, {userDetails.state}</div>
          </div>
          <div className='switch-degrees'>
            <div onClick={() => setTemp('C')} style={{ textDecoration: (temp == 'F') ? 'none' : 'underline', textUnderlinePosition: 'under', fontWeight: (temp == 'F') ? '400' : '500' }}>&deg;C</div>
            <div onClick={() => setTemp('F')} style={{ textDecoration: (temp != 'F') ? 'none' : 'underline', textUnderlinePosition: 'under', fontWeight: (temp != 'F') ? '400' : '500' }}>&deg;F</div>
          </div>
        </div>
        <div style={{ marginTop: '1em', width: '100%' }}>
          {forecast.hourly && <EveryThreeHoursCards forecast={forecast} sliceState={sliceState} indexValue={indexValue} />}
        </div>
        <div style={{ paddingLeft: '1.5em', paddingRight: '1.5em', display: 'flex', columnGap: '1em'}}>
          {forecast.daily && <>
            <div style={{ fontSize: width > 800 ? '1rem' : '.9rem', fontWeight: '600' }}>Sunrise: <span style={{ fontSize: width > 800 ? '.9rem' : '.8rem', fontWeight: '400' }}>{timeLowerCase(humanTimeMinute(forecast.daily[indexValue].sunrise, forecast.timeZone.timeZone))}</span></div>
            <div style={{ fontSize: width > 800 ? '1rem' : '.9rem', fontWeight: '600' }}>Sunset: <span style={{ fontSize: width > 800 ? '.9rem' : '.8rem', fontWeight: '400' }}>{timeLowerCase(humanTimeMinute(forecast.daily[indexValue].sunset, forecast.timeZone.timeZone))}</span></div>
          </>}
        </div>
      </div>
      <div id='cc-bottom'>
        <div>{forecast.daily && <EveryDayCards forecast={forecast} sliceState={sliceState} setSliceState={setSliceState} indexValue={indexValue} setIndexValue={setIndexValue} />}</div>
      </div>

    </div>
  )
};
export default CardsSection

export const EveryThreeHoursCards = ({ forecast, sliceState, indexValue }) => {

    const width = useWidth();

    let propSliceState = forecast.hourly.slice(sliceState.start, sliceState.end);
    let propSunrise = forecast.daily.filter(rise => rise.humanDay == propSliceState[0].humanDay)[0].sunrise;
    let propSunset = forecast.daily.filter(set => set.humanDay == propSliceState[0].humanDay)[0].sunset;

    let everyThree = [];
    for (let i = 0; i < propSliceState.length; i+=3) {
      everyThree.push(propSliceState[i]);
    };
    return(
      <div className='f-card-row'>
        {everyThree.map((hour, index) =>  (
          <div className='f-card' key={hour.timestamp} style={{ padding: width < 800 ? ".5em 0" : "calc(-7px + 1.5625vw)" }}>
            <div style={{ fontSize: width > 800 ? '.9rem' : '.8rem' }} >{humanTimeHour(hour.timestamp, forecast.timeZone.timeZone)}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            {/* <div style={{ display: 'grid', placeItems: 'center' }}> */}
              <img src={weatherIcon(hour.weatherCode, hour.timestamp, propSunrise, propSunset)} alt='weather icon' style={{ width: width > 800 ? '120%' : '80%' }} />
            </div>
            <div style={{ fontSize: width > 800 ? '1.4rem' : '1rem', fontWeight: '600' }} >{hour.temperature}&deg;</div>
            <div className={hour.precipProbability < 1 ? 'precip-prob not-visible' : 'precip-prob'}>
              <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <img src='https://res.cloudinary.com/dmjhwxcjh/image/upload/v1678640920/weather/raindrop_dkdqbe.svg' alt='raindrop' style={{ width: '100%'}}/>
              </div>
              <div style={{ fontSize: width > 800 ? '.9rem' : '.8rem', transform: 'translateX(-10%)' }}>{hour.precipProbability}%</div>
            </div>
          </div>
        ))}
      </div>
    )
}

export const EveryDayCards = ({ forecast, sliceState, setSliceState, indexValue, setIndexValue }) => {

    const width = useWidth();

    let propSliceState = forecast.hourly.slice(sliceState.start, sliceState.end);
    let propSunrise = forecast.daily.filter(rise => rise.humanDay == propSliceState[0].humanDay)[0].sunrise;
    let propSunset = forecast.daily.filter(set => set.humanDay == propSliceState[0].humanDay)[0].sunset;

    useEffect(() => {
      if (indexValue === 0) { setSliceState({ start: 0, end: 22 })}
       else {
        const sd = sliceOfDay(forecast, indexValue)
        setSliceState({ start: sd.start + 2, end: sd.end + 1})
       }
    },[indexValue])

    return (
      <div className='f-card-row'>
        {forecast.daily.map((day, index) => (
          <div className='f-card g-border' key={day.timestamp} value={index} onClick={()=> setIndexValue(index)} style={{ background: (index === indexValue) ? 'rgba(255,255,255,.6)' : 'transparent', cursor: 'pointer', borderTopLeftRadius: index === 0 ? '10px' : '', borderBottomLeftRadius: index === 0 ? '10px' : '', borderTopRightRadius: (index === forecast.daily.length -1) ? '10px' : '', borderBottomRightRadius: (index === forecast.daily.length -1) ? '10px' : '', padding: width < 800 ? ".5em 0" : "calc(-7px + 1.5625vw)" }}>
            <div style={{ fontWeight: '600'}}>{humanTimeDayOfWeek(day.timestamp, forecast.timeZone.timeZone)}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <img src={weatherIcon(day.weatherCode, propSunrise, propSunrise, propSunset)} alt='weather icon' style={{ width: width > 800 ? '120%' : '80%' }} />
            </div>
            <div style={{ fontWeight: '600'}}>{day.highTemp}&deg;</div>
            <div style={{ fontWeight: '300'}}>{day.lowTemp}&deg;</div>
          </div>
        ))}
      </div>
    )
}