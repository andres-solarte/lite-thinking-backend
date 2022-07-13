import { APIGatewayProxyEvent } from "aws-lambda";
import CreateCompanyUseCase from "../../../domain/useCases/CreateCompanyUseCase";
import CompanyRepository from "../../../infrastructure/repositories/CompanyRepository";
import corsHeaders from "../../constants/CorsHeaders";

export const handler = async (event: APIGatewayProxyEvent) => {
    const {body} = event
    const jsonBody = JSON.parse(body || '{}')

    const companyAdapter = new CompanyRepository()
    const useCase = new CreateCompanyUseCase(companyAdapter)

    await useCase.execute(jsonBody)

    return {
        statusCode: 201,
        headers: corsHeaders
    }
}
