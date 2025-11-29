import { useQuery } from '@tanstack/react-query'
import { getTaxByCountry } from '../api/taxes'
import { queryKeys } from '@/lib/query-keys'

/**
 * Hook to fetch tax by country
 * 
 * @param country - Country code
 * @returns Query hook for tax
 */
export const useTaxByCountry = (country: string) => {
  return useQuery({
    queryKey: queryKeys.taxes.byCountry(country),
    queryFn: () => getTaxByCountry(country),
    enabled: !!country,
    staleTime: 1000 * 60 * 30, // 30 minutes (taxes don't change often)
  })
}

