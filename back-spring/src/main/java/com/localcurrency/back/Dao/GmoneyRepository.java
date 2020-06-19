package com.localcurrency.back.Dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GmoneyRepository extends JpaRepository<Gmoney, Long> {

    @Query(value="select * from gmoney where id=?1", nativeQuery = true)
    Gmoney findById(String id);

    @Query(value = "select * , (6371 * acos(cos(radians(?1)) * cos(radians(REFINE_WGS84_LAT)) * cos(radians(REFINE_WGS84_LOGT) - radians(?2)) + sin(radians(?1)) * sin(radians(REFINE_WGS84_LAT)))) as distance \n" +
            "from gmoney where refine_wgs84_lat is not null and refine_wgs84_logt is not null having distance < 1;", nativeQuery = true)
    List<Gmoney> searchnear(double latitude, double longitude);

    @Query(value = "select * , (6371 * acos(cos(radians(?1)) * cos(radians(REFINE_WGS84_LAT)) * cos(radians(REFINE_WGS84_LOGT) - radians(?2)) + sin(radians(?1)) * sin(radians(REFINE_WGS84_LAT)))) as distance \n" +
            "from gmoney where refine_wgs84_lat is not null and refine_wgs84_logt is not null and indutpye_nm like %?3% having distance < 1;", nativeQuery = true)
    List<Gmoney> searchnear(double latitude, double longitude, String category);

    @Query(value = "select *, (6371 * acos(cos(radians(?1)) * cos(radians(REFINE_WGS84_LAT)) * cos(radians(REFINE_WGS84_LOGT) - radians(?2)) + sin(radians(?1)) * sin(radians(REFINE_WGS84_LAT)))) as distance  \n"+
            "from gmoney \n" +
            "where refine_wgs84_lat is not null and refine_wgs84_logt is not null \n" +
            "and INDUTPYE_NM not like '%학원%' \n" +
            "and INDUTPYE_NM not like '%편의점%' \n" +
            "and INDUTPYE_NM not like '%편 의 점%' \n" +
            "and INDUTPYE_NM not like '%음식%' \n" +
            "and INDUTPYE_NM not like '%주유소%' \n" +
            "and INDUTPYE_NM not like '%병원%'\n" +
            "and INDUTPYE_NM not like '%레져%'\n" +
            "and INDUTPYE_NM not like '%레저%'\n" +
            "and INDUTPYE_NM not like '%보건%'\n" +
            "and INDUTPYE_NM not like '%위생%'\n" +
            "and INDUTPYE_NM not like '%여행%'\n" +
            "and INDUTPYE_NM not like '%숙박%'\n" +
            "and INDUTPYE_NM not like '%의류%'\n" +
            "having distance < 1" , nativeQuery = true)
    List<Gmoney> findByCategoryEtc(double latitude, double longitude);
}
