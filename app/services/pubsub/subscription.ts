import Message from './message'

export type SubscriptionCallback = (message: Message) => void

export default class Subscription {
    constructor(
        private channel: any,
        private callback: SubscriptionCallback,
    ) {
        this.channel.subscribe(this.callback)
    }

    history = () => {
        this.channel.history((error: any, resultPage: any) => {
            const results: Message[] = resultPage.items
            if (results.length > 0) {
                results.forEach((result: Message) => this.callback(result))
            }
        })
    }
}
