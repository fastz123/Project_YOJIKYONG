package com.localcurrency.back.Service;

import com.localcurrency.back.Dao.Currency;
import com.localcurrency.back.Dao.Gmoney;
import com.localcurrency.back.Dao.GmoneyRepository;
import com.localcurrency.back.Dao.StoreInfosRepository;
import com.localcurrency.back.RequestDto.LocationRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class GmoneyService {
    private final GmoneyRepository gmoneyRepository;

    @Transactional
    public List<Gmoney> searchNearAll(LocationRequestDto location){
        return gmoneyRepository.searchnear(location.getLatitude(), location.getLongitude());
    }

    @Transactional
    public Gmoney searchById(String id){
        return gmoneyRepository.findById(id);
    }

    @Transactional
    public List<Gmoney> SearchNear(LocationRequestDto location, String category) {
        return gmoneyRepository.searchnear(location.getLatitude(),location.getLongitude(),category);
    }
}
