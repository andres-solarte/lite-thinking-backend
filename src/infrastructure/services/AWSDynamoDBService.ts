import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export default class AWSDynamoDBService {
    private static _client: DynamoDBClient

    static get client(): DynamoDBClient {
        if (!AWSDynamoDBService._client) {
            AWSDynamoDBService._client = new DynamoDBClient({
                region: process.env.AWS_REGION
            })
        }

        return AWSDynamoDBService._client
    }
}
