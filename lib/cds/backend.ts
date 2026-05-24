import { createAwsCdsProvider } from './providers/aws';
import { createLocalCdsProvider } from './providers/local';
import { CdsProvider } from './types';

export type CdsProviderName = 'local' | 'aws';

function resolveCdsProviderName(): CdsProviderName {
  const value = (process.env.CDS_PROVIDER ?? 'local').toLowerCase();

  if (value === 'local' || value === 'aws') {
    return value;
  }

  throw new Error(`Unsupported CDS_PROVIDER value: ${process.env.CDS_PROVIDER}`);
}

export function createCdsProvider(name: CdsProviderName = resolveCdsProviderName()): CdsProvider {
  if (name === 'aws') {
    return createAwsCdsProvider();
  }

  return createLocalCdsProvider();
}

export function getCdsProviderName(): CdsProviderName {
  return resolveCdsProviderName();
}
