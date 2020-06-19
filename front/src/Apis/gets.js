import { useState, useEffect } from "react";
import axios from "axios";

const url = process.env.REACT_APP_PUBLIC_API_URL;

export function getStoreByAddress(address) {

  return axios.get(url + "&REFINE_LOTNO_ADDR=" + address);
}

export function getStoreByAddress2(address) {
  return axios.get(url+'/town/' + address)
}

export function getStoreByCposi(category, posi) {
  return axios.post(
    url+'/gmoney/' + '음식',
    {
      latitude: posi.latitude,
      longitude: posi.longitude
    }
  )
}


export function getStoreByid(address) {

  return axios.get(url+'/storeinfos/' + address)
}




export const useFetch = (props) => {
  const [loaded, setLoading] = useState(true);// 로딩
  const [select, setSelect] = useState();// 로딩
  const [area, setArea] = useState([]);// 행정도 경기도인지 아닌지 판단하기 위해서, 
  const [addr, setAddr] = useState([]);// 풀 주소 지번
  const [ddata, setDdata] = useState();// 데이터
  const [region, setRegion] = useState([]);// 행정동 검색을 위해서
  const [posi, setPosi] = useState();// 현재위치 경도위도


  const geocoder = new window.kakao.maps.services.Geocoder();


  useEffect(() => {

    async function getCposi2() {

      const respose = await getC(function (res) {
        console.log(res)//현재위치
        setPosi(res.coords)
        const ccc = getA(res.coords)
        console.log(ccc)
            searchAddrFromCoords(res.coords.longitude, res.coords.latitude, function (res) {
            console.log(res)
            setArea(res[0].address.region_1depth_name)// 경기도인지 아닌지
            setRegion(res[0].address.region_3depth_name)// 행정동
            setAddr(res[0].address.address_name)// 풀 주소
            if (res[0].address.region_1depth_name == "경기도" || res[0].address.region_1depth_name == "경기") {
              const re = getB(function (res) { // 행정동으로 데이터 axios 통신
                // setDdata(res.data)
              }, res[0].address.region_3depth_name)
            }
            setLoading(false)
          })
        // if(ccc !== undefined){
          // setDdata(ccc.data)
          // setLoading(false)
        // }
        // else{
          // searchAddrFromCoords(res.coords.longitude, res.coords.latitude, function (res) {
          //   console.log(res)
          //   setArea(res[0].address.region_1depth_name)// 경기도인지 아닌지
          //   setRegion(res[0].address.region_3depth_name)// 행정동
          //   setAddr(res[0].address.address_name)// 풀 주소
          //   if (res[0].address.region_1depth_name == "경기도" || res[0].address.region_1depth_name == "경기") {
          //     const re = getB(function (res) { // 행정동으로 데이터 axios 통신
          //       setDdata(res.data)
          //     }, res[0].address.region_3depth_name)
          //   }
          //   setLoading(false)
          // })
        // }
      })

      async function getA(coords) {
        const res = await axios.post(   url+'/gmoney/' + '음식',
        {
          latitude: coords.latitude,
          longitude: coords.longitude
        }).then(res => {
          console.log(res)
          setDdata(res.data)
        }).then(setLoading(false));
      }

      async function getB(fn, region) {
        console.log(region)
        const res = await axios.get(url+'/town/' + region).then(res => {
          console.log(res)
          fn(res)
        });
      }

      async function getC(fn) {
        await navigator.geolocation.getCurrentPosition((position) => {
          fn(position);
        });
      }

      async function getD(address,category) {
        const res = await axios.post(   url+'/townandcategory/'+address+'/'+category).then(res => {
          console.log(res)
          setDdata(res.data)
        }).then(setLoading(false));
      }

      function searchAddrFromCoords(coord1, coord2, fn) {
        geocoder.coord2Address(coord1, coord2, function (result, status) {
          fn(result);
        });
      }

    }

    getCposi2();

  }, []);
  console.log(addr)
  console.log(area)

  return {
    loaded,
    area,
    addr,
    ddata,
    posi,
    select,
    region,
    setDdata,
    setLoading,
  };
}
