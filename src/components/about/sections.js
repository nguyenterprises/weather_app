export const sections = [
    {
        section: 0,
        topic: "Why PurpleSky?",
        data: [
            "On the computer I used to check the weather with my original go-to - DarkSky.net, which unfortunately is no more thanks to Apple's buyout. Aside from being eerily accurate at times, the site's minimalistic layout yet direct and to the point format was visually appealing.",
            "PurpleSky takes cues from DarkSky's look and feel. Although it doesn't use the same proprietary radar technology for weather prediction, I displayed the charts and visuals to emulate DarkSky's features. All design was done by hand with plain CSS. Many times I was tempted to just use a package like Tailwind or MUI, but I decided to stick with unassisted styling."
        ]
    },
    {
        section: 1,
        topic: "Code & Design",
        data: [
            "ReactJS for code",
            "Plain CSS for styling",
            "No backend needed",
            "Github code"
            // "https://github.com/nguyenterprises/PurpleSky/tree/master"
        ]
    },
    {
        section: 2,
        topic: "APIs Used",
        data: [
            "Open-Meteo Weather for forecast data",
            "Rainview for map weather overlay",
            "Mapbox for geocoder and map",
            "NOAA weather.gov for weather descriptions and alerts",
            "Open Street Maps for reverse geocoding",
            "TimezoneDB for proper time setting"
        ]
    },
    {
        section: 3,
        topic: "Additional Packages",
        data: [
            "Cloudinary for assets and icons",
            "React-Use-Measure for element positioning",
            "Axios for APIs",
            "DotEnv for keys"
        ]
    },
    {
        section: 4,
        topic: "Afterthoughts",
        data: {
            link: "https://github.com/nguyenterprises/PurpleSky/tree/master",
            point1: "The program is more extensive than it appears on the surface. Several functions were compiled for adjusting the UNIX values with local time zones and mapping them for days and hours. Creating and looping through the bar charts from scratch was a bit lengthy but proved successful. The CSS was dependent on grid and flex layout properties. The program became more complicated than originally planned, hence the surplus amount of useState hooks utilized. I started out with just a few, but halfway through, I determined it would have been cleaner if I had used the useReducer hook. For efficiency, I also even considered using context api or even Redux (on a scalable level, if necessary). However, to be consistent, I followed through with just useState hooks and passed props through components.",
            point2: "Overall, it was a fruitful project that I may scale up in the future with a backend and themed backgrounds. You can see the code ",
            point3: ".  Styling was directly typed into the component, so any CSS has been removed for ease and clarity in reading. If you would like to see it along with the styling, you are welcome to contact me directly - ",
            email: "hanh@nguyenterprises.work"
        } 
    },
    {
        section: 5,
        topic: "Questions",
        data: [
            { question: "Was the base code written from scratch or was it cloned from github?", answer: "Written from scratch" },
            { question: "Was the code written following React best practices guidelines?", answer: "Yes" },
            { question: "Is the code written and laid out to be scalable?", answer: "Yes" },
            { question: "Was a package used for CSS?", answer: "No" },
            { question: "Where can I see the code?", answer: "Github code" },
            { question: "Where have you been all this time? I need you to work on a project for me!", answer: "Sure!"}
        ]
    },    
    {
        section: 6,
        topic: "React Best Practices",
        data: [
            { question: "Good folder structure?", answer: "Yes" },
            { question: "Structured import order?", answer: "Yes" },
            { question: "Functional components used?", answer: "Yes" },
            { question: "Code formatted before committing?", answer: "Yes" },
            { question: "Compound component pattern used?", answer: "Yes, Weather.jsx is the parent component" },
            { question: "Linter used?", answer: "Yes, ESLint" },
            { question: "Jest or React Testing Library used?", answer: "No, manually tested" },
            { question: "Typescript used?", answer: "Yes" },
            { question: "Lazy loading used?", answer: "No, not needed in this case" },
            { question: "Code splitting used?", answer: "No, not needed in this case" },
            { question: "Custom hooks for reusable logic?", answer: "Yes" },
            { question: "Error handling types used?", answer: "Yes, catch and log"},
            { question: "Unique key props?", answer: "Yes, when applicable"},
            { question: "useReducer hook used?", answer: "No, please see explanation in Afterthoughts section"}
        ]
    },
    {
        section: 7,
        topic: "Hope you enjoy."
    },
    {
        section: 8,
        topic: "Features",
        data: [
            "Farenheit to Celsius toggle option",
            "Wind arrow moves with wind direction",
            "UV Index color changes with index",
            "NOAA weather.gov alerts and descriptions appear when applicable",
            "Icons, backgrounds and timelines all sync with local time",
            "CSS responsive to screen size",
            "Weather layer loops over map",
            "Rain probability appears on card chart when applicable"
        ]
    },
]

