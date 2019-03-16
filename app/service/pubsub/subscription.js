export default class Subscription {
    constructor(channel, callback) {
        this.channel = channel
        this.callback = callback

        this.channel.subscribe(callback)
    }
}
