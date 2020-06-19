package com.localcurrency.back.Dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface CurrencyRepository extends JpaRepository<Currency, Long> {

    @Query(value = "select * from currency where refine_lotno_addr like %?1% and indutpye_nm like %?2%", nativeQuery = true)
    List<Currency> searchtownandcategory(String town, String category);

    @Query(value = "select * from currency where currency.CMPNM_NM like %?1% and refine_wgs84_lat is not null and refine_wgs84_logt is not null", nativeQuery = true)
    List<Currency> searchname(String name);

    @Query(value = "select * from currency where currency.REFINE_LOTNO_ADDR like %?1% and refine_wgs84_lat is not null and refine_wgs84_logt is not null", nativeQuery = true)
    List<Currency> searchtown(String town);

    @Query(value="select * from currency where sigum_nm like %?1% and refine_lotno_addr like %?2% ", nativeQuery = true)
    List<Currency> searchsiandtown(String si, String town);

    @Query(value = "select * from currency where currency.INDUTPYE_NM like %?1% and refine_wgs84_lat is not null and refine_wgs84_logt is not null", nativeQuery = true)
    List<Currency> searchcategory(String category);

    @Query(value = "select * , (6371 * acos(cos(radians(?1)) * cos(radians(REFINE_WGS84_LAT)) * cos(radians(REFINE_WGS84_LOGT) - radians(?2)) + sin(radians(?1)) * sin(radians(REFINE_WGS84_LAT)))) as distance \n" +
            "from currency where refine_wgs84_lat is not null and refine_wgs84_logt is not null and indutpye_nm like %?3% having distance < 1;", nativeQuery = true)
    List<Currency> searchnear(double latitude, double longitude, String category);

    @Query(value ="select * from currency where sigum_nm like %?1% and indutpye_nm like %?2% and " +
            "refine_wgs84_lat is not null and refine_wgs84_logt is not null", nativeQuery = true)
    List<Currency> searchsiandcategory(String si, String category);

    @Query(value = "select * from currency where id=?1 and refine_wgs84_lat is not null and refine_wgs84_logt is not null and sigum_nm = ?2", nativeQuery = true)
    Currency findById(int id, String si);

    @Query(value = "select * from currency where id=?1",nativeQuery = true)
    Currency findById(int id);

    @Query(value = "select *, (6371 * acos(cos(radians(?1)) * cos(radians(REFINE_WGS84_LAT)) * cos(radians(REFINE_WGS84_LOGT) - radians(?2)) + sin(radians(?1)) * sin(radians(REFINE_WGS84_LAT)))) as distance  \n"+
            "from currency \n" +
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
    List<Currency> findByCategoryEtc(double latitude, double longitude);
}