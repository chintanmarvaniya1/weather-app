import { createContext,useContext ,useState,useEffect} from "react";
import axios from "axios";

export const WeatherDataContext = createContext({})

export const UseWeatherData = () =>{
    return useContext(WeatherDataContext)
}

export const WeatherDataProvider = ({children}) =>{
    const [weather, setWeather] = useState({})
    const [values, setValues] = useState([])
    const [place, setPlace] = useState('Mumbai')
    const [thisLocation, setLocation] = useState('')

    const fetchWeather = async () => {
        const options = {
            method: 'GET',
            url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
            params: {
                aggregateHours: '24',
                location: place,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames: 0,
            },
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
            }
        }

        try {
            const response = await axios.request(options);
            //console.log(response.data)
            const thisData = Object.values(response.data.locations)[0]
            setLocation(thisData.address)
            setValues(thisData.values)
            //console.log(thisData.values[0])
            setWeather(thisData.values[0])
        } catch (e) {
            console.error(e);
            alert('This place does not exist')
        }
    }

    useEffect(() => {
        fetchWeather()
    }, [place])

    useEffect(() => {
    }, [values])

    return(
        <WeatherDataContext.Provider value={
            {
            weather,
            setPlace,
            values,
            thisLocation,
            place}}>
            {children}
        </WeatherDataContext.Provider>
    )

}