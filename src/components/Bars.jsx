import React, { useState } from 'react'
import { returnBarBackground, returnGridContent } from "../functions/barCount";
import { humanTimeDayOfWeek, humanTimeHour, timeLowerCase } from "../functions/time";
import { weatherAka, weatherBarColor, weatherDailyBarIcon } from "../functions/weatherCodes";
import { colorOrTransparent } from '../functions/colorOrTransparent'
import { sliceOfDay } from '../functions/sliceOfDay';
import useWidth from '../ui/useWidth';


export const TopHourlyBar = ({ forecast, start, end }) => {
    const width = useWidth();
    let sliced = forecast.hourly.slice(start, end);
    let barData = [];
    for (let i = 0; i < sliced.length; i++) {
      let evod;
      (i % 2 === 0) ? evod = 'even' : evod = 'odd';
      barData.push({ unix: sliced[i].timestamp, time: humanTimeHour(sliced[i].timestamp, forecast.timeZone.timeZone), weatherAka: weatherAka(sliced[i].weatherCode), temperature: sliced[i].temperature, line: evod, barColor: weatherBarColor(sliced[i].weatherCode) });
    };
    const barBackground = returnBarBackground(barData);
    const barDescriptions = returnGridContent(barData);

    return(
      <div style={{ width: '100%', marginTop: '1em'}}>
        <div style={{ background: barBackground, height: '50px', borderRadius: '10px', display: 'grid', gridTemplateColumns: 'repeat(25, 4%)' }}>
          {barData.map((bd, key) => (
            <div key={key} style={{ transform: 'translateY(90%)', display: 'grid', placeItems: 'center', marginLeft: 'calc(-10px - 1.5625vw)'}} >
              <div style={{ transform: (bd.line === 'even') ? "translateY(-30%)" : "" }}>
                <img src={(bd.line === 'even') ? 'https://res.cloudinary.com/dmjhwxcjh/image/upload/v1679903800/weather/line_short_black_debszy.svg' : 'https://res.cloudinary.com/dmjhwxcjh/image/upload/v1679903800/weather/line_long_black_c8sxuz.svg'} alt='line' style={{ rotate: '90deg', visibility: (bd.line === 'odd' && width < 500) ? 'hidden' : 'visible' }} />
              </div>
              <div style={{ color: colorOrTransparent(bd.line, key), fontSize: '.8rem', fontWeight: '600', marginTop: '-0.25em', transform: key === 0 ? 'translateX(50%)' : "" }}>{(key === 0 && bd.unix === forecast.current.currentTime) ? 'Now' : timeLowerCase(bd.time)}</div>
              <div style={{ color: colorOrTransparent(bd.line, key), fontSize: '1.1rem', fontWeight: '300', marginTop: '.1em', transform: key === 0 ? 'translateX(50%)' : "" }}>{bd.temperature}&deg;</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: barDescriptions.gridContent, transform: 'translateY(-100%)', height: '50px' }}>
          {barDescriptions.sequences.map((sq, key) => (
            <div key={key} style={{ visibility: sq.length > 4 ? 'visible' : 'hidden', display: 'grid', placeItems: 'center', fontSize: '1rem', fontWeight: '200' }}>
              {sq.value}
            </div>
          ))}
        </div>
      </div>
    )
};

export const DailyHighLowBars = ({ forecast }) => {

  const daySlices = [
    { day: 1, start: 0, end: 25 },
    { day: 2, start: sliceOfDay(forecast, 1).start, end: sliceOfDay(forecast, 1).end + 2 },
    { day: 3, start: sliceOfDay(forecast, 2).start, end: sliceOfDay(forecast, 2).end + 2 },
    { day: 4, start: sliceOfDay(forecast, 3).start, end: sliceOfDay(forecast, 3).end + 2 },
    { day: 5, start: sliceOfDay(forecast, 4).start, end: sliceOfDay(forecast, 4).end + 2 },
    { day: 6, start: sliceOfDay(forecast, 5).start, end: sliceOfDay(forecast, 5).end + 2 },
    { day: 7, start: sliceOfDay(forecast, 6).start, end: sliceOfDay(forecast, 6).end + 2 },
    { day: 8, start: sliceOfDay(forecast, 7).start, end: sliceOfDay(forecast, 7).end + 2 },
  ];

  const dailyHighLowTemps =  forecast.daily.map((w, index) => {
      return { 
        highTemp: w.highTemp,
        lowTemp: w.lowTemp,
        timestamp: humanTimeDayOfWeek(w.timestamp, forecast.timeZone.timeZone),
        weatherCode: w.weatherCode,
        day: daySlices[index].day,
        start: daySlices[index].start,
        end: daySlices[index].end
      }
  })

  let weekHighTemps = forecast.daily.map(high => high.highTemp);
  const weekHigh = Math.max(...weekHighTemps)
  let weekLowTemps = forecast.daily.map(low => low.lowTemp);
  const weekLow = Math.min(...weekLowTemps)
  const findPostion = (num, high, low) => {
    let position = (num - low) / (high - low) * 100;
    return parseInt(position.toFixed(0))
  }
  const gtcPositions = (dailyHigh, dailyLow, weekHigh, weekLow) => {
    let low = findPostion(dailyLow, weekHigh, weekLow);
    let high = findPostion(dailyHigh, weekHigh, weekLow);
    let left = low + 4;
    let middle = (high - low) - 8;
    let right = (100 - high) + 4;
    const gtcPos = `${left}% ${middle}% ${right}%`;
    return gtcPos
  }

  const BarUnit = (props, key) => {
    
    const [barHour, setBarHour] = useState(false);

    return(
      
        <div key={key}  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '0em'}}>
          
          <div style={{ display: 'grid', gridTemplateColumns: (!barHour) ? '10% auto 10%' : 'auto 9%', columnGap: '3em', padding: '0em 1em' }}>

            <div style={{ display: 'flex', flexDirection: 'row', columnGap: '.25em', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: '500' }} >
              <img src={weatherDailyBarIcon(props.daily.weatherCode)} alt='weather icon' style={{ width: (!barHour) ? '100%' : '20%' }} />
              <div>{props.daily.timestamp}</div>
            </div>

            {!barHour &&
              <div style={{ display: 'grid', gridTemplateColumns: gtcPositions(props.daily.highTemp, props.daily.lowTemp,  weekHigh, weekLow), columnGap: '1em', alignSelf: 'center' }}>
                <div style={{ background: 'transparent', textAlign: 'right', alignSelf: 'center', fontSize: '.9rem', fontWeight: '500' }}>{props.daily.lowTemp}&deg;</div>
                <div style={{ background: '#464E51', borderRadius: '20px', height: '80%' }}></div>
                <div style={{ background: 'transparent', alignSelf: 'center', fontSize: '.9rem', fontWeight: '500' }}>{props.daily.highTemp}&deg;</div>
              </div>
            }

            <div style={{ display: 'grid', alignSelf: 'center', justifySelf: 'end', width: (!barHour) ? '35%' : '40%'  }} onClick={()=> {setBarHour(prevValue => !prevValue);}} >
              <img src={(!barHour) ? 'https://res.cloudinary.com/dmjhwxcjh/image/upload/v1678992805/weather/plus_icon_q9fm1t.svg' : 'https://res.cloudinary.com/dmjhwxcjh/image/upload/v1678992804/weather/minus_icon_p25snh.svg'} alt='hour-bar' style={{ width: '100%' }} />
            </div>
          
          </div>

          {barHour &&
              <div style={{  display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginBottom: '1em', marginTop: '-1em', padding: '.5em .5em .5em 1em', width: '100%' }}>
                <TopHourlyBar forecast={forecast} start={props.daily.start} end={props.daily.end} />
              </div>
          }

        </div>
      
    )
  };

  return(
    <div style={{ width: '100%' }} >

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '1em' }}>
        {dailyHighLowTemps.map((daily, key) => (
          <BarUnit key={key} daily={daily} />
        ))}
      </div>
    </div>
  )

};

