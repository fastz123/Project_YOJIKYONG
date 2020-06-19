package com.localcurrency.back.Dao;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name ="store_infos")
public class StoreInfos {

    @Id
//    @OneToOne
//    @JoinColumn(name="store_id")
    @Column(name = "store_id")
    private int store_id;

    @OneToOne
    @JoinColumn(name="store_id")
    private Currency store;

    @Column(name = "store_name") //이름
    private String name;

    @Column(name = "store_info_hashtag") //해시태그
    private String hashtag;

    @Column(name = "store_info") //가게정보
    private String infomation;

    @Column(name = "menus") //메뉴
    private String menus;

    @Column(name = "store_open_close") //오픈, 닫는시간
    private String octime;

    @Column(name = "store_star") //별점
    private String star;

    @Column(name="store_review") //리뷰
    private String reviews;
}
