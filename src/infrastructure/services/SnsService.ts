import { SNSClient } from "@aws-sdk/client-sns";

export default class SnsService {
    private static _client: SNSClient

    static get client(): SNSClient {
        if (!SnsService._client) {
            SnsService._client = new SNSClient({
                region: process.env.AWS_REGION
            })
        }

        return SnsService._client
    }
}
