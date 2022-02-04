import ClientInstance from "../../../instance/client"

export default class TwoFactorManager {
    constructor(private client: ClientInstance) {}

    retrieveQrCode() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve((await this.client.call({ endpoint: "account/two-factor" })).data.image_url_data)
            } catch (e) {
                reject(e)
            }
        })
    }

    enable(code: string): Promise<string[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve((await this.client.call({ endpoint: "account/two-factor", method: "POST", body: { code } })).attributes.tokens)
            } catch (e) {
                reject(e)
            }
        })
    }

    disable(password: string) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.client.call({ endpoint: "account/two-factor", method: "DELETE", body: { password } }))
            } catch (e) {
                reject(e)
            }
        })
    }
}
