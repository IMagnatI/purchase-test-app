import { Pinia, Store } from 'pinia-class-component'
import type { ICountry } from '@/types/CountryTypes'
import CountryRepository from '@/repositories/CountryRepository'

interface ICountryStore {
  countries: ICountry[]
}

@Store
export default class CountryService extends Pinia {
  public store: ICountryStore = {
    countries: [],
  }

  public get countries(): ICountry[] {
    return this.store.countries
  }

  public async loadCountries(): Promise<void> {
    this.store.countries = CountryRepository.getCountries()
  }
}
