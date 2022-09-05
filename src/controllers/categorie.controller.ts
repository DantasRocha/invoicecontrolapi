import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {param, put, requestBody, response} from '@loopback/rest';
import {Archives, Categorie} from '../models';
import {ArchivesRepository, CategorieRepository} from '../repositories';
@authenticate('jwt')
export class Categories {
  constructor(
    @repository(CategorieRepository)
    public categorieRepository: CategorieRepository,
    @repository(ArchivesRepository)
    public archivesRepository: ArchivesRepository,
  ) {}

  @put('/categories/{id}/archives')
  @response(204, {
    description: 'Archives PUT success',
  })
  async replaceByCategoriaId(
    @param.path.number('id') id: number,
    @requestBody() archives: Archives,
  ): Promise<void> {
    const archivesGetId = await this.archivesRepository.findOne({
      where: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        categorie_id: id,
      },
    });
    if (archivesGetId?.id) {
      await this.archivesRepository.replaceById(archivesGetId.id, archives);
    }
  }

  @put('/categories/{id}')
  @response(204, {
    description: 'Categorie PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() categorie: Categorie,
  ): Promise<void> {
    await this.categorieRepository.replaceById(id, categorie);
  }
}
