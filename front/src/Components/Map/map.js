import React, { useEffect, useState } from 'react'
import makeMap, { hideMarkers, showMarkers } from 'Utils/Map/makeMap'
import { Paper, Typography, Button, Input, Box, Grid } from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core'
import { getStoreByAddress, useFetch, getStoreByAddress2 } from 'Apis/gets'
import { ClipLoader } from "react-spinners";
import food from 'img/음식.png'
import cafe from 'img/카페.png'
import cult from 'img/문화.png'
import drink from 'img/술집.png'
import conv from 'img/편의점.png'
import resur from 'img/레저.png'

import axios from "axios";

import { getStoreByCposi } from '../../Apis/gets';



const styles = makeStyles((theme) => ({

    container: {
        margin: 8 + 'px',
        width: 95 + '%',
        radius_border: 5 + 'px',
        borderRadius: 5,
        borderColor: '#fc9003',
        position: "absolute",
        top: 40 + 'px',
        zIndex: 999,
        marginTop: 30,
        marginBottom: 30,
        background: "#fff",
        border: "solid",

    },
    container_detail: {
        height: 0,
        margin: 8 + 'px',
        width: 95 + '%',
        radius_border: 5 + 'px',
        borderRadius: 5,
        borderColor: '#fc9003',
        position: "absolute",
        top: 200 + 'px',
        zIndex: 999,
        marginTop: 30,
        marginBottom: 30,
        background: "#fff",
    },
    container_detail2: {
        bottom: 4 + 'px',
        position: 'absolute',
        width: 100 + '%',
        zIndex: 9999
    },
    row: {
        flexWrap: 'nowrap'
    },

    searchfield: {
        padding: 5,
        margin: 5
    },
}))


function showMarker() {
    showMarkers("food")
}
function hideMarker() {
    hideMarkers("food")
}



export default function Map(props) {
    const { loaded, area, addr, ddata, posi, select, region, setDdata, setLoading } = useFetch()
    const [isK, setIsK] = useState(false);
    const [address, setAddress] = useState("")
    const classes = styles();
    const [tempposi, setTempposi] = useState('')


    async function getD(address, category) {
        setLoading(true)
       
        let res =[]
        let res2 =[]
        res = await axios.get(process.env.REACT_APP_PUBLIC_API_URL+'/townandcategory/' + address + '/' + category)
        console.log(res)
        // setTempposi({lat:res.data[0].refine_wgs84_lat, long: res.data[0].refine_wgs84_logt})
        if (category == '편의점') {
             res2 = await axios.get(process.env.REACT_APP_PUBLIC_API_URL+'/townandcategory/' + address + '/' + '편 의 점')
             setDdata(res.data.concat(res2.data))
        }else{
            setDdata(res.data)
        }
        setLoading(false)
    }

    const changeMarker = (e) => {
     
        if (address == '') {
            console.log(region)
            getD(region, e.currentTarget.value)
        }
        else { getD(address, e.currentTarget.value) }
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e.target.value);
            e.target.value = ''
        }
    };

    async function handleSearch(value) {
        setAddress(value)
        setLoading(true);
        await getStoreData(value)
        setLoading(false);
        setIsK(true)
    }

    const getStoreData = (address) => {

        // return new Promise(function (resolve, redux) {
        //     const res = getStoreByAddress(address)
        //     getStoreByAddress2(address)
        //     resolve(res);
        // }).then(res => {
        //     setDdata(res.data.RegionMnyFacltStus[1].row)
        // })
        return new Promise(function (resolve, redux) {
            const res = getStoreByAddress2(address)
            // getStoreByAddress2(address)
            const res2 = getStoreByCposi('category', posi)
            console.log(res2)
            console.log(res)
            resolve(res);
        }).then(res => {
            setDdata(res.data)
            setTempposi({lat:res.data[0].refine_wgs84_lat, long: res.data[0].refine_wgs84_logt})
        })
    }

    useEffect(() => { // didmounthook
        if (!loaded) {
            console.log(address)
            makeMap(ddata, address, posi,tempposi)
            showMarkers("total") // 최초에 모든 마커 불러옴
        }
    });
    return (
        <Box >
            {loaded ? (
                <ClipLoader />
            ) : (
                    <Box width={1} height={1}>

                        <Box className={classes.root} id="map" width={1} height={600} top={30} ></Box>
                        <Grid item md={6} sm={6} lg={4} className={classes.container} container spacing={1}>
                            <Grid item xs={12} md={12} sm={12} lg={12}>
                                <Input fullWidth={true} onKeyPress={handleKeyPress} placeholder="주소를 입력하세요" />
                            </Grid>
                            <Grid item xs={12} md={12} sm={12} lg={12}>
                                <Box className={classes.category} >
                                    <FormControl >
                                        <RadioGroup className={classes.row} row defaultValue="top">
                                            <Button
                                                onClick={changeMarker}
                                                value="음식"
                                                control={<Radio color="primary" />}
                                                label="음식"
                                                labelPlacement="top"
                                            >
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <Typography>음식</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <img src={food} width={45}></img>
                                                    </Grid>
                                                </Grid>
                                            </Button>
                                            <Button
                                                onClick={changeMarker}
                                                value="편의점"
                                                control={<Radio color="primary" />}
                                                label="편의점"
                                                labelPlacement="top"
                                            >
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <Typography>편의점</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <img src={conv} width={45}></img>
                                                    </Grid>
                                                </Grid>
                                            </Button>
                                            <Button
                                                onClick={changeMarker}
                                                value="레저"
                                                control={<Radio color="primary" />}
                                                label="레저"
                                                labelPlacement="top"
                                            >
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <Typography>레저</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <img src={resur} width={45}></img>
                                                    </Grid>
                                                </Grid>
                                            </Button>
                                            <Button
                                                onClick={changeMarker}
                                                value="병원"
                                                control={<Radio color="primary" />}
                                                label="병원"
                                                labelPlacement="top"
                                            >
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <Typography>병원</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <img src={cult} width={45}></img>
                                                    </Grid>
                                                </Grid>
                                            </Button>
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                            </Grid>
                            {/* <Grid item xs={12} md={12} sm={12} lg={12}>
                                <Box id="detail">
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={12} sm={12} lg={12}>
                                <Box   id="detail1">
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={12} sm={12} lg={12}>
                                <Box  id="detail2">
                                </Box>
                            </Grid> */}
                        </Grid>
                        <Box className={classes.container_detail2}>
                            <Grid item xs={12} md={12} sm={12} lg={12}>
                                <Box id="detail">
                                </Box>
                                <Box id="detail1">
                                </Box>
                                <Box id="detail2">
                                </Box>
                            </Grid>
                            {/* <Grid item xs={12} md={12} sm={12} lg={12}>
                                <Box   id="detail1">
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={12} sm={12} lg={12}>
                                <Box  id="detail2">
                                </Box>
                            </Grid> */}
                        </Box>
                        {/* <Grid item md={6} sm={6} lg={4} className={classes.container_detail} container spacing={1}>
                        </Grid> */}
                    </Box>
                )}
            <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=84b050274e5e1c6da8d55c7ad12c0feb&libraries=services"></script>
        </Box>
    )
}