import { BlueButton } from '@/components/atoms/buttons/BlueButton'
import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { EditAdvertiseForm } from '@/components/organisms/form/Advertise/EditAdvertiseForm'
import { useBooleanInput, useDateInput, useStringInput } from '@/hooks/useInput'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  downloadAdvertiseCounterHistoryXlsx,
  showAdvertise,
  updateAdvertise,
} from '@/infra/api/advertise'
import { putStorage } from '@/infra/api/storage'
import { AdvertiseType } from '@/lib/enum/api/AdvertiseType'
import { isAdminPutStorageRequestValidationError } from '@/lib/types/api/AdminPutStorageRequest'
import { isUpdateAdvertiseRequestValidationError } from '@/lib/types/api/UpdateAdvertiseRequest'
import Compressor from 'compressorjs'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'

const CreatePage: NextPage = () => {
  const router = useRouter()
  const { advertiseId } = router.query
  const { isMd } = useMediaQuery()
  const [isOpen, setIsOpen] = useState(true)

  const title = useStringInput('')
  const link = useStringInput('')
  const mainImageUrl = useStringInput('')
  const active = useBooleanInput(true)
  const advertiseType = useStringInput(AdvertiseType.COMMON)
  const publishTo = useDateInput(null, 'YYYY/MM/DD', 'YYYY-MM-DD')
  const publishFrom = useDateInput(null, 'YYYY/MM/DD', 'YYYY-MM-DD')

  useEffect(() => {
    const f = async () => {
      const foundsAdvertise = await showAdvertise(Number(advertiseId))
      title.set(foundsAdvertise.title)
      link.set(foundsAdvertise.link)
      mainImageUrl.set(foundsAdvertise.mainImageUrl)
      active.set(foundsAdvertise.active)
      advertiseType.set(foundsAdvertise.advertiseType)
      publishTo.set(foundsAdvertise.publishTo)
      publishFrom.set(foundsAdvertise.publishFrom)
      setIsOpen(false)
    }
    f()
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)

    const data = await updateAdvertise(Number(advertiseId), {
      type: 'UpdateAdvertiseRequest',
      title: title.value,
      link: link.value,
      mainImageUrl: mainImageUrl.value,
      active: active.toBoolean,
      advertiseType: advertiseType.value,
      publishTo: publishTo.toFormatApi,
      publishFrom: publishFrom.toFormatApi,
    })

    if (isUpdateAdvertiseRequestValidationError(data)) {
      title.setErrors(data.errors.title)
      link.setErrors(data.errors.link)
      active.setErrors(data.errors.active)
      mainImageUrl.setErrors(data.errors.mainImageUrl)
      advertiseType.setErrors(data.errors.advertiseType)
      publishTo.setErrors(data.errors.publishTo)
      publishFrom.setErrors(data.errors.publishFrom)
      setIsOpen(false)
      return
    }

    setIsOpen(false)
    await router.push('/advertise')
  }

  const onDropMainImage = (acceptedFiles) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader()

      reader.onabort = () => console.error('file reading was aborted')
      reader.onerror = () => console.error('file reading has failed')
      reader.onload = async () => {
        new Compressor(file, {
          quality: 1.0,
          maxWidth: advertiseType.value === AdvertiseType.MAIN_TOP ? 800 : 2000,
          async success(result) {
            try {
              // Send the compressed image file to server with XMLHttpRequest.
              const data = await putStorage(result)
              if (isAdminPutStorageRequestValidationError(data)) {
                mainImageUrl.setErrors(data.errors.file)
              }
              mainImageUrl.set(data.url)
            } catch (e) {
              mainImageUrl.setError(
                'エラーが発生しました。別の画像を試してください。'
              )
            }
          },
          error(err) {
            console.error(err.message)
          },
        })
      }
      reader.readAsDataURL(file)
    })
  }

  /**
   * 広告クリック数データのXlsxのダウンロード
   */
  const onDownloadAdvertiseCounterHistoryXlsx = async () => {
    await downloadAdvertiseCounterHistoryXlsx(Number(advertiseId))
  }

  return (
    <div>
      <Head>
        <title>広告発行</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      <BaseContainer>
        <BaseWrapper title="広告発行">
          <SubmitLoading isOpen={isOpen} />

          <div className="mb-4">
            <BlueButton
              type="button"
              onClick={onDownloadAdvertiseCounterHistoryXlsx}
            >
              広告のxlsxダウンロード
            </BlueButton>
          </div>

          <div className="border-2 border-gray-800 px-2 py-4">
            <EditAdvertiseForm
              onDropMainImage={onDropMainImage}
              onSubmit={onSubmit}
              form={{
                title,
                link,
                mainImageUrl,
                active,
                advertiseType,
                publishTo,
                publishFrom,
              }}
            />
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default CreatePage
