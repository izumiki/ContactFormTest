import Modal from 'react-modal'
import { UseFormGetValues } from 'react-hook-form'
import { MailFormValues } from '../../../types/mail'
import { sendMail } from '../sendMail'
import ConfirmItem from './ConfirmItem'
import ConfirmTextarea from './ConfirmTextarea'
import { useState } from 'react'
import LoadingModal from './LoadingModal'

export type ConfirmModalProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  getValues: UseFormGetValues<MailFormValues>
}

const ConfirmModal = ({ isOpen, setIsOpen, getValues }: ConfirmModalProps) => {
  const [completed, setCompleted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const inputMailParams = async () => {
    const params: MailFormValues = {
      client: getValues('client'),
      clientEmail: getValues('clientEmail'),
      clientCompany: getValues('clientCompany'),
      clientWebsite: getValues('clientWebsite'),
      title: getValues('title'),
      details: getValues('details'),
      budget: getValues('budget'),
      deliveryDate: getValues('deliveryDate'),
      isPublic: getValues('isPublic') ? '公開を望まない' : '公開してもよい',
    }
    await sendMail(params)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel='Confirm Modal'
      className={`relative m-auto mt-6 flex w-2/3 flex-col items-center justify-center  
      gap-6 rounded-lg  border-white bg-white ${
        isOpen ? 'animate-fade-in' : 'animate-fade-out'
      }`}
      overlayClassName='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
      ariaHideApp={false}
      closeTimeoutMS={350}
    >
      <div className='mt-12 flex w-2/3 flex-auto flex-col items-start gap-6'>
        <ConfirmItem label={'お名前'} name={getValues('client')} />

        <ConfirmItem label={'email'} name={getValues('clientEmail')} />

        <ConfirmItem label={'会社名'} name={getValues('clientCompany')} />

        <ConfirmItem label={'website'} name={getValues('clientWebsite')} />

        <ConfirmItem label={'件名'} name={getValues('title')} />

        <ConfirmTextarea label={'詳細'} name={getValues('details')} />

        <ConfirmItem label={'ご予算'} name={getValues('budget')} unit={'円'} />

        <ConfirmItem label={'希望納期'} name={getValues('deliveryDate')} />

        <ConfirmItem
          label={'公開可否'}
          name={getValues('isPublic') ? '公開してもよい' : '公開を望まない'}
        />
      </div>

      <div className='flex w-1/2 flex-row items-center justify-center  p-8'>
        <div className='flex w-1/2 justify-center '>
          <button
            onClick={() => {
              setIsOpen(false)
            }}
            className={`
            flex w-24 cursor-pointer 
            justify-center rounded bg-red-400 
            p-2 font-bold
            text-white hover:bg-red-600 focus:outline-none
          `}
          >
            Cancel
          </button>
        </div>

        <div className='flex w-1/2 justify-center'>
          <button
            type='submit'
            onClick={() => {
              setCompleted(false)
              setLoading(true)
              inputMailParams().then(() => {
                setCompleted(true)

                setTimeout(() => {
                  setLoading(false)
                  setIsOpen(false)
                }, 1000)
              })
            }}
            className='w-24 items-center rounded  bg-teal-900 p-2 font-bold text-white
            hover:bg-teal-700 focus:outline-none'
          >
            送信
          </button>
        </div>
      </div>
      <LoadingModal isOpen={loading} completed={completed} />
    </Modal>
  )
}

export default ConfirmModal
