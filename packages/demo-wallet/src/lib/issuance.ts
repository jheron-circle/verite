const data = {
  credential_submission: {
    id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    manifest_id: "Circle-KYCAMLAttestation",
    format: {
      jwt_vp: {
        alg: ["EdDSA", "ES256K"]
      }
    }
  },
  presentation_submission: {
    id: "a30e3b91-fb77-4d22-95fa-871689c322e2",
    definition_id: "32f54163-7166-48f1-93d8-ff217bdb0653",
    descriptor_map: [
      {
        id: "input_1",
        format: "jwt_vp",
        path: "$.presentation"
      }
    ]
  },
  presentation: {
    verifiableCredential: [
      {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential"],
        credentialSubject: {
          id: "did:key:z6MkfxQU7dy8eKxyHpG267FV23agZQu9zmokd8BprepfHALi"
        }
      }
    ],
    holder: "did:key:z6MkfxQU7dy8eKxyHpG267FV23agZQu9zmokd8BprepfHALi",
    proof: {
      type: "Ed25519Signature2018",
      created: "2020-12-08T20:12:18Z",
      challenge: "e1b35ae0-9e0e-11ea-9bbf-a387b27c9e60",
      jws: "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..MfVEy102c4oZA_G98G6HUxEmfXFLEIWbX9C36zF_cA-D8EF8jRMQWc5eJpMn3hgLm2xhPw8GzTrnwPHa37L-DA",
      proofPurpose: "authentication",
      verificationMethod:
        "did:key:z6MksMYtQSvQsfk3KZy7vxBzjcBJhx1i7TaLuvJePPPDEAjH#z6MksMYtQSvQsfk3KZy7vxBzjcBJhx1i7TaLuvJePPPDEAjH"
    }
  }
}

export const requestIssuance = async (
  url: string,
  did: string,
  proof: string
): Promise<Response> => {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
}
