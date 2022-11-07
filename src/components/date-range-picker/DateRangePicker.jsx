import { useState, useRef } from "react"
import styled from "@emotion/styled"
import DateUtils from "date-fns"
import Popover from "@mui/material/Popover"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"

const DatePickerWrapper = styled.div()

const DateDisplayBoxWrapper = styled.div((props) => ({
  border: "1px solid",
  borderRadius: "3px",
  borderColor: props.isOpen ? "rgba(25, 118, 210, 0.5)" : "null",
  color: props.isOpen ? "rgb(25, 118, 210)" : "inherit",
  padding: "5px 10px",
  cursor: "pointer",
  display: "flex",
  "&:focus": {
    borderColor: "rgba(25, 118, 210, 0.5)",
    color: "rgb(25, 118, 210)",
  },
}))

const DateText = styled.div({
  color: "black",
})

const DateDisplayBox = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  const RangeDate = () => {
    return (
      <>
        <DateText>01/01/2022</DateText>
      </>
    )
  }

  const dateDisplayBoxRef = useRef()

  return (
    <DateDisplayBoxWrapper
      ref={dateDisplayBoxRef}
      onClick={() => setIsOpen((prev) => !prev)}
      isOpen={isOpen}
    >
      <RangeDate />
      {isOpen ? <ArrowDropUpIcon /> : null}
      {!isOpen ? <ArrowDropDownIcon /> : null}
      <Popover
        open={isOpen}
        anchorEl={dateDisplayBoxRef.current}
        elevation={2}
        anchorOrigin={{
          vertical: dateDisplayBoxRef.current.offsetHeight + 10,
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <p>The content of the Popover.</p>
      </Popover>
    </DateDisplayBoxWrapper>
  )
}

const Calendar = (props) => {}

export default function DateRangePicker() {
  return (
    <DatePickerWrapper>
      <DateDisplayBox />
    </DatePickerWrapper>
  )
}
