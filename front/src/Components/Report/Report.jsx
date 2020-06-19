import React, { useState } from "react";
//import ReportTable from "./ReportTable";
import { Button, Box, TextField } from "@material-ui/core";
import "./style.scss";
import ReportCondition from "./ReportCondition";

export default function Report(props) {
  const [input, setInput] = useState({
    category: "",
    location: "",
    store: "",
    content: "",
  });
  const locations = [
    "가평군",
    "고양시",
    "과천시",
    "광명시",
    "광주시",
    "구리시",
    "군포시",
    "김포시",
    "남양주시",
    "동두천시",
    "부천시",
    "성남시",
    "수원시",
    "시흥시",
    "안산시",
    "안성시",
    "안양시",
    "양주시",
    "양평군",
    "여주시",
    "연천군",
    "오산시",
    "용인시",
    "의왕시",
    "의정부시",
    "이천시",
    "파주시",
    "평택시",
    "포천시",
    "하남시",
    "화성시",
  ];
  const categories = [
    { index: 0, name: "불법 수수료", color: "#F93822" },
    { index: 1, name: "위생 불량", color: "#D2005E" },
    { index: 2, name: "사용 불가능 점포", color: "#B12763" },
    { index: 3, name: "기 타", color: "#FFEB2F" },
  ];
  return (
    <div className="Board">
      {/* <ReportTable />  --> 관리자용 */}
      <ReportCondition
        input={input}
        setInput={setInput}
        categories={categories}
        locations={locations}
      />
      <Box className="Submit">
        <Box className="SubmitForm" m={2}>
          <TextField
            id="outlined-multiline-static"
            // label="Multiline"
            multiline
            rows={10}
            // defaultValue="Default Value"
            variant="outlined"
            fullWidth
            onChange={(event) => {
              setInput({ ...input, content: event.currentTarget.value });
            }}
          />
        </Box>
        <Box className="SubmitFooter" m={2}>
          <Button variant="outlined" className="writeButton">
            작성
          </Button>
          <Button variant="outlined">취소</Button>
        </Box>
      </Box>
    </div>
  );
}
