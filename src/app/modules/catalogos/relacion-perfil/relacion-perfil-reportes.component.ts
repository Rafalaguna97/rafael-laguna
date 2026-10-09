import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import type { QueryReportExportEvent } from '../../../shared/components/query-report-page/query-report-page.component';
import { ConsultasFiltrosChipsComponent } from '../../../shared/components/consultas-filtros-chips/consultas-filtros-chips.component';
import { FilterPillComponent } from '../../../shared/components/filter-pill/filter-pill.component';
import { FormTableSearchComponent } from '../../../shared/components/form-table-search/form-table-search.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { PageShellComponent } from '../../../shared/components/page-shell/page-shell.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { QueryParametersPanelComponent } from '../../../shared/components/query-parameters-panel/query-parameters-panel.component';
import type { QueryReportConfig, QueryReportParameters, QueryReportResult, QueryReportRow } from '../../../shared/types/query-report.types';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { EmptyStateComponent } from '../../../shared/ui/empty-state/empty-state.component';
import { IconDropdownMenuComponent } from '../../../shared/ui/icon-dropdown-menu/icon-dropdown-menu.component';
import { ReportTableComponent } from '../../../shared/ui/report-table/report-table.component';

const FILAS: QueryReportRow[] = [
  { id: '1', proceso: '15 Catálogo de Estructura Funcional Programática - EFP', rol: '1 Creador', perfil: '3 Dirección General de Presupuesto Público - EFP PP', ambito: '1 PP', estado: 'Sí', desde: '19/08/2026', hasta: '' },
  { id: '2', proceso: '15 Catálogo de Estructura Funcional Programática - EFP', rol: '1 Creador', perfil: '4 Dirección General de Presupuesto Público - EFP APNOP y AC', ambito: '6 APNOP, AC', estado: 'Sí', desde: '19/08/2026', hasta: '' },
  { id: '3', proceso: '15 Catálogo de Estructura Funcional Programática - EFP', rol: '2 Evaluador', perfil: '3 Dirección General de Presupuesto Público - EFP PP', ambito: '1 PP', estado: 'Sí', desde: '19/08/2026', hasta: '' },
  { id: '4', proceso: '15 Catálogo de Estructura Funcional Programática - EFP', rol: '3 Aprobador', perfil: '3 Dirección General de Presupuesto Público - EFP PP', ambito: '1 PP', estado: 'Sí', desde: '19/08/2026', hasta: '' },
];

