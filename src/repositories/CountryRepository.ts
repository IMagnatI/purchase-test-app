import Country from './mocks/countries'
import type { ICountry } from '@/types/CountryTypes'

class CountryRepository {
  public getCountries(): ICountry[] {
    return Country
  }
}

export default new CountryRepository()
