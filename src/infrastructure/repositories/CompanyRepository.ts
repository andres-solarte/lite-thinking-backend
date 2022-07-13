import { DeleteItemCommand, DeleteItemCommandInput, PutItemCommand, PutItemCommandInput, ScanCommand, ScanCommandInput} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import CompanyEntity from "../../domain/entities/CompanyEntity"
import CompanyPort from "../../domain/ports/CompanyPort"
import { CreateCompanyInputArgs } from '../../domain/useCases/CreateCompanyUseCase';
import DynamoDBService from '../services/DynamoDBService';

export default class CompanyRepository implements CompanyPort {
    private _tableName: string

    constructor() {
        if (!process.env.COMPANY_TABLE_NAME)
            throw new Error('Env variable COMPANY_TABLE_NAME must be set')

        this._tableName = process.env.COMPANY_TABLE_NAME
    }

    async create(attributes: CreateCompanyInputArgs): Promise<CompanyEntity> {
        const item: CompanyEntity = {
            ...attributes,
            id: uuidv4(),
            createdAt: Date.now(),
        }

        const input: PutItemCommandInput = {
            TableName: this._tableName,
            Item: marshall(item)
        }

        const command = new PutItemCommand(input);

        await DynamoDBService.client.send(command)

        return item as CompanyEntity
    }

    async list(): Promise<CompanyEntity[]> {
        const input: ScanCommandInput = {
            TableName: this._tableName
        }

        const command = new ScanCommand(input)
        const commandOutput = await DynamoDBService.client.send(command)

        return commandOutput.Items
        ? commandOutput.Items.map(item => unmarshall(item) as CompanyEntity)
        : []
    }

    async delete(id: string): Promise<void> {
        const input: DeleteItemCommandInput = {
            TableName: this._tableName,
            Key: marshall({ id })
        }

        await DynamoDBService.client.send(
            new DeleteItemCommand(input)
        )
    }
}
