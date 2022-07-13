import CompanyEntity from "../entities/CompanyEntity";
import CompanyPort from "../ports/CompanyPort";
import UseCase from "./UseCase";

export default class ListCompaniesUseCase implements UseCase<undefined, CompanyEntity[]> {
    constructor(public companyAdapter: CompanyPort) {}

    async execute(inputArgs: undefined): Promise<CompanyEntity[]> {
        const companies = await this.companyAdapter.list()

        return companies
    }
}