/** Consulta del catálogo de relaciones: parte desde el acceso «Consultas y reportes» del Panel. */
@Component({
  selector: 'siaf-relacion-perfil-reportes',
  standalone: true,
  imports: [ButtonComponent, ConsultasFiltrosChipsComponent, EmptyStateComponent, FilterPillComponent, FormTableSearchComponent, IconComponent, IconDropdownMenuComponent, PageHeaderComponent, PageShellComponent, PaginationComponent, QueryParametersPanelComponent, ReportTableComponent],
  template: `
    <siaf-page-shell [breadcrumbs]="configuracion().breadcrumbs">
      <siaf-page-header pageHeader [title]="configuracion().title" subtitle="Consultas y reportes"><siaf-button actions variant="accent" icon="manage_search" (click)="busquedaAbierta.set(true)">Búsqueda</siaf-button></siaf-page-header>
      @if (!resultado()) {
        <section class="flex min-h-[calc(100vh-220px)] items-center justify-center rounded-siaf-md bg-surface"><siaf-empty-state illustration="no-records" title="Aún no se encontraron resultados" description="Ingrese los criterios de búsqueda para visualizar la información disponible." /></section>
      } @else {
        <div class="flex min-h-0 flex-1 flex-col gap-siaf-md">
          <siaf-consultas-filtros-chips [chips]="filtrosAplicados()" (cleared)="limpiarConsulta()" />
          <section class="flex min-h-0 flex-1 flex-col rounded-siaf-md bg-surface p-siaf-lg">
            <header class="flex items-center gap-siaf-md"><h2 class="m-0 flex-1 text-base font-bold uppercase">Resultado de la búsqueda</h2><siaf-icon-dropdown-menu icon="file_download" ariaLabel="Exportar" variant="accent" density="standard" [items]="opcionesExportacion" (selected)="exportarFormato($event)" /></header>
            <section class="mt-siaf-lg"><h3 class="m-0 text-sm font-bold uppercase">Datos</h3><div class="mt-siaf-md px-siaf-md text-sm"><span class="block text-[var(--sys-color-text-neutral-low)]">Proceso/Procedimiento</span><span>15 Catálogo de Estructura Funcional Programática - EFP</span></div></section>
            <h3 class="mb-siaf-lg mt-siaf-xl text-sm font-bold uppercase">Relación perfil por ámbito de categoría presupuestaria</h3>
            <div class="relative"><siaf-form-table-search [value]="busquedaTabla()" (valueChange)="busquedaTabla.set($event)" (more)="alternarMenuTabla()" />@if (menuTablaAbierto()) { <div class="absolute right-0 top-12 z-20 w-[270px] rounded-siaf-sm bg-[var(--sys-color-bg-states-light-selected)] p-siaf-xs shadow-siaf-elevation-2"><button class="w-full rounded-siaf-sm px-siaf-sm py-siaf-md text-left text-xs font-bold text-[var(--sys-color-text-neutral-activated)]" type="button" (click)="menuTablaAbierto.set(false); abrirConfiguracion()">Configuración de tabla</button></div> }</div>
            <div class="mt-siaf-md"><siaf-filter-pill label="Estado de registro" [options]="opcionesEstado" [selectedValue]="filtroEstado()" (selectedValueChange)="filtroEstado.set($event)" /></div>
            <div class="mt-siaf-xl min-h-0 flex-1"><siaf-report-table [columns]="configuracion().columns" [rows]="filasVisibles()" rowKey="id" ariaLabel="Relaciones de perfil por ámbito" /></div>
            <siaf-pagination navigation="Activate" position="Bottom" [rowPage]="true" [page]="1" [pageSize]="10" [rowsPerPage]="10" [totalItems]="filasVisibles().length" [totalPages]="1" />
          </section>
        </div>
      }
    </siaf-page-shell>
    <siaf-query-parameters-panel [open]="busquedaAbierta()" title="Búsqueda" [fields]="configuracion().parameterFields" [values]="criterios()" (closed)="busquedaAbierta.set(false)" (applied)="consultar($event)" />

    @if (configuracionAbierta()) {
      <section class="siaf-sidepanel-overlay fixed inset-y-0 left-0 right-0 z-50 bg-black/55 pl-0 lg:pl-[65px]" role="dialog" aria-modal="true" aria-labelledby="configuracion-tabla-title" (click)="cancelarConfiguracion()">
        <aside class="absolute bottom-0 right-0 top-0 flex w-full max-w-[420px] flex-col overflow-hidden border-l border-[var(--sys-color-divider-default)] bg-surface shadow-siaf-elevation-8" (click)="$event.stopPropagation()">
          <header class="flex h-14 items-center gap-siaf-xs border-b border-[var(--sys-color-divider-default)] px-siaf-md"><h2 id="configuracion-tabla-title" class="m-0 flex-1 text-base font-bold uppercase">Configuración de tabla</h2><button class="inline-flex size-10 items-center justify-center" type="button" aria-label="Cerrar configuración" (click)="cancelarConfiguracion()"><siaf-icon name="close" [size]="24" /></button></header>
          <div class="min-h-0 flex-1 overflow-y-auto px-siaf-lg py-siaf-md"><div class="grid gap-siaf-md text-sm text-[var(--sys-color-text-neutral-medium)]">
            <label class="flex items-center gap-siaf-sm font-medium"><input class="size-5 accent-brand-primary" type="checkbox" [checked]="todasMarcadas()" (change)="alternarTodas($any($event.target).checked)" /> Seleccionar todo</label>
            <section class="grid gap-siaf-sm"><h3 class="m-0 text-xs font-medium uppercase">Datos generales</h3>@for (columna of columnasBase.slice(0, 4); track columna.key) { <label class="flex items-center gap-siaf-sm"><input class="size-5 accent-brand-primary" type="checkbox" [checked]="estaMarcada(columna.key)" [disabled]="columna.key === 'proceso'" (change)="cambiarColumna(columna.key, $any($event.target).checked)" /> {{ columna.label }}</label> }</section>
            <section class="grid gap-siaf-sm"><h3 class="m-0 text-xs font-medium uppercase">Vigencia</h3>@for (columna of columnasBase.slice(4); track columna.key) { <label class="flex items-center gap-siaf-sm"><input class="size-5 accent-brand-primary" type="checkbox" [checked]="estaMarcada(columna.key)" (change)="cambiarColumna(columna.key, $any($event.target).checked)" /> {{ columna.label }}</label> }</section>
          </div></div>
          <footer class="flex justify-end gap-siaf-sm border-t border-[var(--sys-color-divider-default)] px-siaf-md py-siaf-sm"><siaf-button variant="secondary" (click)="cancelarConfiguracion()">Cancelar</siaf-button><siaf-button [disabled]="!hayColumnasSeleccionadas()" (click)="aplicarConfiguracion()">Aceptar</siaf-button></footer>
        </aside>
      </section>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelacionPerfilReportesComponent {
  readonly resultado = signal<QueryReportResult | null>(null);
  readonly criterios = signal<QueryReportParameters | null>(null);
  readonly busquedaAbierta = signal(false);
  readonly busquedaTabla = signal('');
  readonly filtroEstado = signal('');
  readonly menuTablaAbierto = signal(false);
  readonly configuracionAbierta = signal(false);
  readonly columnasActivas = signal<string[]>(['proceso', 'rol', 'perfil', 'ambito', 'estado', 'desde', 'hasta']);
  readonly borradorColumnas = signal<string[]>([]);
  readonly opcionesEstado = [{ label: 'Sí', value: 'Sí' }, { label: 'No', value: 'No' }];
  readonly opcionesExportacion = [{ label: 'CSV', value: 'csv', icon: 'table_chart' }, { label: 'Excel', value: 'excel', icon: 'table_view' }, { label: 'PDF', value: 'pdf', icon: 'picture_as_pdf' }];

  readonly columnasBase = [
    { key: 'proceso', label: 'Proceso/Procedimiento', width: 300 },
    { key: 'rol', label: 'Rol', width: 160 },
    { key: 'perfil', label: 'Perfil', width: 300 },
    { key: 'ambito', label: 'Ámbito de categoría presupuestaria', width: 210 },
    { key: 'estado', label: 'Estado', group: 'Vigencia', width: 100 },
    { key: 'desde', label: 'Fecha desde', group: 'Vigencia', width: 150 },
    { key: 'hasta', label: 'Fecha hasta', group: 'Vigencia', width: 150 },
  ];

  readonly configuracion = computed<QueryReportConfig>(() => ({
    title: 'Catálogo de relación perfil por ámbito de categoría presupuestaria',
    breadcrumbs: [
      { label: 'Catálogos', href: '/panel' },
      { label: 'Catálogo de relación perfil por ámbito de categoría presupuestaria', href: '/procesos/catalogos/relacion-perfil-ambito-categoria-presupuestaria' },
      { label: 'Consultas y reportes' },
    ],
    searchActionLabel: 'Búsqueda',
    parameterPanelTitle: 'Búsqueda',
    showFavorites: false,
    parameterFields: [
      { key: 'proceso', label: 'Proceso/Procedimiento', type: 'select', required: true, icon: 'account_tree', options: [{ label: 'Todos', value: 'todos' }, { label: '12 Catálogo de Actividades', value: '12' }, { label: '15 Catálogo de Estructura Funcional Programática - EFP', value: '15' }] },
      { key: 'rol', label: 'Rol', type: 'select', icon: 'badge', options: [{ label: '1 Creador', value: '1 Creador' }, { label: '2 Evaluador', value: '2 Evaluador' }, { label: '3 Aprobador', value: '3 Aprobador' }] },
      { key: 'perfil', label: 'Perfil', type: 'select', icon: 'person', options: [{ label: 'EFP PP', value: 'EFP PP' }, { label: 'EFP APNOP y AC', value: 'EFP APNOP y AC' }] },
      { key: 'ambito', label: 'Ámbito de categoría presupuestaria', type: 'select', icon: 'category', options: [{ label: '1 PP', value: '1 PP' }, { label: '6 APNOP, AC', value: '6 APNOP, AC' }] },
      { key: 'estado', label: 'Estado de vigencia', type: 'select', icon: 'toggle_on', options: [{ label: 'Sí', value: 'Sí' }, { label: 'No', value: 'No' }] },
      { key: 'desde', label: 'Fecha de vigencia desde', type: 'date', icon: 'calendar_today' },
      { key: 'hasta', label: 'Fecha de vigencia hasta', type: 'date', icon: 'event' },
    ],
    columns: this.columnasBase.filter((columna) => this.columnasActivas().includes(columna.key)),
    rowKey: 'id',
    resultTitle: 'Resultado de la búsqueda',
    tableLabel: 'Relación perfil por ámbito de categoría presupuestaria',
    presetFilters: [{ key: 'estado', label: 'Estado de registro', options: [{ label: 'Sí', value: 'Sí' }, { label: 'No', value: 'No' }] }],
    emptyTitle: 'Aún no se encontraron resultados',
    emptyDescription: 'Ingrese los criterios de búsqueda para visualizar la información disponible.',
  }));

  readonly filtrosAplicados = computed(() => {
    const proceso = String(this.criterios()?.['proceso'] ?? '');
    return proceso ? [{ label: 'Proceso/Procedimiento', values: [proceso === '15' ? '15 Catálogo de Estructura Funcional Programática' : proceso] }] : [];
  });

  readonly filasVisibles = computed(() => {
    const termino = this.busquedaTabla().toLowerCase().trim();
    const estado = this.filtroEstado();
    return (this.resultado()?.rows ?? []).filter((fila) =>
      (!estado || fila['estado'] === estado) && (!termino || Object.values(fila).some((valor) => valor.toLowerCase().includes(termino)))
    );
  });

  consultar(parametros: QueryReportParameters): void {
    const proceso = String(parametros['proceso'] ?? '');
    const rol = String(parametros['rol'] ?? '');
    const estado = String(parametros['estado'] ?? '');
    const filas = FILAS.filter((fila) =>
      (!proceso || proceso === 'todos' || fila['proceso'].startsWith(proceso)) && (!rol || fila['rol'] === rol) && (!estado || fila['estado'] === estado),
    );
    this.criterios.set(parametros);
    this.resultado.set({ rows: filas });
    this.busquedaAbierta.set(false);
  }

  limpiarConsulta(): void {
    this.resultado.set(null);
    this.criterios.set(null);
    this.busquedaTabla.set('');
    this.filtroEstado.set('');
  }

  alternarMenuTabla(): void { this.menuTablaAbierto.update((abierto) => !abierto); }

  exportarFormato(formato: string): void {
    void this.exportar({ format: formato as QueryReportExportEvent['format'], parameters: this.criterios() ?? {}, rows: this.filasVisibles() });
  }

  async exportar(evento: QueryReportExportEvent): Promise<void> {
    const nombre = `relacion-perfil-ambito-${new Date().toISOString().slice(0, 10)}`;
    const mime = evento.format === 'csv' ? 'text/csv;charset=utf-8' : evento.format === 'excel' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'application/pdf';
    const extension = evento.format === 'excel' ? 'xlsx' : evento.format;
    const picker = (window as any).showSaveFilePicker as undefined | ((options: any) => Promise<any>);
    let handle: any;
    try {
      handle = picker ? await picker({ suggestedName: `${nombre}.${extension}`, types: [{ description: evento.format.toUpperCase(), accept: { [mime]: [`.${extension}`] } }] }) : null;
    } catch {
      return; // El usuario canceló el selector de carpeta.
    }
    const encabezados = this.configuracion().columns.map((columna) => columna.label);
    const valores = evento.rows.map((fila) => this.configuracion().columns.map((columna) => fila[columna.key] ?? ''));
    const escapar = (valor: string) => /[",\n;]/.test(valor) ? `"${valor.replace(/"/g, '""')}"` : valor;
    let archivo: Blob;
    if (evento.format === 'csv') archivo = new Blob(['﻿' + [encabezados, ...valores].map((fila) => fila.map(escapar).join(',')).join('\n')], { type: mime });
    else if (evento.format === 'excel') { const { Workbook } = await import('exceljs'); const libro = new Workbook(); const hoja = libro.addWorksheet('Relaciones'); hoja.addRow(encabezados); valores.forEach((fila) => hoja.addRow(fila)); archivo = new Blob([await libro.xlsx.writeBuffer()], { type: mime }); }
    else { const [{ default: jsPDF }, { default: autoTable }] = await Promise.all([import('jspdf'), import('jspdf-autotable')]); const pdf = new jsPDF({ orientation: 'landscape' }); pdf.text('Relación perfil por ámbito de categoría presupuestaria', 14, 16); autoTable(pdf, { head: [encabezados], body: valores, startY: 22 }); archivo = pdf.output('blob'); }
    if (handle) { const writer = await handle.createWritable(); await writer.write(archivo); await writer.close(); return; }
    const url = URL.createObjectURL(archivo); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `${nombre}.${extension}`; anchor.click(); URL.revokeObjectURL(url);
  }

  abrirConfiguracion(): void { this.borradorColumnas.set([...this.columnasActivas()]); this.configuracionAbierta.set(true); }
  cancelarConfiguracion(): void { this.configuracionAbierta.set(false); }
  aplicarConfiguracion(): void { this.columnasActivas.set(this.borradorColumnas()); this.configuracionAbierta.set(false); }
  estaMarcada(key: string): boolean { return this.borradorColumnas().includes(key); }
  todasMarcadas(): boolean { return this.borradorColumnas().length === this.columnasBase.length; }
  hayColumnasSeleccionadas(): boolean { return this.borradorColumnas().length > 0; }
  cambiarColumna(key: string, marcada: boolean): void { if (key === 'proceso') return; this.borradorColumnas.update((actual) => marcada ? [...new Set([...actual, key])] : actual.filter((valor) => valor !== key)); }
  alternarTodas(marcada: boolean): void { this.borradorColumnas.set(marcada ? this.columnasBase.map((columna) => columna.key) : ['proceso']); }
}
