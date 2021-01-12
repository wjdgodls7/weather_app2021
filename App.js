import React from 'react';
import Loading from './Loading';
import * as Location from "expo-location";
import { Alert } from "react-native";
import axios from "axios";
import Weather from "./Weather"

const API_KEYS = "f31a63d3c7749fc6fd71b74548f8bb6f";

export default class extends React.Component {
  state = {
    isLoading: true
  }
  getweather = async (latitude, longitude) => {
    const { data: { main: { temp }, weather } } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEYS}&units=metric`
    )
    this.setState({
      isLoading: false,
      temp: temp,
      condition: weather[0].main
    });
    console.log(this.state.condition);
  }

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      this.getweather(latitude, longitude);
    } catch (error) {
      Alert.alert("쏘리", "넌 실패했어");
    }
  }
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? <Loading /> : <Weather temp={temp} condition={condition} />;
  }
}
