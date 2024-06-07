import { APIGatewayProxyResult } from 'aws-lambda';
import { IcdSearchResponse } from 'ehr-utils';
import { SecretsKeys, getSecret } from '../shared';
import { ZambdaInput } from '../types';
import { validateRequestParameters } from './validateRequestParameters';

export const index = async (input: ZambdaInput): Promise<APIGatewayProxyResult> => {
  try {
    console.group('validateRequestParameters');
    const validatedParameters = validateRequestParameters(input);
    const { secrets, search } = validatedParameters;
    console.groupEnd();
    console.debug('validateRequestParameters success');

    const response: IcdSearchResponse = { codes: [] };
    // search codes
    try {
      const icdResponse = await fetch(
        `https://uts-ws.nlm.nih.gov/rest/search/current?apiKey=${apiKey}&pageSize=50&returnIdType=code&inputType=sourceUi&string=${search}&sabs=ICD10CM`
      );
      if (!icdResponse.ok) {
        throw new Error(icdResponse.statusText);
      }
      const icdResponseBody = (await icdResponse.json()) as {
        pageSize: number;
        pageNumber: number;
        result: {
          results: {
            ui: string;
            name: string;
          }[];
        };
      };
      response.codes = icdResponseBody.result.results.map((entry) => ({
        code: entry.ui,
        display: entry.name,
      }));
    } catch (error) {
      console.error('Error while trying to request NLM ICD10 search endpoint', JSON.stringify(error));
      throw new Error('Error while trying to get ICD-10 codes');
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    console.log('Error: ', JSON.stringify(error.message));
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
