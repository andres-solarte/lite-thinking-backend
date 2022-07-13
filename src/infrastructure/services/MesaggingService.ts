import { PublishCommand, PublishCommandInput } from "@aws-sdk/client-sns";
import MesaggingPort from "../../domain/ports/MesaggingPort";
import SnsService from "./SnsService";

export default class MesaggingService implements MesaggingPort {
    private _topicArn: string

    constructor() {
        if(!process.env.COMPANIES_TOPIC_ARN) throw new Error('The environment variable COMPANIES_TOPIC_ARN is required')

        this._topicArn = process.env.COMPANIES_TOPIC_ARN
    }

    async send(body: string): Promise<void> {
        const commandInput: PublishCommandInput = {
            Message: body,
            TopicArn: this._topicArn
        }

        const command = new PublishCommand(commandInput)

        await SnsService.client.send(command)
    }
}
