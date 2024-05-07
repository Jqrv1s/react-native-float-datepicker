import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native'
import { Header } from './Header'
import { useDate } from '../DatePickerFloat/DatePickerFloat'
import React from 'react'

export function SelectMonthYear() {
  const { namesMonths, setDate, date, setIsOpened, mode, onChange, format } = useDate()

  function onPressArrow(direction) {
    const newDate = new Date(date)
    if (direction === 'prev') {
      console.log({ direction });
      newDate.setFullYear(newDate.getFullYear() - 1)
    } else {
      newDate.setFullYear(newDate.getFullYear() + 1)
    }
    setDate(newDate)
  }

  function selectedMonth(index) {
    if (mode === 'month-year') {
      const newDate = new Date(date)
      newDate.setMonth(index)
      onChange({ formatDate: format, date: newDate })
      setIsOpened(false)
    }
  }

  return (
    <View style={styles.contaier}>
      <Header
        onPressArrow={onPressArrow}
      />
      {
        namesMonths.map((month, index) => (
          <Pressable key={index} style={styles.month} onPress={() => selectedMonth(index)}>
            <Text style={styles.textMonth}>{month}</Text>
          </Pressable>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  contaier: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: 40,
  },
  month: {
    padding: 10,
    width: '33.33%',
    height: 55,
    borderBottomWidth: 1,
    justifyContent: 'center',
    borderBottomColor: '#121514'
  },
  textMonth: {
    textAlign: 'center',
    color: '#F6E7C1',
    verticalAlign: 'middle'
  },

})