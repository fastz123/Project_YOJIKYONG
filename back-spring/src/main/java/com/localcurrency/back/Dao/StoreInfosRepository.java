package com.localcurrency.back.Dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
public interface StoreInfosRepository extends JpaRepository<StoreInfos, Long> {

    @Query(value ="select * from store_infos", nativeQuery = true)
    List<StoreInfos> findall();

    @Query(value = "select * from store_infos where store_id=?1", nativeQuery = true)
    StoreInfos findById(int id);

    @Query(value = "select store_star from store_infos where store_id=?1",nativeQuery = true)
    String getStarByStoreId(int id);
}
