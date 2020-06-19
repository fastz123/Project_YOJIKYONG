package com.localcurrency.back.Controller;

import com.localcurrency.back.Dao.StoreInfos;
import com.localcurrency.back.Service.CurrencyService;
import com.localcurrency.back.Service.StoreInfosService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin("*")
@RestController
public class StoreInfosController {
    private final CurrencyService currencyService;
    private final StoreInfosService storeInfosService;

    @ApiOperation("전체 가게 정보 가져오기")
    @GetMapping("/localcurrency/storeinfos/all")
    public List<StoreInfos> getall(){
        return storeInfosService.findall();
    }

    @ApiOperation("id로 가게 정보 검색")
    @GetMapping("/localcurrency/storeinfos/{id}") // 가게정보검색
    public StoreInfos searchInfos(@PathVariable int id){
        return storeInfosService.searchById(id);
    }

    @ApiOperation("id로 가게 별점 검색")
    @GetMapping("/localcurrency/storeinfos/star/{id}")//별점
    public String getStars(@PathVariable int id){
        return storeInfosService.findStarByStoreId(id);
    }
}
