import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (props)=> {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [cposition, setCposition] = useState("");// 여기다가 현재위치 set해서 axios 요청 하고싶음
  const url = process.env.REACT_APP_PUBLIC_API_URL +"&REFINE_LOTNO_ADDR=" ;
  const geocoder = new window.kakao.maps.services.Geocoder();

  useEffect(() => {

    const fetch = async (address) => {
      try {

        // console.log(result[0].address.address_name ) // 근데 여기서는 안찍힘 
        // setLoading(true);
        setData({});
        const response = await axios.get("https://cors-anywhere.herokuapp.com/"+url+"&REFINE_LOTNO_ADDR="+address );
        // 밑에처럼 할려고 했는데 밑에처럼 하면 안됨 ㅠ 
        // const response = await axios.get("https://cors-anywhere.herokuapp.com/"+url+"&REFINE_LOTNO_ADDR="+cposition);
        console.log(url)
        console.log(response)
        setData(response.data.RegionMnyFacltStus[1].row);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };


     fetch(props);
  },[]);
  
  console.log(data)
  console.log(url)
  return {
    loading,
    data,
  };
}
