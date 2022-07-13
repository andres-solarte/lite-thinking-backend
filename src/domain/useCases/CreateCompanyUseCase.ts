import CompanyEntity from "../entities/CompanyEntity";
import CompanyPort from "../ports/CompanyPort";
import UseCase from "./UseCase";

export type CreateCompanyInputArgs = Omit<CompanyEntity, "id" | "createdAt" | "updatedAt">

export default class CreateCompanyUseCase implements UseCase<CreateCompanyInputArgs, CompanyEntity> {
    constructor(public companyAdapter: CompanyPort) {}

    async execute(inputArgs: CreateCompanyInputArgs): Promise<CompanyEntity> {
        const createdCompany = await this.companyAdapter.create(inputArgs)

        return createdCompany
    }
}
