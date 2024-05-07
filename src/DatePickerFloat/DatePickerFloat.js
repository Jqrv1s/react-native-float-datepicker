import React, { useEffect } from 'react'
import { View, Text, Pressable, StyleSheet, Modal, TextInput } from 'react-native'
import { Calendar, SelectMonthYear } from '../components'
import { getFormattedDate } from '../utils'

const DateContext = React.createContext()

export const useDate = () => {
  const context = React.useContext(DateContext)
  if (!context) {
    throw new Error('useDate must be used within a DateProvider')
  }
  return context
}

export const DatePickerFloat = props => {
  const [isOpened, setIsOpened] = React.useState(false)
  const [date, setDate] = React.useState(new Date())
  const contextValue = {
    ...props,
    format: props.format || 'YYYY-MM-DD',
    mode: props.mode || 'datetime',
    placeholderTextColor: props.placeholderTextColor || '#00000050',
    value: props.value || null,
    date,
    namesShortMonths: props.namesShortMonths || ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    namesDaysWeek: props.namesDaysWeek || ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    namesMonths: props.namesMonths || ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    onChange: props.onChange || (() => { }),
    setDate,
    setIsOpened,
  }

  useEffect(() => {
    (isOpened && props.value) && setDate(props.value)
  }, [isOpened])

  React.useEffect(() => {
    if (props.namesDaysWeek && props.namesDaysWeek.length !== 7) {
      throw new Error('namesDaysWeek must have 7 elements')
    }
    if (props.namesShortMonths && props.namesShortMonths.length !== 12) {
      throw new Error('namesShortMonths must have 12 elements')
    }
  }, [])

  function onPress() {
    setIsOpened(!isOpened)
  }

  const returnMode = {
    datetime: () => <Calendar />,
    date: () => <Calendar />,
    time: () => <SelectTime />,
    'month-year': () => <SelectMonthYear />,
  }

  return (
    <DateContext.Provider value={contextValue}>
      <Pressable onPress={onPress} style={[styles.container, contextValue.style]}>
        {contextValue.iconLeft}
        {
          contextValue.value
            ? <Text style={[{ color: contextValue.style.color, fontSize: contextValue.style.fontSize }]}>{getFormattedDate(contextValue.value, contextValue.format)}</Text>
            : contextValue.placeholder && <Text style={[{ color: contextValue.placeholderTextColor }]}>{contextValue.placeholder}</Text>
        }
        {contextValue.iconRight}
      </Pressable>

      <Modal
        visible={isOpened}
        animationType='slide'
        transparent={true}
        style={{ height: 300 }}
      >
        <View style={styles.containerModal}>
          <Pressable onPress={onPress} style={{ flex: 1 }} />
          <View style={styles.datePicker}>
            {(returnMode[contextValue.mode] || returnMode.datetime)()}
          </View>
        </View>
      </Modal>
    </DateContext.Provider>
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
  containerModal: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // height: '50%'
  },
  datePicker: {
    backgroundColor: '#0a0c09',
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
})