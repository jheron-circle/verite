import {
  createFullfillment,
  CredentialFulfillment,
  CredentialSigner,
  CreditScore,
  CREDIT_SCORE_ATTESTATION_MANIFEST_ID,
  creditScoreVerifiableCredentialPayload,
  KYCAMLAttestation,
  KYCAML_ATTESTATION_MANIFEST_ID,
  kycAmlVerifiableCredentialPayload,
  CredentialStatus
} from "@centre/verity"

import type { User } from "lib/database"
import { ProcessedCredentialApplication } from "types"

export async function createKycAmlFulfillment(
  user: User,
  credentialSigner: CredentialSigner,
  acceptedApplication: ProcessedCredentialApplication,
  status?: CredentialStatus
): Promise<CredentialFulfillment> {
  const verifiablePresentation = acceptedApplication.presentation

  const body: KYCAMLAttestation = {
    "@type": "KYCAMLAttestation",
    authorityId: "did:web:verity.id",
    approvalDate: new Date().toJSON(),
    authorityName: "Verity",
    authorityUrl: "https://verity.id",
    authorityCallbackUrl: "https://identity.verity.id",
    serviceProviders: [
      {
        "@type": "KYCAMLProvider",
        name: "Jumio",
        score: user.jumioScore
      },
      {
        "@type": "KYCAMLProvider",
        name: "OFAC-SDN",
        score: user.ofacScore
      }
    ]
  }

  return createFullfillment(
    credentialSigner,
    acceptedApplication,
    kycAmlVerifiableCredentialPayload(
      verifiablePresentation.holder,
      body,
      status
    )
  )
}

export async function createCreditScoreFulfillment(
  user: User,
  credentialSigner: CredentialSigner,
  acceptedApplication: ProcessedCredentialApplication
): Promise<CredentialFulfillment> {
  const verifiablePresentation = acceptedApplication.presentation

  const body: CreditScore = {
    "@type": "CreditScore",
    score: user.creditScore,
    scoreType: "Credit Rating",
    provider: "Experian"
  }

  return createFullfillment(
    credentialSigner,
    acceptedApplication,
    creditScoreVerifiableCredentialPayload(verifiablePresentation.holder, body)
  )
}

export async function createFulfillment(
  user: User,
  credentialSigner: CredentialSigner,
  application: ProcessedCredentialApplication,
  credentialStatus?: CredentialStatus
): Promise<CredentialFulfillment> {
  switch (application.credential_application.manifest_id) {
    case KYCAML_ATTESTATION_MANIFEST_ID:
      return createKycAmlFulfillment(
        user,
        credentialSigner,
        application,
        credentialStatus
      )
    case CREDIT_SCORE_ATTESTATION_MANIFEST_ID:
      return createCreditScoreFulfillment(user, credentialSigner, application)
    default:
      return null
  }
}