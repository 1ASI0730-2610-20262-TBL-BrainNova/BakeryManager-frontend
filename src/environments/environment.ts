/**
 * @summary Production environment configuration.
 * @author u20241a195 - Sofia Diaz Yurivilca
 */
export const environment = {
  production: true,
  bakeryManagerProviderApiBaseUrl: 'https://bakery-manager-platform-pkoa.onrender.com/api/v1',
  productionProviderBatchesEndpointPath: '/batches',
  platformProviderApiBaseUrl: 'https://bakery-manager-platform-pkoa.onrender.com/api/v1',
  platformProviderSignInEndpointPath: '/authentication/sign-in',
  platformProviderSignUpEndpointPath: '/authentication/sign-up',
  monitoringProviderIncidentsEndpointPath: '/incidents',
  monitoringProviderSensorsEndpointPath: '/sensors',
  inventoryProviderItemsEndpointPath: '/inventory-items',
};
