import { AddressLookupTableAccount, Connection, PublicKey, TransactionInstruction } from "@solana/web3.js"

/**
 * * Compose Query URL
 * @param endpoint 
 * @param params 
 * @returns URL
 */
export const composeQueryUrl = (endpoint: string, params?: { [key: string]: string }) => {
    const url = new URL(endpoint)
    url.search = new URLSearchParams(params).toString()

    return url
}

/**
 * Wait
 * @param time 
 * @returns void
 */
export const wait = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time))

/**
 * * Array Deep Equals
 * @param array1 
 * @param array2 
 * @param eq 
 * @returns boolean
 */
export const arrayDeepEquals = <T, U>(
    array1: Readonly<T[]>,
    array2: Readonly<U[]>,
    eq: (a: T, b: U) => boolean
) => {
    if (array1.length !== array2.length) {
        return false
    }
    return array1.reduce((prev, current, index) => {
        const other = array2[index]
        if (other == null) {
            return false
        }
        return prev && eq(current, other)
    }, true)
}

/**
 * * Instruction Equals
 * @param ix1 
 * @param ix2 
 * @returns boolean
 */
export const instructionEquals = (
    ix1: TransactionInstruction,
    ix2: TransactionInstruction
) => {
    return (
        ix1.programId.equals(ix2.programId) &&
        arrayDeepEquals(
            ix1.keys,
            ix2.keys,
            (a, b) =>
                a.isSigner === b.isSigner &&
                a.isWritable === b.isWritable &&
                a.pubkey.equals(b.pubkey)
        ) &&
        arrayDeepEquals(
            Array.from(ix1.data),
            Array.from(ix2.data),
            (a, b) => a === b
        )
    )
}

export const getMintDecimals = async (connection: Connection, mint: PublicKey) => {
    const parsedAccount = await connection.getParsedAccountInfo(
        mint,
        "confirmed"
    )
    const mintAccountData = parsedAccount.value?.data

    if (!mintAccountData)
        throw new Error("Could not find mint account")

    const mintDecimals = (mintAccountData as any).parsed.info.decimals as number

    return mintDecimals
}

export const getAddressLookupTableAccounts = async (
    keys: string[],
    connection: Connection,
): Promise<AddressLookupTableAccount[]> => {
    const addressLookupTableAccountInfos =
        await connection.getMultipleAccountsInfo(
            keys.map((key) => new PublicKey(key))
        )

    return addressLookupTableAccountInfos.reduce((acc, accountInfo, index) => {
        const addressLookupTableAddress = keys[index]
        if (accountInfo) {
            const addressLookupTableAccount = new AddressLookupTableAccount({
                key: new PublicKey(addressLookupTableAddress),
                state: AddressLookupTableAccount.deserialize(accountInfo.data),
            })
            acc.push(addressLookupTableAccount)
        }

        return acc
    }, new Array<AddressLookupTableAccount>())
}


export const instructionDataToTransactionInstruction = (
    instruction: any
) => {
    if (instruction === null || instruction === undefined) return null;
    return new TransactionInstruction({
        programId: new PublicKey(instruction.programId),
        keys: instruction.accounts.map((key: any) => ({
            pubkey: new PublicKey(key.pubkey),
            isSigner: key.isSigner,
            isWritable: key.isWritable,
        })),
        data: Buffer.from(instruction.data, "base64"),
    })
}

export const lamportsToMicroLamports = (lamports: number) => lamports / (10 ** 6)
export const microLamportsToLamports = (microLamports: number) => microLamports * (10 ** 6)
