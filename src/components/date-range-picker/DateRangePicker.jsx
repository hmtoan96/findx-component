import { useState, useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import Popover from '@mui/material/Popover'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { isDate, format, subWeeks } from 'date-fns'
import DateRangeOptions from './DateRangeOptions'

const DateRangePickerWrapper = styled.div()

const DateDisplayBoxWrapper = styled.div((props) => ({
  border: '1px solid',
  borderRadius: '3px',
  borderColor: props.isOpen ? 'rgba(25, 118, 210, 0.5)' : 'null',
  color: props.isOpen ? 'rgb(25, 118, 210)' : 'inherit',
  padding: '5px 10px',
  cursor: 'pointer',
  display: 'flex',
  '&:focus': {
    borderColor: 'rgba(25, 118, 210, 0.5)',
    color: 'rgb(25, 118, 210)',
  },
}))

const DateText = styled.div({
  color: 'black',
})

const RangeDate = () => {
  const { getValues } = useFormContext()
  const { from, to } = getValues()
  const fromDate = isDate(from) ? format(from, 'dd/MM/yyyy') : ''
  const toDate = isDate(to) ? format(to, 'dd/MM/yyyy') : ''

  return (
    <>
      <DateText>{fromDate}</DateText>
      <span>-</span>
      <DateText>{toDate}</DateText>
    </>
  )
}

const DateDisplayBox = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dateDisplayBoxRef = useRef()
  const methods = useForm({
    defaultValues: {
      from: subWeeks(new Date(), 1),
      to: new Date(),
    },
  })

  const { watch } = methods

  useEffect(() => {
    const subscription = watch(() => setIsOpen(false))
    return () => subscription.unsubscribe()
  }, [watch])

  const toggleDatePicker = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <FormProvider {...methods}>
      <DateDisplayBoxWrapper
        ref={dateDisplayBoxRef}
        onClick={toggleDatePicker}
        isOpen={isOpen}
      >
        <RangeDate />
        {isOpen ? <ArrowDropUpIcon /> : null}
        {!isOpen ? <ArrowDropDownIcon /> : null}
      </DateDisplayBoxWrapper>

      <Popover
        open={isOpen}
        anchorEl={dateDisplayBoxRef.current}
        onClose={() => setIsOpen(false)}
        elevation={2}
        anchorOrigin={{
          vertical: dateDisplayBoxRef.current?.offsetHeight + 10,
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <DateRangeOptions />
      </Popover>
    </FormProvider>
  )
}

export default function DateRangePicker() {
  return (
    <DateRangePickerWrapper>
      <DateDisplayBox />
    </DateRangePickerWrapper>
  )
}
