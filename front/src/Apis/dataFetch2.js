import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (request)=> {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [cposition, setCposition] = useState("");// 여기다가 현재위치 set해서 axios 요청 하고싶음
  const url = process.env.REACT_APP_PUBLIC_API_URL + request;
  const geocoder = new window.kakao.maps.services.Geocoder();

  
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      searchAddrFromCoords( position.coords.longitude,position.coords.latitude,fetch)
  });
  
  function searchAddrFromCoords(coord1,coord2, callback, callbackobj) {
      // 좌표로 행정동 주소 정보를 요청합니다
     geocoder.coord2Address(coord1, coord2, callback, callbackobj);         
  }
   
    const fetch = async (result, status) => {
      try {

        console.log(result[0].address.address_name ) // 근데 여기서는 안찍힘 
        setLoading(true);
        setData({});
        const response = await axios.get("https://cors-anywhere.herokuapp.com/"+url);
        // 밑에처럼 할려고 했는데 밑에처럼 하면 안됨 ㅠ 
        // const response = await axios.get("https://cors-anywhere.herokuapp.com/"+url+"&REFINE_LOTNO_ADDR="+cposition);
        console.log(response)
        setData(response.data.RegionMnyFacltStus[1].row);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
  console.log(data)
  return {
    loading,
    data,
  };
}
