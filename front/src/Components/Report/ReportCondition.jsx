import React from "react";
import {
  Box,
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import ReportStoreSearch from "./ReportStoreSearch";

export default function ReportCondition(props) {
  const { input, setInput, categories, locations } = props;
  return (
    <Box className="ConditionCheck" m={2}>
      <FormControl className="categorySelect">
        <Select
          value={input.category}
          onChange={(event) => {
            setInput({ ...input, category: event.target.value });
          }}
          displayEmpty
        >
          <MenuItem value="" disabled></MenuItem>
          {categories.map((category, index) => (
            <MenuItem value={category.name} key={index}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>신고사항을 선택해주세요</FormHelperText>
      </FormControl>
      <FormControl className="locationSelect">
        <Select
          value={input.location}
          onChange={(event) => {
            setInput({ ...input, location: event.target.value });
          }}
          displayEmpty
        >
          <MenuItem value="" disabled></MenuItem>
          {locations.map((location, index) => (
            <MenuItem value={location}>{location}</MenuItem>
          ))}
        </Select>
        <FormHelperText>지역을 선택해주세요</FormHelperText>
      </FormControl>
      <ReportStoreSearch />
    </Box>
  );
}
