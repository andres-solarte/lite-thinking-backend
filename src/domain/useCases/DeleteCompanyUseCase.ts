import CompanyEntity from "../entities/CompanyEntity";
import CompanyPort from "../ports/CompanyPort";
import UseCase from "./UseCase";

export type DeleteCompanyInputArgs = {
    id: string
}

export default class DeleteCompanyUseCase implements UseCase<DeleteCompanyInputArgs, void> {
    constructor(public companyAdapter: CompanyPort) {}

    async execute(inputArgs: DeleteCompanyInputArgs): Promise<void> {
        const {id} = inputArgs

        await this.companyAdapter.delete(id)
    }
}
