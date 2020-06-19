import food from 'img/음식.png'
import cposi from 'img/현재위치.png'
import react, { useState, useEffect } from "react";
import { getStoreByid } from 'Apis/gets'



var markers_food = []
var overlay_food = []
var markers_some = []
var markers_cafe = []
var markers_gita = []
var markers_total = []
var overlay_total = []
var overlay2_total = []


var Map = null
var options = null
var container2 = null
export default function makeMap(data, address, posi,tempposi) {

    markers_food = []
    overlay_food = []
    markers_some = []
    markers_cafe = []
    markers_gita = []
    markers_total = []
    overlay_total = []
    overlay2_total = []


    console.log(data)
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    // container2 = document.getElementById('detail');

    if (data !== undefined && data.length !== 0) { //현재위치가 데이터 제공 위치일 경우
        if (address == '') {//아직 검색이 되지 않았을때
            options = { //지도를 생성할 때 필요한 기본 옵션
                center: new window.kakao.maps.LatLng(posi.latitude, posi.longitude), //지도의 중심좌표.
                level: 3 //지도의 레벨(확대, 축소 정도)
            };
        } else {
            options = { //지도를 생성할 때 필요한 기본 옵션
                center: new window.kakao.maps.LatLng(data[0].refine_wgs84_lat, data[0].refine_wgs84_logt), //지도의 중심좌표.
                level: 3 //지도의 레벨(확대, 축소 정도)
            };
        }
    } else {
        if(tempposi !== ''){
            options = { //지도를 생성할 때 필요한 기본 옵션
                center: new window.kakao.maps.LatLng(tempposi.lat, tempposi.long), //지도의 중심좌표.
                level: 3 //지도의 레벨(확대, 축소 정도)
            };
        }else{
            options = { //지도를 생성할 때 필요한 기본 옵션
                center: new window.kakao.maps.LatLng(posi.latitude, posi.longitude), //지도의 중심좌표.
                level: 3 //지도의 레벨(확대, 축소 정도)
            };
        }
    }

    Map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    var imageSrc = food;
    var imageSrc1 = cposi;

    // var markers = []

    if (data !== undefined && data.length !== 0) {//현재위치가 데이터 제공 위치일 경우

        var imageSize = new window.kakao.maps.Size(50, 50);
        var markerImage = new window.kakao.maps.MarkerImage(imageSrc1, imageSize);
        var markerPosition = new window.kakao.maps.LatLng(posi.latitude, posi.longitude);
        var marker = new window.kakao.maps.Marker({
            map: Map, // 마커를 표시할 지도
            position: markerPosition, // 마커를 표시할 위치
            title: "현재위치", // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커 이미지 

        });
        console.log()
        var content = '<div style="position:relative;bottom:50px;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;" >' +
            '    <span style="display:block;text-align:center;background:#fff;padding:5px 10px;font-size:10px;font-weight:bold;">' + '여기 계신가요?' + '</span>' +
            '  </a>' +
            '</div>';

        // 커스텀 오버레이를 생성합니다
        var customOverlay = new window.kakao.maps.CustomOverlay({
            map: Map,
            position: markerPosition,
            content: content,
            yAnchor: 1
        });
        for (var i = 0; i < data.length; i++) {

            var imageSize = new window.kakao.maps.Size(24, 35);
            var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
            var markerPosition = new window.kakao.maps.LatLng(data[i].refine_wgs84_lat, data[i].refine_wgs84_logt);
            var marker = new window.kakao.maps.Marker({
                // map: Map, // 마커를 표시할 지도
                position: markerPosition, // 마커를 표시할 위치
                title: data[i].cmpnm_nm, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage, // 마커 이미지 
            });
            var content = '<div style="position:relative;bottom:35px;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;" >' +
                '  <a href="https://map.kakao.com/link/search/' + data[i].cmpnm_nm + ' ' + address + '" target="_blank" style="display:block;text-decoration:none;color:#000;text-align:center;border-radius:6px;font-size:10px;font-weight:bold;overflow:hidden;background: #d95050;background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;">' +
                '    <span style="display:block;text-align:center;background:#fff;margin-right:35px;padding:5px 10px;font-size:10px;font-weight:bold;">' + data[i].cmpnm_nm + '</span>' +
                '  </a>' +
                '</div>';


            // 커스텀 오버레이를 생성합니다
            var customOverlay = new window.kakao.maps.CustomOverlay({
                // map: Map,
                position: markerPosition,
                content: content,
                yAnchor: 1
            });




            window.kakao.maps.event.addListener(marker, 'click', makeOverListener(Map, marker, markerPosition, customOverlay, data[i]));

            markers_total.push(marker)
            overlay_total.push(customOverlay)


            if (data[i].indutpye_nm.includes('음식')) {
                markers_food.push(marker)
                // overlay_food.push(customOverlay)
            }
        }
    } else {
        var imageSize = new window.kakao.maps.Size(50, 50);
        var markerImage = new window.kakao.maps.MarkerImage(imageSrc1, imageSize);
        var markerPosition = new window.kakao.maps.LatLng(posi.latitude, posi.longitude);
        var marker = new window.kakao.maps.Marker({
            map: Map, // 마커를 표시할 지도
            position: markerPosition, // 마커를 표시할 위치
            title: "현재위치", // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커 이미지 

        });
        var content = '<div style="position:relative;bottom:50px;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;" >' +
            '    <span style="display:block;text-align:center;background:#fff;padding:5px 10px;font-size:10px;font-weight:bold;">' + '여기 계신가요?' + '</span>' +
            '  </a>' +
            '</div>';

        // 커스텀 오버레이를 생성합니다
        var customOverlay = new window.kakao.maps.CustomOverlay({
            map: Map,
            position: markerPosition,
            content: content,
            yAnchor: 1
        });
    }

}

