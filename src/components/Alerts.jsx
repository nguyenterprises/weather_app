import React, { useState } from 'react'

function NWSAlerts ({ alerts }) {
    const [alertDetails, setAlertDetails] = useState();

    return (
        <div style={{
            marginTop: '4em',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '60%'
        }} >

            <div style={{ textAlign: 'center', width: '100%' }}>
                <div
                    onClick={() => setAlertDetails(!alertDetails)}
                    style={{ fontSize: '1.2rem', fontWeight: '400', display: 'flex', flexDirection: 'row', columnGap: '.5em', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                    <span>{alerts.severity} {alerts.event}</span>
                    {alerts.description && <span>{(!alertDetails) ? '+' : '--'}</span>}
                </div>

                {alertDetails &&
                    <div style={{ marginTop: '1em', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', rowGap: '.5em' }}>
                        <div>{alerts.description}</div>
                        <div>{alerts.instruction}</div>
                    </div>
                }
            </div>
        
        </div>
    )
};

export default NWSAlerts