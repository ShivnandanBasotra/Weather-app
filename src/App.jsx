import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios"

const popularCities = [
  "Kathua",
  "Jammu",
  "Hiranagar",
  "Srinagar",
  "Udhampur",
  "Samba",
  "Katra",
  "kargil",
  "Kulgam",
  "Bandipura",
  "Doda",
]

const apiKey = 'dc30b4b91ddbf57c7acf7846a9ef8db8';
const IndiaCountryCode = 'IN';
const JKStateCode = 'IN-JK'


export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    humidity: 0,
    windSpeed: 0,
  });

  const handleSearch =  async (value) => {
    
    try {
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${value},${JKStateCode},${IndiaCountryCode}&appid=${apiKey}`
      const response = await axios.get(api);
      console.log(response);
      
      setWeatherData({
        temperature: (response.data.main.temp - 273.15).toFixed(2),
        humidity: response.data.main.humidity,
        windSpeed: (response.data.wind.speed * 3.6).toFixed(1),
      })
      
    } catch (error) {
      console.log(error.message);
      console.log(error.response?.data?.message);
    }
  }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Weather App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div> */}
            <Select onValueChange={(value)=>{
              setCity(value);
              handleSearch(value);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a popular city" />
              </SelectTrigger>
              <SelectContent>
                {popularCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500">Temperature</p>
                    <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500">Humidity</p>
                    <p className="text-2xl font-bold">{weatherData.humidity}%</p>
                  </div>
                  <div className="text-center col-span-2">
                    <p className="text-sm font-medium text-gray-500">Wind Speed</p>
                    <p className="text-2xl font-bold">{weatherData.windSpeed} km/h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

