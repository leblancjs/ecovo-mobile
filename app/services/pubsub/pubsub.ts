import * as Ably from 'ably'
import { AblyConfig } from '../../config'
import Service from '../service'
import Subscription, { SubscriptionCallback } from './subscription'

class PubSubService extends Service {
    private static instance?: PubSubService

    public static getInstance() {
        if (!PubSubService.instance) {
            PubSubService.instance = new PubSubService()
        }

        return PubSubService.instance
    }

    private readonly client: Ably.Realtime
    private readonly subscriptionsByTopic: {[key: string]: Subscription}

    constructor() {
        super()

        this.client = new Ably.Realtime(AblyConfig.apiKey)
        this.subscriptionsByTopic = {}
    }

    subscribe(topic: string, callback: SubscriptionCallback): Subscription {
        if (topic in this.subscriptionsByTopic) {
            return this.subscriptionsByTopic[topic]
        }
    
        const channel = this.client.channels.get(topic)

        const subscription = new Subscription(channel, callback)
        this.subscriptionsByTopic[topic] = subscription
        return subscription
    }
    
    unsubscribe(topic: string) {    
        delete this.subscriptionsByTopic[topic]
    }
}

export default PubSubService.getInstance()