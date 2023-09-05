import React from 'react'
import { weatherIcon, weatherAka } from "../functions/weatherCodes";


export const TitleSection = ({ forecast, nws }) => {

    return (
        <div style={{
            marginTop: '0em',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>

            <div style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                display: 'flex',
                flexDirection: 'row',
                columnGap: '.25em',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                <img src={weatherIcon(forecast.current.weatherCode, forecast.current.currentTime, forecast.daily[0].sunrise, forecast.daily[0].sunset)} alt='weather icon' />
                <span style={{ fontSize: '2.5rem' }}>{forecast.current.currentTemp}&deg;</span>
                <span style={{ fontSize: '1.5rem', textAlign: 'center' }}>{(nws.shortForecast) ? nws.shortForecast : weatherAka(forecast.current.weatherCode)}.</span>
            </div>
            {nws.detailedForecast && <div style={{ width: '60%',minWidth: '275px', marginTop: '0em', textAlign: 'center'}}>{nws.detailedForecast}.</div>}
        
        </div>

    )

};

