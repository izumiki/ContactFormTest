import { useState } from 'react'
import { centerCrop, makeAspectCrop, PercentCrop } from 'react-image-crop'

export const cropCenter = (width: number, height: number, aspect: number) => {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 100 }, aspect, width, height),
    width,
    height
  )
}

export async function cropImage(
  src: string,
  setSrc: (src: string) => void,
  completedCrop: PercentCrop
) {
  const image: HTMLImageElement = new Image()
  image.src = src
  console.log(image.width)
  console.log(completedCrop.width)
  const croppedImageWidth: number = (completedCrop.width * image.width) / 100
  const croppedImageHeight: number = (completedCrop.height * image.height) / 100
  const croppedImageX = (completedCrop.x * image.width) / 100
  const croppedImageY = (completedCrop.y * image.height) / 100
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  console.log('crossOrigin', image.crossOrigin) // crossOrigin設定 なんとかする.
  canvas.width = croppedImageWidth
  canvas.height = croppedImageHeight
  console.log('canvas', canvas)
  console.log('completedCrop', completedCrop)
  console.log('width: ', croppedImageWidth)
  console.log('height: ', croppedImageHeight)
  console.log('x: ', croppedImageX)
  console.log('y: ', croppedImageY)
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')
  ctx.drawImage(
    image,
    croppedImageX,
    croppedImageY,
    croppedImageWidth,
    croppedImageHeight,
    0,
    0,
    croppedImageWidth,
    croppedImageHeight
  )

  canvas.toBlob(
    (blob: Blob) => {
      const newSrc = URL.createObjectURL(blob)
      setSrc(newSrc)
    },
    'image/jpeg',
    0.85
  )
}
