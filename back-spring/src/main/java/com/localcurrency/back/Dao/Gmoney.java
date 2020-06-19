package com.localcurrency.back.Dao;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name ="gmoney")
public class Gmoney {

    @Id
    @Column(name ="id") //아이디
    private int id;

    @Column(name ="SIGUM_NM") // 도시 군
    private String sigum_nm;

    @Column(name ="CMPNM_NM") // 상호명
    private String cmpnm_nm;

    @Column(name ="INDUTPYE_NM") // 업종
    private String indutpye_nm;

    @Column(name ="REFINE_ROADNM_ADDR") // 도로명주소
    private String refine_roadnm_addr;

    @Column(name ="REFINE_LOTNO_ADDR") //지번주소
    private String refine_lotno_addr;

    @Column(name ="TELNO") //전화번호
    private String telno;

    @Column(name ="REFINE_ZIP_CD") //우편번호
    private String refine_zip_cd;

    @NonNull
    @Column(name ="REFINE_WGS84_LAT") // 위도
    private Double refine_wgs84_lat;

    @NonNull
    @Column(name ="REFINE_WGS84_LOGT") //경도
    private Double refine_wgs84_logt;
}
