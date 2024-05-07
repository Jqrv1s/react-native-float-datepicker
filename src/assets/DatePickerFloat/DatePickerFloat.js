import { useEffect, useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'

export function DatePickerFloat({
  format = 'YYYY-MM-DD',
  mode = 'datetime',
  iconLeft = null,
  iconRight = null,
  value = undefined,
  placeholder = undefined,
  style = {},
  placeholderTextColor = "#00000050",
  onOpenModal = () => { },
  onCloseModal = () => { },
  namesDaysWeek = ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  onChange = ({ formatDate, date }) => { }
}) {
  const [date, setDate] = useState(value || new Date())
  const [isOpened, setIsOpened] = useState(false)

  useEffect(() => {
    if (namesDaysWeek.length !== 7) {
      throw new Error('namesDaysWeek must have 7 elements')
    }
  }, [])

  useEffect(() => {
    isOpened ? onOpenModal() : onCloseModal()
  }, [isOpened])

  function onPress() {
    setIsOpened(!isOpened)
  }

  function getFormattedDate(date) {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    return format
      .replace('DD', day.toString().padStart(2, '0'))
      .replace('MM', month.toString().padStart(2, '0'))
      .replace('YYYY', year.toString())
      .replace('HH', hours.toString().padStart(2, '0'))
      .replace('mm', minutes.toString().padStart(2, '0'))
      .replace('ss', seconds.toString().padStart(2, '0'))
  }

  function getHour(date = new Date()) {
    let hours = date.getHours()
    let minutes = date.getMinutes()

    // hours = hours < 10 ? `0${hours}` : hours
    // minutes = minutes < 10 ? `0${minutes}` : minutes
    hours = hours.toString().padStart(2, '0')
    minutes = minutes.toString().padStart(2, '0')

    return `${hours}:${minutes}`
  }

  function getMonthAndYear(date = new Date()) {
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()

    // return `${MESES_SHORT[month]} ${year}`
    return `${month} / ${year}`
  }

  function getDaysMonth(date = new Date()) {
    // date = new Date('2024-02-01')
    const days = []
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

    console.log({ daysInMonth });

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }


    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    // const daysFromPreviousMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate()

    for (let i = 0; i < firstDay; i++) {
      // days.unshift(daysFromPreviousMonth - i)
      days.unshift('')
    }

    return days
  }

  function handlePressDay(day) {
    const newDate = new Date(date)
    newDate.setDate(day)
    onChange({ formatDate: getFormattedDate(newDate), date: newDate })
    setDate(newDate)
    setIsOpened(false)
  }

  return (
    <>
      <Pressable onPress={onPress} style={[styles.container, style]}>
        {({ pressed }) => (
          <>
            {iconLeft}
            {
              value
                ? <Text style={[styles.value, { color: style.color, fontSize: style.fontSize }]}>{getFormattedDate(value)}</Text>
                : placeholder && <Text style={[styles.placeholder, { color: placeholderTextColor }]}>{placeholder}</Text>
            }
            {iconRight}
          </>
        )}
      </Pressable>

      <Modal
        visible={isOpened}
        animationType='slide'
        transparent={true}
      >
        <View style={styles.containerModal}>
          <Pressable onPress={onPress} style={{ flex: 1 }} />

          <View style={styles.datePicker}>

            <View />
            <View style={styles.groupArrows}>
              <Pressable onPress={() => { }}>
                <Image
                  source={require('react-native-float-datepicker/src/DatePickerFloat/assets/arrow.png')}
                  style={{ transform: [{ rotate: '180deg' }], width: 20, height: 20, tintColor: '#de6828' }}
                />
              </Pressable>

              <View style={styles.timeDate}>
                <Pressable style={styles.button}>
                  <Text style={styles.textButtons}>{getHour(date)}</Text>
                </Pressable>
                <Pressable style={styles.button}>
                  <Text style={styles.textButtons}>{getMonthAndYear(date)}</Text>
                </Pressable>
              </View>
              <Pressable onPress={() => { }}>
                <Image
                  source={require('react-native-float-datepicker/src/DatePickerFloat/assets/arrow.png')}
                  style={{ width: 20, height: 20, tintColor: '#de6828' }}
                />
              </Pressable>
            </View>

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
                  <Pressable key={index} style={[styles.day, day === date.getDate() ? styles.active : {}]} onPress={() => handlePressDay(day)}>
                    <Text style={[styles.textDay]}>{day}</Text>
                  </Pressable>
                ))
              }
            </View>
          </View>
        </View>
      </Modal>
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
  groupArrows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15
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
  }
})