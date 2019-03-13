import * as Ably from 'ably'
import { apiKey } from '../../../ably.config.json'
import Subscription from './subscription'

const client = new Ably.Realtime(apiKey)
const channelPrefix = 'search:'

const subscriptionsByTopic = {}

function subscribe(topic, callback) {
    if (!topic) {
        throw "pubsub.Service: cannot subscribe to nil or empty topic"
    }

    if (topic in subscriptionsByTopic) {
        return subscriptionsByTopic[topic]
    }

    let channel = client.channels.get(channelPrefix + topic)
    let sub = new Subscription(channel, callback)
    subscriptionsByTopic[topic] = sub
    return sub
}

function unsubscribe(topic) {
    if (!!topic) {
        return
    }

    delete subscriptionsByTopic[channelPrefix + topic]
}

export default PubSubService = {
    subscribe,
    unsubscribe
}