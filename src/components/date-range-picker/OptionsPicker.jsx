import React, { useState, useRef } from 'react'
import Popover from '@mui/material/Popover'
import styled from '@emotion/styled'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Calendar from 'react-calendar'
import './calendar.css'

const Wrapper = styled.div({
  display: 'flex',
})

const DisplayBox = styled.div({})

export default function OptionsPicker() {
  const [isOpen, setIsOpen] = useState(false)
  const dateDisplayBoxRef = useRef()

  const [startDay, setStartDay] = useState(new Date())
  const [endDay, setEndDay] = useState(new Date())

  const handleChangeDate = ({ type, value }) => {
    if (type === 'start') {
      setStartDay(value)
    }
    if (type === 'end') {
      setEndDay(value)
    }
  }
  return (
    <>
      <Wrapper ref={dateDisplayBoxRef}>
        <DisplayBox onClick={() => setIsOpen((prev) => !prev)}>
          <span>123123</span>
          <CalendarMonthIcon />
        </DisplayBox>
        <DisplayBox onClick={() => setIsOpen((prev) => !prev)}>
          <span>123123</span>
          <CalendarMonthIcon />
        </DisplayBox>
      </Wrapper>
      <Popover
        open={isOpen}
        anchorEl={dateDisplayBoxRef.current}
        onClose={() => setIsOpen(false)}
        elevation={2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{ padding: '0 10px' }}
      >
        <Calendar
          minDate={new Date()}
          onChange={(value, event) => console.log(value, event)}
        />
      </Popover>
    </>
  )
}
