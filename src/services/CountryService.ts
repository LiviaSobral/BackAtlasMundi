import { AppDataSource } from '../data-source'
import { Country } from '../entities/Country'

export class CountryService {
    private repo = AppDataSource.getRepository(Country)

    async create(data: {name:string, quick:string, url:string , pol:string, pol2:string, his:string, his2:string, cul:string, cul2:string,lang:boolean, source:string}){
        const exists = await this.repo.findOne({where:{name: data.name, inEnglish: data.lang}})
        if(exists){
            throw new Error('Country already exists')
        }
        const country = this.repo.create(data)
        return await this.repo.save(country)
    }

    async update(name:string, lang:boolean, data: Partial<Country>){
        const country = await this.repo.findOne({where:{name:name,inEnglish:lang}})
        if(!country){
            throw new Error("Country was not found")
        }
        Object.assign(country,data)
        return await this.repo.save(country);
    }

    async findByName(lang:boolean, name:string){
        const country = await this.repo.findOne({where:{name: name, inEnglish: lang}})
        if(!country){
            throw new Error("Country was not found")
        }
        return country;
    }

    async remove(name:string, lang:boolean){
        const country = await this.repo.findOne({where:{name:name, inEnglish:lang}})
        if(!country){
            throw new Error("Country was not found")
        }
        await this.repo.remove(country);
        return {message: 'Country deleted'}
    }
}
