import CompanyEntity from "../entities/CompanyEntity";
import CompanyPort from "../ports/CompanyPort";
import MesaggingPort from "../ports/MesaggingPort";
import UseCase from "./UseCase";

export type DeleteCompanyInputArgs = {
    id: string
}

export default class DeleteCompanyUseCase implements UseCase<DeleteCompanyInputArgs, void> {
    constructor(public companyAdapter: CompanyPort, public mesaggingAdapter: MesaggingPort) {}

    async execute(inputArgs: DeleteCompanyInputArgs): Promise<void> {
        const {id} = inputArgs

        await Promise.all([
            this.companyAdapter.delete(id),
            this.mesaggingAdapter.send(`Deleted comany with ID ${id}`)
        ])
    }
}
