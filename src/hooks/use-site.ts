import { useContext, createContext, Context  } from 'react';

import config from '../../package.json';
import { removeLastTrailingSlash } from '../lib/util';

interface SiteContextType {
  homepage?: string;
  [key: string]: any;  // allows any other properties
}

export const SiteContext: Context<SiteContextType | undefined> = createContext<SiteContextType | undefined>(undefined);

/**
 * useSiteContext
 */

export function useSiteContext(data: SiteContextType): SiteContextType{
  let { homepage = '' } = config;

  // Trim the trailing slash from the end of homepage to avoid
  // double // issues throughout the metadata

  homepage = removeLastTrailingSlash(homepage);

  return {
    ...data,
    homepage,
  };
}

/**
 * useSite
 */

export default function useSite() {
  const site = useContext(SiteContext);
  return site;
}
