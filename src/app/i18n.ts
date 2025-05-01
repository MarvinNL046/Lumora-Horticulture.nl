import { getRequestConfig } from 'next-intl/server';
 
export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`../messages/${locale}/common.json`)).default
  };
});
