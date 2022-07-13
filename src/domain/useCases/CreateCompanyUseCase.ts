import CompanyEntity from "../entities/CompanyEntity";
import CompanyPort from "../ports/CompanyPort";
import MesaggingPort from "../ports/MesaggingPort";
import UseCase from "./UseCase";

export type CreateCompanyInputArgs = Omit<CompanyEntity, "id" | "createdAt" | "updatedAt">

export default class CreateCompanyUseCase implements UseCase<CreateCompanyInputArgs, CompanyEntity> {
    constructor(public companyAdapter: CompanyPort, public mesaggingPort: MesaggingPort) {}

    async execute(inputArgs: CreateCompanyInputArgs): Promise<CompanyEntity> {
        const createdCompany = await this.companyAdapter.create(inputArgs)

        await this.mesaggingPort.send(`Created Company ${JSON.stringify(createdCompany)}`)

        return createdCompany
    }
}
