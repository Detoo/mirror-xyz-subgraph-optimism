import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { Clone, WritingEditionPurchased } from "../../generated/schema"

export function getOrCreateClone(addr: Address): Clone {
    let clone = Clone.load(addr.toHexString())
    if (!clone) {
        clone = new Clone(addr.toHexString())
    }
    return clone
}

export function getOrCreateWritingEditionPurchased(hash: Bytes, logIndex: BigInt): WritingEditionPurchased {
    const key = `${hash.toHexString()}-${logIndex.toString()}`
    let event = WritingEditionPurchased.load(key)
    if (!event) {
        event = new WritingEditionPurchased(key)
    }
    return event
}
