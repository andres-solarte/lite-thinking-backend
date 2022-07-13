import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export default class DynamoDBService {
    private static _client: DynamoDBClient

    static get client(): DynamoDBClient {
        if (!DynamoDBService._client) {
            DynamoDBService._client = new DynamoDBClient({
                region: process.env.AWS_REGION
            })
        }

        return DynamoDBService._client
    }
}
