import { APIGatewayProxyEvent } from "aws-lambda";
import DeleteCompanyUseCase from "../../../domain/useCases/DeleteCompanyUseCase";
import CompanyRepository from "../../../infrastructure/repositories/CompanyRepository";
import corsHeaders from "../../constants/CorsHeaders";

export const handler = async (event: APIGatewayProxyEvent) => {
    const {body} = event
    const jsonBody = JSON.parse(body || '{}')

    if(!jsonBody.id) throw new Error('Id is required')

    const companyAdapter = new CompanyRepository()
    const useCase = new DeleteCompanyUseCase(companyAdapter)

    await useCase.execute(jsonBody.id)

    return {
        statusCode: 200,
        headers: corsHeaders
    }
}