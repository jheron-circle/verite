import { FC } from "react"

export type NoTokensMessageProps = {
  selectedAddress: string
}

const NoTokensMessage: FC<NoTokensMessageProps> = ({ selectedAddress }) => {
  return (
    <>
      <p>You don't yet have tokens to transfer.</p>
      <p>
        To get some tokens, open a terminal in the root of the repository and run:
        <br />
        <br />
        <code>npx hardhat --network localhost faucet {selectedAddress}</code>
        <br />
        <br />
        The UI will update a moment or two after you run that command, once the result is mined.
      </p>
    </>
  );
}

export default NoTokensMessage
