import {
    CloneDeployed as CloneDeployedEvent,
    WritingEditionPurchased as WritingEditionPurchasedEvent,
} from "../../generated/Observability/Observability"
import { getOrCreateClone, getOrCreateWritingEditionPurchased } from "../utils/helper"

export function handleCloneDeployed(event: CloneDeployedEvent): void {
    const clone = getOrCreateClone(event.params.clone)
    clone.factory = event.params.factory
    clone.owner = event.params.owner
    clone.blockNumber = event.block.number
    clone.timestamp = event.block.timestamp
    clone.save()
}

export function handleWritingEditionPurchased(event: WritingEditionPurchasedEvent): void {

    const entity = getOrCreateWritingEditionPurchased(event.transaction.hash, event.logIndex)
    entity.clone = event.params.clone.toHexString()
    entity.tokenId = event.params.tokenId
    entity.recipient = event.params.recipient
    entity.price = event.params.price
    entity.message = event.params.message
    entity.blockNumber = event.block.number
    entity.timestamp = event.block.timestamp
    entity.save()
}
