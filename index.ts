import { Connection, PublicKey } from "@solana/web3.js"
import { generateLogEntry } from "./lib/generateLogEntry"

const main = async () => {
    // Set up an RPC Connection
    const connection = new Connection('https://api.mainnet-beta.solana.com', { commitment: 'confirmed' })

    // Get pee.sol Public Key
    const peeSolAddress = "7grEJpUaWyNnXj4ZZherbv59Zc94SgD6T2b6S8YtXALB"
    const peeSolPublicKey = new PublicKey(peeSolAddress)

    /**
     ** Get signatures by Public Key address (max of 1,000 transaction signatrues per request; may require iterating/looping)
     * @dev https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getSignaturesForAddress
     */
    
    let signatures = await connection.getSignaturesForAddress(peeSolPublicKey)
    console.log(signatures)

    /**
     ** Get multiple transactions' details by signature (max of 10 transaction details per request; may require iterating/looping through signatures)
     * @dev https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedTransactions
     * @dev https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getTransactions 
     */
    
    // let parsedTransactions = await connection.getParsedTransactions(
    //     [], // Array of signatures to query
    //     { maxSupportedTransactionVersion: 0 }
    // )

    // let transactions = await connection.getTransactions(
    //     [], // Array of signatures to query
    //     { maxSupportedTransactionVersion: 0 }
    // )

    /**
     ** Get a single transaction's details by signature
     * @dev https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedTransaction
     * @dev https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getTransaction 
     */
    
     // let parsedTransaction = await connection.getParsedTransaction(
    //     '', // Signature of the transaction to query
    //     { maxSupportedTransactionVersion: 0 }
    // )

    // let transaction = await connection.getTransaction(
    //     '', // Signature of the transaction to query
    //     { maxSupportedTransactionVersion: 0 }
    // )


    // * Create a log entry object
    // const logEntry = {
    //     timestamp: new Date().toISOString(),
    //     log: null
    // }

    // * Uncomment the next line to create a log file of your logEntry object
    // generateLogEntry('/logs/pee-sol-transactions', logEntry)

}

main().catch(err => console.error(err))