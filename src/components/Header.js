import { Text, View, Pressable, Image, StyleSheet, TextInput } from 'react-native'
import { getHour, getMonthAndYear } from '../utils'
import { useDate } from '../DatePickerFloat/DatePickerFloat'
import { useEffect, useState } from 'react'

export function Header({
  onPressArrow,

}) {

  const { mode, date, namesShortMonths, setDate } = useDate()
  // const [year, setYear] = useState(date.getFullYear().toString())

  // useEffect(() => {
  //   // setYear(date.getFullYear().toString())
  // }, [date])

  // function changeYear(text) {
  //   setYear(text)
  //   // const newDate = new Date(date)
  //   // newDate.setFullYear(Number(text))
  //   // setDate(newDate)
  // }

  const Arrows = ({ children }) => {
    return (
      <View style={styles.groupArrows}>
        <Pressable onPress={() => onPressArrow('prev')}>
          <Image
            source={require('../assets/arrow.png')}
            style={{ transform: [{ rotate: '180deg' }], width: 20, height: 20, tintColor: '#de6828' }}
          />
        </Pressable>
        {children}
        <Pressable onPress={() => onPressArrow('next')}>
          <Image
            source={require('../assets/arrow.png')}
            style={{ width: 20, height: 20, tintColor: '#de6828' }}
          />
        </Pressable>
      </View>
    )
  }

  const renderForType = {
    datetime: () => (
      <Arrows>
        <View style={styles.timeDate}>
          <Pressable style={styles.button} onPress={() => setHour(true)}>
            <Text style={styles.textButtons}>{getHour(date)}</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => setMonthYear(true)}>
            <Text style={styles.textButtons}>{getMonthAndYear(date, namesShortMonths)}</Text>
          </Pressable>
        </View>
      </Arrows>
    ),
    'month-year': () => (
      <Arrows>
        <View style={styles.timeDate}>
          <View style={styles.button}>
            <Text style={styles.textButtons}>{date.getFullYear().toString()}</Text>
            {/* <TextInput style={styles.textButtons} onChangeText={changeYear} /> */}
            {/* <TextInput style={styles.text} value={text} onChangeText={setText} /> */}
          </View>
        </View>
      </Arrows >
    ),
    default: () => null
  }

  return (
    <>
      {
        (renderForType[mode] || renderForType.datetime)()
      }
    </>
  )
}

const styles = StyleSheet.create({
  groupArrows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 15,
    width: '100%',
  },
  timeDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    padding: 10
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#121514'
  },
  textButtons: {
    color: '#ffa25c'
  },
  text: {
    fontSize: 20,
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    color: 'black',
    borderWidth: 1,
  },
})