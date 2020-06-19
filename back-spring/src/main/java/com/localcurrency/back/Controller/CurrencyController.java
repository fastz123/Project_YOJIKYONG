package com.localcurrency.back.Controller;


import com.localcurrency.back.Dao.Currency;
import com.localcurrency.back.Dao.Gmoney;
import com.localcurrency.back.RequestDto.LocationRequestDto;
import com.localcurrency.back.Service.CurrencyService;
import com.localcurrency.back.Service.GmoneyService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.*;

// localcurrency/town/매탄동
// gmoney/음식

@RequiredArgsConstructor
@CrossOrigin("*")
@RestController
public class CurrencyController {
    private final CurrencyService currencyService;
    private final GmoneyService gmoneyService;

    @ApiOperation("검색에서 사용할 동 + 카테고리")
    @GetMapping("/localcurrency/townandcategory/{town}/{category}")
    public List<Currency> SearchTownAndCategory(@PathVariable String town, @PathVariable String category){
        return currencyService.SearchTownAndCategory(town,category);
    }

    @ApiOperation("gmoney에서 반경 1KM 전체 검색")
    @PostMapping("/localcurrency/gmoneyNearAll")
    public List<Gmoney> SearchByNearAll(@RequestBody LocationRequestDto location){
        return gmoneyService.searchNearAll(location);
    }

    @ApiOperation("gmoney에서 id로 검색")
    @GetMapping("/localcurrency/gmoneygetid/{id}")
    public Gmoney SearchById(@PathVariable String id){
        return gmoneyService.searchById(id);
    }

    @ApiOperation("지도에서 사용할 반경 1km 검색")
    @PostMapping("/localcurrency/gmoney/{category}")
    public List<Gmoney> SearchNearForMap(@RequestBody LocationRequestDto location, @PathVariable String category){

        List<Gmoney> res = gmoneyService.SearchNear(location,category);
        List<Currency> list = SearchNear(location,category);

        for(Currency c: list){
            Gmoney gm = new Gmoney();
            gm.setId(c.getId());
            gm.setCmpnm_nm(c.getCmpnm_nm());
            gm.setSigum_nm(c.getSigum_nm());
            gm.setIndutpye_nm(c.getIndutpye_nm());
            gm.setRefine_lotno_addr(c.getRefine_lotno_addr());
            gm.setRefine_roadnm_addr(c.getRefine_roadnm_addr());
            gm.setRefine_wgs84_lat(c.getRefine_wgs84_lat());
            gm.setRefine_wgs84_logt(c.getRefine_wgs84_logt());
            gm.setRefine_zip_cd(c.getRefine_zip_cd());
            gm.setTelno(c.getTelno());
            res.add(gm);
        }
        return res;
    }

    @ApiOperation("상호명 검색")
    @GetMapping("/localcurrency/name/{name}") // 상호명 검색
    public List<Currency> SearchName(@PathVariable String name) {
        return currencyService.SearchName(name);
    }

    @ApiOperation("동,읍 검색")
    @GetMapping("/localcurrency/town/{town}") // 동,읍 검색
    public List<Currency> SearchTown(@PathVariable String town) {
        return currencyService.SearchTown(town);
    }

    @ApiOperation("시 + 읍/면/동 검색")
    @GetMapping("/localcurrency/siandtown/{si}/{town}")
    public List<Currency> SearchSiandTown(@PathVariable String si, @PathVariable String town){
        return currencyService.SearchSiandTown(si,town);
    }

    @ApiOperation("카테고리(업종) 검색")
    @GetMapping("/localcurrency/category/{category}") // 업종 검색
    public List<Currency> SearchCategory(@PathVariable String category) {
        return currencyService.SearchCategory(category);
    }

    @ApiOperation("반경 1KM 검색")
    @PostMapping("/localcurrency/nearfranchisee/{category}") // 반경 2키로미터 검색
    public List<Currency> SearchNear(@RequestBody LocationRequestDto location, @PathVariable String category) {

        return currencyService.SearchNear(location,category);
    }

    @ApiOperation("시+카테고리 검색")
    @GetMapping("localcurrency/siandcategory/{si}/{category}") //시 + 카테고리 검색
    public List<Currency> SearchMyArea(@PathVariable String si,
                                       @PathVariable String category) throws Exception{
//        String path = System.getProperty("user.dir");

//        System.out.println(Arrays.toString(s));
//        System.out.print(path);
        return currencyService.SearchSiandCategory(si,category);
    }


    public static List<Integer>[] Before_SearchSimilarStore() throws Exception{
        System.setIn(new FileInputStream("clusters.txt"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        ArrayList<Integer>[] tot_list = new ArrayList[40];
        for(int z=0;z<40;z++) tot_list[z] = new ArrayList<>();

        String str = br.readLine();
        str = str.substring(2,str.length()-2);
        String[] s = str.split("], ");
        String cur[] = s[0].split(", ");
        int len = cur.length;
        for(int k=0;k<len;k++) {
            tot_list[0].add(Integer.parseInt(cur[k]));
        }
        for(int z=1;z<40;z++) {
            String st = s[z].substring(1);
            cur = st.split(", ");
            len = cur.length;
            for(int k=0;k<len;k++) {
                tot_list[z].add(Integer.parseInt(cur[k]));
            }
        }

        return tot_list;
    }
    public static List<Integer>[] list;

    static {
        try {
            list = Before_SearchSimilarStore();
            System.out.println("finish");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ApiOperation("리뷰기반 유사 음식점 검색")
    @GetMapping("localcurrency/similarstore/{store_id}") //유사 음식점 검색
    public List<Currency> Before_SearchSimilarStore(@PathVariable int store_id) throws Exception{

        List<Currency> result = new ArrayList<>();

        Currency c = findById(store_id);
//        System.out.println(c.getId());
        String si = c.getSigum_nm();
        for(List<Integer> curlist : list){
            if(curlist.contains(store_id)){
                for(int id : curlist){
                    if(id == store_id) continue;
                    Currency cur = currencyService.SearchStore(id , si);
                    if(cur != null)
                        result.add(cur);
                }
            }
            else continue;
        }
        return result;
    }

    @ApiOperation("id로 가게 검색")
    @GetMapping("localcurrency/store/{id}")
    public Currency findById(@PathVariable int id){
        return currencyService.SearchStore(id);
    }

    @ApiOperation("기타 카테고리")
    @PostMapping("/localcurrency/category/etc")
    public List<Currency> findCategoryEtc(@RequestBody LocationRequestDto location){
        return currencyService.SearchCategoryEtc(location);
    }


}
