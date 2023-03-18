import { MailFormInputProps } from '../../../types/mail'
import RequiredLabel from './RequiredLabel'

const MailFormTextarea = ({
  label,
  type,
  helpText,
  name,
  register,
  errors,
  options,
}: MailFormInputProps) => {
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
            className='flex w-36  px-1 text-xs text-slate-500'
          >
            {helpText}
          </label>
        </div>
      </div>

      <div className='flex h-auto w-3/4 flex-wrap items-start '>
        <textarea
          id={name}
          type={type}
          maxLength={options.maxLength}
          rows={6}
          // value={name}
          defaultValue=''
          className={`h-full w-5/6 resize-none border-b-[1.5px] px-2 text-lg text-gray-800
        ${
          !error
            ? 'border-black focus:bg-indigo-50 focus:outline-none'
            : ' border-red-600  focus:border-black focus:bg-indigo-50 focus:outline-none'
        }`}
          {...register(name, options)}
        />

        <div className='flex  h-4 w-5/6 flex-wrap items-start'>
          {error && (
            // {error.type === 'required' &&
            <label
              className='flex  w-full justify-end text-right text-xs text-red-600  '
              htmlFor={name}
            >
              {error.message}
            </label>
          )}
        </div>
      </div>
    </div>
  )
}

export default MailFormTextarea
