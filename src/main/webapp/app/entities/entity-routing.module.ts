import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'societe',
        data: { pageTitle: 'Societes' },
        loadChildren: () => import('./ERPLTEDB/societe/societe.module').then(m => m.ErpltedbSocieteModule),
      },
      {
        path: 'activite',
        data: { pageTitle: 'Activites' },
        loadChildren: () => import('./ERPLTEDB/activite/activite.module').then(m => m.ErpltedbActiviteModule),
      },
      {
        path: 'secteur',
        data: { pageTitle: 'Secteurs' },
        loadChildren: () => import('./ERPLTEDB/secteur/secteur.module').then(m => m.ErpltedbSecteurModule),
      },
      {
        path: 'banquecl',
        data: { pageTitle: 'Banquecls' },
        loadChildren: () => import('./ERPLTEDB/banquecl/banquecl.module').then(m => m.ErpltedbBanqueclModule),
      },
      {
        path: 'poste',
        data: { pageTitle: 'Postes' },
        loadChildren: () => import('./ERPLTEDB/poste/poste.module').then(m => m.ErpltedbPosteModule),
      },
      {
        path: 'modereg',
        data: { pageTitle: 'Moderegs' },
        loadChildren: () => import('./ERPLTEDB/modereg/modereg.module').then(m => m.ErpltedbModeregModule),
      },
      {
        path: 'categorietarif',
        data: { pageTitle: 'Categorietarifs' },
        loadChildren: () => import('./ERPLTEDB/categorietarif/categorietarif.module').then(m => m.ErpltedbCategorietarifModule),
      },
      {
        path: 'gouvernorat',
        data: { pageTitle: 'Gouvernorats' },
        loadChildren: () => import('./ERPLTEDB/gouvernorat/gouvernorat.module').then(m => m.ErpltedbGouvernoratModule),
      },
      {
        path: 'region',
        data: { pageTitle: 'Regions' },
        loadChildren: () => import('./ERPLTEDB/region/region.module').then(m => m.ErpltedbRegionModule),
      },
      {
        path: 'representant',
        data: { pageTitle: 'Representants' },
        loadChildren: () => import('./ERPLTEDB/representant/representant.module').then(m => m.ErpltedbRepresentantModule),
      },
      {
        path: 'client',
        data: { pageTitle: 'Clients' },
        loadChildren: () => import('./ERPLTEDB/client/client.module').then(m => m.ErpltedbClientModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
