package com.localcurrency.back.Service;

import com.localcurrency.back.Dao.CurrencyRepository;
import com.localcurrency.back.Dao.StoreInfos;
import com.localcurrency.back.Dao.StoreInfosRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class StoreInfosService {
    private final CurrencyRepository currencyRepository;
    private final StoreInfosRepository storeInfosRepository;

    @Transactional
    public StoreInfos searchById(int id){return storeInfosRepository.findById(id);};

    @Transactional
    public List<StoreInfos> findall(){return storeInfosRepository.findall();};

    @Transactional
    public String findStarByStoreId(int id){return storeInfosRepository.getStarByStoreId(id);};
}
