import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { AvatarProps } from '../../types/account'

const Avatar = ({
  avatarSrc,
  avatarSide,
  name,
  register,
  formState,
  options,
}: AvatarProps) => {
  const [src, setSrc] = useState(avatarSrc)
  const side = avatarSide

  const handleAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) {
      alert('ファイルを選択してください。')
      return
    }
    const avatarFile = event.target.files[0]

    if (avatarFile.size > 5000000) {
      alert('ファイルサイズは 1MB 以下にしてください.')
      return
    }
    setSrc(URL.createObjectURL(avatarFile))
  }

  return (
    <div className='mb-8 h-64 w-64'>
      {src ? (
        <Image
          src={src}
          alt='avatar'
          width={side}
          height={side}
          className={`mb-4 h-64 w-64 rounded-full`}
        />
      ) : (
        <div className={`mb-4 h-64 w-64 rounded-full bg-slate-700`} />
      )}
      <label
        htmlFor={name}
        className={`
          hover: mb-8 flex h-12 w-64  cursor-pointer justify-center 
          rounded bg-teal-500 py-2.5 px-2 
          font-bold text-white
          hover:bg-teal-700 focus:outline-none
         `}
      >
        {' '}
        Upload File
        <input
          type='file'
          id={name}
          className='hidden'
          accept='image/*'
          {...register(name, { onChange: handleAvatar })}
        />
      </label>
    </div>
  )
}

export default Avatar