package com.localcurrency.back.Service;


import com.localcurrency.back.Dao.Currency;
import com.localcurrency.back.Dao.CurrencyRepository;
import com.localcurrency.back.RequestDto.LocationRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CurrencyService {
    private final CurrencyRepository currencyRepository;

    @Transactional
    public List<Currency> SearchTownAndCategory(String town, String category){
        return currencyRepository.searchtownandcategory(town, category);
    }

    @Transactional
    public List<Currency> SearchName(String name){ return currencyRepository.searchname(name); }

    @Transactional
    public List<Currency> SearchTown(String town){
        return currencyRepository.searchtown(town);
    }

    @Transactional
    public List<Currency> SearchSiandTown(String si, String town){
        return currencyRepository.searchsiandtown(si,town);
    }

    @Transactional
    public List<Currency> SearchCategory(String category){
        return currencyRepository.searchcategory(category);
    }

    @Transactional
    public List<Currency> SearchNear(LocationRequestDto location, String category) {
        return currencyRepository.searchnear(location.getLatitude() , location.getLongitude(), category);
    }

    @Transactional
    public List<Currency> SearchSiandCategory(String si, String category) {
        return currencyRepository.searchsiandcategory(si,category);
    }

    @Transactional
    public Currency SearchStore(int id){
        return currencyRepository.findById(id);
    }

    @Transactional
    public Currency SearchStore(int id, String si){
        return currencyRepository.findById(id,si);
    }

    @Transactional
    public List<Currency> SearchCategoryEtc(LocationRequestDto location){
        return currencyRepository.findByCategoryEtc(location.getLatitude(), location.getLongitude());}

}
