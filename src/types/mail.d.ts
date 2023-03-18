import { FieldErrors, RegisterOptions } from 'react-hook-form'

export type MailFormValues = {
  client: string
  clientEmail: string
  clientCompany: string
  clientWebsite: string
  title: string
  details: string
  budget: string
  deliveryDate: string
  isPublic: string
}

// type RadioButtonOption = {
//   number: string
//   label: string
// }

export type MailFormInputProps = {
  label: string
  type?: string
  helpText?: string
  unit?: string
  name:
    | 'client'
    | 'clientEmail'
    | 'clientWebsite'
    | 'clientCompany'
    | 'title'
    | 'details'
    | 'budget'
    | 'deliveryDate'
    | 'isPublic'
  register: UseFormRegister<MailFormValues>
  errors: FieldErrors<MailFormValues>
  options: RegisterOptions
}

export type MailFormRadioProps = MailFormInputProps & {
  radioLabel: string[]
}
