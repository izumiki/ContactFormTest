import { useState } from 'react'
import { MailFormRadioProps, MailFormInputProps } from '../../../types/mail'
import RequiredLabel from './RequiredLabel'

const MailFormRadio = ({
  label,
  radioLabel,
  helpText,
  name,
  register,
  errors,
  options,
}: MailFormRadioProps & {}) => {
  const [selected, setSelected] = useState<string>(radioLabel[0])
  const error = errors[name]
  return (
    <div className='flex w-full items-start justify-center py-1 px-4'>
      <div className='flex w-auto items-start justify-end '>
        <div className='flex w-12 '>
          {options.required && <RequiredLabel />}
        </div>

        <div className='flex h-12 w-36 flex-wrap'>
          <label
            htmlFor={name}
            className='flex w-36 px-1 text-sm font-bold text-slate-700 '
          >
            {label}
          </label>

          <label
            htmlFor={name}
            className='flex w-36 px-1 text-xs text-slate-500'
          >
            {helpText}
          </label>
        </div>
      </div>

      <div className='flex h-auto w-3/4 flex-wrap items-start '>
        {radioLabel.map((label) => {
          return (
            <div className='flex px-2' key={label}>
              <input
                id={label}
                type='radio'
                value={label}
                className='mb-1.5 accent-teal-600'
                checked={label === selected}
                onClick={() => setSelected(label)}
                {...register(name, options)}
              />
              <label
                key={label}
                htmlFor={label}
                className='px-2 text-sm font-bold text-gray-700'
              >
                {label}
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MailFormRadio
