import { useForm } from 'react-hook-form'
import { MailFormValues } from '../../types/mail'
import MailFormInput from './components/MailFormInput'
import MailFormTextarea from './components/MailFormTextarea'
import MailFormRadio from './components/MailFormRadio'
import ConfirmModal from './components/ConfirmModal'
import { useState } from 'react'
import { RemoveScroll } from 'react-remove-scroll'

const MailForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<MailFormValues>({
    defaultValues: {
      client: '',
      clientEmail: '', 
      clientWebsite: '', 
      clientCompany: '',
      title: '',
      details: '',
      budget: '',
      deliveryDate: '',
      isPublic: '公開してもよい',
    }})

  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className=' flex w-full max-w-3xl flex-col items-center gap-2 bg-gradient-to-br	from-stone-50 via-stone-100  to-stone-200 py-4 px-6 shadow-lg '>
      <h1 className='mb-8 text-3xl font-bold underline decoration-teal-900 decoration-double decoration-1 underline-offset-2'>
        Contact
      </h1>

      <RemoveScroll removeScrollBar enabled={isOpen}>
        <ConfirmModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          getValues={getValues}
          reset={reset}
        />
      </RemoveScroll>

      <div className='w-full '>
        <form onSubmit={handleSubmit(() => setIsOpen(true))}>
          <div className='mb-4 flex w-full flex-auto flex-col items-center justify-center justify-items-center gap-2 py-6 px-4 outline-double outline-4 outline-offset-8 outline-teal-900'>
            <MailFormInput
              label='お名前 / name'
              type='text'
              helpText='最大15文字'
              name='client'
              register={register}
              errors={errors}
              options={{
                required: '入力してください',

                maxLength: {
                  value: 15,
                  message: '文字数が多すぎます',
                },
              }}
            />
            <MailFormInput
              label='email'
              type='email'
              name='clientEmail'
              register={register}
              errors={errors}
              options={{
                required: '入力してください',
                pattern: {
                  value: /[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                  message: 'メールアドレスを入力してください',
                },
              }}
            />
            <MailFormInput
              label='website'
              type='url'
              name='clientWebsite'
              register={register}
              errors={errors}
              options={{
                required: false,
                pattern: {
                  value: /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g,
                  message: 'URLを入力してください',
                },
              }}
            />
            <MailFormInput
              label='会社名 / company'
              type='text'
              name='clientCompany'
              register={register}
              errors={errors}
              options={{ required: false }}
            />
            <MailFormInput
              label='件名 / title'
              type='text'
              helpText='最大30文字'
              name='title'
              register={register}
              errors={errors}
              options={{
                required: '入力してください',
                maxLength: {
                  value: 30,
                  message: '文字数が多すぎます',
                },
              }}
            />
            <MailFormTextarea
              label='詳細 / details'
              type='text'
              helpText='最大3000文字'
              name='details'
              register={register}
              errors={errors}
              options={{
                required: '入力してください',
                maxLength: {
                  value: 3000,
                  message: '文字数が多すぎます',
                },
              }}
            />
            <MailFormInput
              label='ご予算 / budget'
              type='text'
              unit='円'
              name='budget'
              register={register}
              errors={errors}
              options={{
                required: false,
                pattern: {
                  value: /^[0-9]+$/,
                  message: '数字で入力してください',
                },
              }}
            />
            <MailFormInput
              label='納期 / delivery date'
              type='date'
              name='deliveryDate'
              register={register}
              errors={errors}
              options={{ required: false }}
            />
            <MailFormRadio
              label='公開可否 / publisable'
              type='chackbox'
              helpText='ご依頼の公開について'
              name='isPublic'
              radioLabel={['公開してもよい', '公開を望まない']}
              register={register}
              errors={errors}
              options={{ required: false }}
            />
            <button
              type='submit'
              className='mt-6 w-1/3 rounded bg-teal-900 py-2 px-4 font-bold text-white
    hover:bg-teal-700 focus:outline-none'
            >
              確認
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MailForm
