import { DataProviderService } from "@/services/data-provider.service";

export const useDataProvider = () => {
  return DataProviderService.getInstance();
};
