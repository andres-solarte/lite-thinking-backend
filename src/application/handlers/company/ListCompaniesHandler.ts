import { APIGatewayProxyEvent } from "aws-lambda";
import ListCompaniesUseCase from "../../../domain/useCases/ListCompaniesUseCase";
import CompanyRepository from "../../../infrastructure/repositories/CompanyRepository";
import corsHeaders from "../../constants/CorsHeaders";

export const handler = async (event: APIGatewayProxyEvent) => {
    const companyAdapter = new CompanyRepository()
    const useCase = new ListCompaniesUseCase(companyAdapter)

    const companies = await useCase.execute(undefined)

    return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({companies})
    }
}