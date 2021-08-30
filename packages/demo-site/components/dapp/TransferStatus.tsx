import QRCode from "qrcode.react"
import { FC } from "react"
import type { VerificationRequestResponse } from "../../lib/verification-request"
import Spinner from "../Spinner"

type TransferStatusProps = {
  simulateFunction: () => Promise<void>
  verification: VerificationRequestResponse
}

const TransferStatus: FC<TransferStatusProps> = ({
  simulateFunction,
  verification
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Present KYC Verifiable Credential
      </h3>
      {verification ? (
        <>
          <label className="block text-sm font-medium text-gray-700">
            Scan this QR code with the verity app to provide your KYC Verifiable
            Credential:
          </label>
          <div className="py-4">
            <QRCode value={JSON.stringify(verification.qrCodeData)} />
          </div>
        </>
      ) : (
        <div className="py-8 prose">
          <h4>
            <Spinner className="inline w-5 h-5 mr-2 -ml-1" />
            Generating Verification Request ...
          </h4>
        </div>
      )}
      <label className="block text-sm font-medium text-gray-700">
        Alternatively, you can simulate verification:
      </label>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault()
          return simulateFunction()
        }}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Simulate Verification
      </button>
    </div>
  )
}

export default TransferStatus
