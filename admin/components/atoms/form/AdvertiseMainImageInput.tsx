import { FC, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { BaseLabel } from './BaseLabel'

const inputClass = `
    transition
    duration-300
    bg-white
    border
    border-gray-300
    rounded
    cursor-pointer
    focus:border-transparent
    focus:outline-none
    focus:ring-4
    focus:ring-blue-200
`

interface Props {
  label: string
  id: string
  required?: boolean
  preview: string
  onDrop(acceptedFiles: any): void
  error: string
  width?: number
}
const AdvertiseMainImageInput: FC<Props> = ({
  label,
  required,
  id,
  onDrop,
  preview,
  error,
  width = 210,
}) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  const [height, setHeight] = useState(0)
  useEffect(() => {
    // w : h = 375 : 218
    setHeight((width * 218) / 375)
  }, [width])

  return (
    <div className="mb-4">
      <BaseLabel
        label={label}
        note={
          '最適なアスペクト比は375:218です。画像編集ソフトなどを使って最適なサイズに変更するようにお願いします。'
        }
        required={required}
        id={id}
      />

      <div className="flex justify-center">
        <div
          {...getRootProps()}
          className={inputClass}
          style={{ width, height }}
        >
          <input {...getInputProps()} />

          <div className="text-center">
            <img
              className="object-cover"
              src={preview}
              alt={label}
              style={{ width, height }}
            />
          </div>
        </div>
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : ''}
    </div>
  )
}

export { AdvertiseMainImageInput }
