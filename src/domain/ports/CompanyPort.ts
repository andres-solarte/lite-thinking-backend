import CompanyEntity from "../entities/CompanyEntity";
import { CreateCompanyInputArgs } from "../useCases/CreateCompanyUseCase";

export default interface CompanyPort {
    create(attributes: CreateCompanyInputArgs): Promise<CompanyEntity>
    list(): Promise<CompanyEntity[]>
    delete(id: string): Promise<void>
}
