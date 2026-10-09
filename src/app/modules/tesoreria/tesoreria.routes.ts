import { Routes } from '@angular/router';

/** Proceso de ejemplo del taller: Documentos y registros, la solicitud y la consulta. */
export const TESORERIA_ROUTES: Routes = [
  {
    path: 'procesos/catalogos/relacion-perfil-ambito-categoria-presupuestaria',
    loadComponent: () =>
      import('../catalogos/relacion-perfil/relacion-perfil-categoria.component').then(
        (m) => m.RelacionPerfilCategoriaComponent,
      ),
  },
  {
    path: 'procesos/catalogos/relacion-perfil-ambito-categoria-presupuestaria/consultas-reportes',
    loadComponent: () =>
      import('../catalogos/relacion-perfil/relacion-perfil-reportes.component').then(
        (m) => m.RelacionPerfilReportesComponent,
      ),
  },
  {
    path: 'procesos/registro-cuentas-bancarias',
    loadComponent: () =>
      import('./cuentas-bancarias/pages/documents/cuentas-bancarias-documents.component').then(
        (m) => m.CuentasBancariasDocumentsComponent,
      ),
  },
  {
    path: 'procesos/registro-cuentas-bancarias/solicitud',
    loadComponent: () =>
      import('./cuentas-bancarias/pages/solicitud/cuenta-bancaria-request.component').then(
        (m) => m.CuentaBancariaRequestComponent,
      ),
  },
  {
    path: 'procesos/registro-cuentas-bancarias/solicitud/:id',
    loadComponent: () =>
      import('./cuentas-bancarias/pages/solicitud/cuenta-bancaria-request.component').then(
        (m) => m.CuentaBancariaRequestComponent,
      ),
  },
  {
    path: 'procesos/registro-cuentas-bancarias/consultas',
    loadComponent: () =>
      import('./cuentas-bancarias/pages/consultas/cuentas-bancarias-consultas.component').then(
        (m) => m.CuentasBancariasConsultasComponent,
      ),
  },
];