export function showMarkers(type) {
    hideMarkers("total")
    setMarkers(Map, type)
}

export function hideMarkers(type) {
    setMarkers(null, type);
    setOverlays(null, type)
}

function setMarkers(map, type) {

    if (type == "total") {
        for (var i = 0; i < markers_total.length; i++) {
            markers_total[i].setMap(map);
        }
    }
    else if (type == "food") {
        for (var i = 0; i < markers_food.length; i++) {
            markers_food[i].setMap(map);

        }
    }
}

function setOverlays(map, type) {
    if (type == "total") {
        for (var i = 0; i < overlay_total.length; i++) {
            overlay_total[i].setMap(map);
        }
    }
    else if (type == "food") {
        for (var i = 0; i < overlay_food.length; i++) {
            overlay_food[i].setMap(map);
        }
    }
}

function makeOverListener(map, marker, markerPosition, infowindow, data) {
    return async function () {
        const res = await getStoreByid(data.id)
        console.log(res)
        console.log(data)
                map.setCenter(markerPosition)
                setOverlays(null, 'total')
                infowindow.setMap(map);

                document.getElementById('detail').setAttribute('style' ,''); 
                document.getElementById('detail1').setAttribute('style' ,''); 
                document.getElementById('detail2').setAttribute('style' ,''); 
                while (document.getElementById('detail').hasChildNodes()) { 
                    document.getElementById('detail').removeChild(document.getElementById('detail').firstChild);
                    // document.getElementById('detail').setAttribute('style' ,''); 
                }
                while (document.getElementById('detail1').hasChildNodes()) { 
                    document.getElementById('detail1').removeChild(document.getElementById('detail1').firstChild);
                    // document.getElementById('detail').setAttribute('style' ,'');  
                }
                while (document.getElementById('detail2').hasChildNodes()) { 
                    document.getElementById('detail2').removeChild(document.getElementById('detail2').firstChild); 
                    // document.getElementById('detail').setAttribute('style' ,''); 
                }
            var jbBtn = document.createElement('text');
            var name = document.createElement('text');
            var nname = document.createTextNode('주소 : ');
            var jbBtnText = document.createTextNode(data.refine_lotno_addr );
            name.appendChild(nname)
            jbBtn.appendChild(jbBtnText);
            document.getElementById('detail').setAttribute('style', 'padding:5px; border:solid;border-color:#fc9003; background: #fff;')
            document.getElementById('detail').appendChild(name);
            document.getElementById('detail').appendChild(jbBtn);
            
        if(res.data !== ""){

    
    
            var jbBtn1 = document.createElement('text');
            var jbBtn2 = document.createElement('text');
    
            var info = document.createElement('text');
            var menu = document.createElement('text');
    
            var iinfo = document.createTextNode('정보 : ');
            var mmenu = document.createTextNode('메뉴 : ');
            
            var jbBtnText1 = document.createTextNode(res.data.infomation);
            var jbBtnText2 = document.createTextNode( res.data.menus);
    
            info.appendChild(iinfo)
            menu.appendChild(mmenu)
    
            jbBtn1.appendChild(jbBtnText1);
            jbBtn2.appendChild(jbBtnText2);
            
            
            // document.getElementById('detail').appendChild(name);
            if(res.data.infomation !== null && res.data.infomation !== undefined){
                document.getElementById('detail1').setAttribute('style', 'padding:5px; border:solid;border-color:#fc9003; background: #fff;')
                document.getElementById('detail1').appendChild(info);
                document.getElementById('detail1').appendChild(jbBtn1);
            }
            if(res.data.menus !== null && res.data.infomation !== undefined){
                document.getElementById('detail2').setAttribute('style', 'padding:5px; border:solid;border-color:#fc9003; background: #fff;')
                document.getElementById('detail2').appendChild(menu);
                document.getElementById('detail2').appendChild(jbBtn2);
            }
    
    
            // document.getElementById('detail').appendChild(jbBtn);
        }
    }
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
    return function () {
        infowindow.setMap(null);
    };
}

