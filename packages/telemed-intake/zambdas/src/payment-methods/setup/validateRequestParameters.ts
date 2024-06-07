import { PaymentMethodSetupParameters, Secrets, ZambdaInput } from 'ottehr-utils';

export function validateRequestParameters(
  input: ZambdaInput
): PaymentMethodSetupParameters & { secrets: Secrets | null } {
  if (!input.body) {
    throw new Error('No request body provided');
  }

  const { beneficiaryPatientId } = JSON.parse(input.body);

  if (!beneficiaryPatientId) {
    throw new Error('beneficiaryPatientId is not defined');
  }

  return {
    beneficiaryPatientId,
    secrets: input.secrets,
  };
}
