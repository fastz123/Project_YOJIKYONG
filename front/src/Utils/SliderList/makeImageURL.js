const type_match = {
  한식: "korean",
  중국식: "china",
  서양: "western",
  일식: "japan",
  주점: "drink",
  기타: "etc",
  "편 의 점": "convstore",
  "당 구 장": "billards",
  "노 래 방": "karaoke",
  동물병원: "animal",
  학원: "academy",
  유아: "child",
  주유소: "gasstation",
  의료용품: "medical",
  미용: "beauty",
  안경: "glasses",
  화장품: "cosmetic",
  사우나: "sauna",
  숙박:"lodgment",
  정장:"suit",
  아동:"petticoat",
  관광:"tourism",
  렌터:"rent"

};
const category_match = {
  음식: {
    name: "food",
    number: 8,
  },
  "편 의 점": {
    name: "convstore",
    number: 2,
  },
  레저: {
    name: "leisure",
    number: 6,
  },
  병원: {
    name: "hospital",
    number: 6,
  },
  학원: {
    name: "academy",
    number: 4,
  },
  주유소: {
    name: "gasstation",
    number: 2,
  },
  보건위생: {
    name: "hygiene",
    number: 4,
  },
  숙박:{
    name:"lodgment",
    number : 8,
  },
  의류:{
    name:"clothes",
    number : "5",
  },
  여행:{
    name:"trip",
    number:"4",
  },
  기타:{
    name:"etc",
    number : "1",
  }
};

export function makeImageURL(category, type) {
  let src = "";
  if (type == "기타") {
    src =
      "/images/storeImage/" +
      category_match[category]["name"] +
      "/" +
      type_match[type] +
      "/etc.jpg";
  } else {
    src =
      "/images/storeImage/" +
      category_match[category]["name"] +
      "/" +
      type_match[type] +
      "/" +
      type_match[type] +
      "-" +
      category_match[category]["name"] +
      "-" +
      randomNumber(category_match[category]["number"]) +
      ".jpg";
  }

  return src;
}

function randomNumber(number) {
  let num = Math.random();
  return Math.floor(num * number + 1);
}
