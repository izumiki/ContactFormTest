import { init, send } from '@emailjs/browser'
import { FormEvent, useState } from 'react'
import { MailFormValues } from '../../types/mail'

export const sendMail = async (props: MailFormValues) => {
  const userID: string = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || ''
  const serviceID: string = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ''
  const templateID: string = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ''

  if (userID && serviceID && templateID) {
    init(userID)

    const params = {
      from_name: props.client,
      reply_to: props.clientEmail,
      client: props.client,
      clientEmail: props.clientEmail,
      clientCompany: props.clientCompany,
      clientWebsite: props.clientWebsite,
      title: props.title,
      details: props.details,
      budget: props.budget,
      deliveryDate: props.deliveryDate,
      isPublic: props.isPublic,
    }
    try {
      await send(serviceID, templateID, params)
    } catch (error) {
      console.error(error)
    }
  }
}
