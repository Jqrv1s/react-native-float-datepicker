import type * as React from 'react';
import type { StyleSheet, ColorValue } from 'react-native';

export type DateFormat = 'YYYY-MM-DD' | 'DD-MM-YYYY' | 'YYYY/MM/DD' | 'DD/MM/YYYY'
export type DateType = 'date' | 'time' | 'datetime' | 'month' | 'year' | 'month-year'

export interface DatePickerProps {
  /**
    *- The date format
    */
  format: DateFormat
  /**
    *- The mode of the date picker
    */
  mode: DateType
  /**
   *- The icon to show in the input
   */
  iconLeft: React.ReactNode
  /**
   *- The icon to show in the input
   */
  iconRight: React.ReactNode
  /**
   *- The style of the input
   */
  style: StyleSheet | undefined
  placeholder: string | undefined
  value: Date | undefined
  placeholderTextColor: ColorValue | undefined
  onOpenModal: () => void
  onCloseModal: () => void
  namesDaysWeek: string[] | undefined
  namesShortMonths: string[] | undefined
  onChange: ({ formatDate, date }: { formatDate: string, date: Date }) => void
}

export class DatePickerFloat extends React.Component<DatePickerProps> { }

export default DatePickerFloat
