import Modal from 'react-modal'
import { MailFormValues } from '../../../types/mail'
import { sendMail } from '../sendMail'
import ConfirmItem from './ConfirmItem'
import Spinner from '../../Spinner'
import ConfirmTextarea from './ConfirmTextarea'
import { useState } from 'react'
import Checkmark from '../../Checkmark'

type LoadingModalProps = {
  isOpen: boolean
  completed: boolean
}

const LoadingModal = (props: LoadingModalProps) => {
  // const [completed, setCompleted] = useState<boolean>(false)
  return (
    <Modal
      isOpen={props.isOpen}
      contentLabel='Confirm Modal'
      className={`flex h-screen w-screen items-center justify-center rounded-lg  ${
        props.isOpen ? 'animate-fade-in' : 'animate-fade-out'
      }`}
      overlayClassName='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
      ariaHideApp={false}
      closeTimeoutMS={350}
    >
      <div className='flex h-32 w-32 justify-center rounded-lg bg-white p-8'>
        {props.completed ? <Checkmark /> : <Spinner />}
      </div>
    </Modal>
  )
}

export default LoadingModal
