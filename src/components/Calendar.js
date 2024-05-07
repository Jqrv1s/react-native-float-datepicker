import { useEffect, useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { getFormattedDate, getHour, getMonthAndYear, getDaysMonth } from '../utils'
import { SelectMonthYear, Header } from '../components'
import { useDate } from '../DatePickerFloat/DatePickerFloat'

export function Calendar() {
  const { date, namesDaysWeek, value, onChange, format, setDate, setIsOpened } = useDate()
  // const [date, setDate] = useState(new Date())
  // const [monthYear, setMonthYear] = useState(false)
  // const [hour, setHour] = useState(false)
  // const namesShortMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  // const namesDaysWeek = ['D', 'L', 'M', 'M', 'J', 'V', 'S']
  // const value = undefined
  // function onCloseModal() { }
  // function onOpenModal() { }
  // function onChange() { }
  // const format = 'YYYY/MM/DD'

  function handlePressDay(day) {
    if (day === '') return
    const newDate = new Date(date)
    newDate.setDate(day)
    onChange({ formatDate: getFormattedDate(newDate, format), date: newDate })
    setIsOpened(false)
  }

  function getActive(day, value, date) {
    if (day === '') return {}

    if (value) {
      if (value.getDate() === day && value.getMonth() === date.getMonth() && value.getFullYear() === date.getFullYear()) {
        return styles.active
      }
    }

    return {}
  }

  function onPressArrow(direction) {
    const newDate = new Date(date)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setDate(newDate)
  }

  // function onSelectMonthYear(index) {
  //   const newDate = new Date(date)
  //   newDate.setMonth(index)
  //   setMonthYear(false)
  //   setDate(newDate)
  // }

  return (
    <>
      <Header
        onPressArrow={onPressArrow}
      // setMonthYear={setMonthYear}
      // setHour={setHour}
      />
      <View style={styles.nameDaysWeek}>
        {
          namesDaysWeek.map((day, index) => (
            <Text key={index} style={[styles.nameDay, styles.textDay]}>{day}</Text>
          ))
        }
      </View>

      <View style={styles.weekdays}>
        {
          getDaysMonth(date).map((day, index) => (
            <Pressable key={index} style={[styles.day, getActive(day, value, date)]} onPress={() => handlePressDay(day)}>
              <Text style={[styles.textDay]}>{day}</Text>
            </Pressable>
          ))
        }
      </View>
      {/* {
        monthYear &&
        <SelectMonthYear
          onSelect={onSelectMonthYear}
          namesMonths={namesMonths}
        />
      }
      {
        hour &&
        <View style={styles.hourModal}>
          <Pressable onPress={() => setHour(false)}>
            <Text>{getHour(date)}</Text>
          </Pressable>
        </View>
      } */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 20,
    gap: 10,
  },
  placeholder: {
  },
  value: {
  },
  containerModal: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  datePicker: {
    backgroundColor: '#0a0c09',
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  nameDaysWeek: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  nameDay: {
    flex: 1,
    textAlign: 'center'
  },
  weekdays: {
    // height: 40 * 7,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 20
  },
  day: {
    height: 40,
    width: '14.28%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  textDay: {
    color: '#dbcfac'
  },
  active: {
    borderRadius: 50,
    backgroundColor: '#ff7a26',
    // width: 30,
    // padding: 5,
    color: 'white',
  },
  footer: {
  },
  hourModal: {
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0c09',
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
})