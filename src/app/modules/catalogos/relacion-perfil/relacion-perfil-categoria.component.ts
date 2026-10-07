import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { DateTimePickerComponent } from '../../../shared/ui/date-time-picker/date-time-picker.component';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { RadioComponent } from '../../../shared/ui/radio/radio.component';
import { SelectionColumn, SelectionSideNavComponent } from '../../../shared/components/selection-side-nav/selection-side-nav.component';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { SnackbarComponent } from '../../../shared/ui/snackbar/snackbar.component';
import { TextAreaControlComponent } from '../../../shared/ui/text-area-control/text-area-control.component';
import { TextFieldComponent } from '../../../shared/ui/text-field/text-field.component';

/** Punto inicial del catálogo; las siguientes pantallas se sumarán desde este estado vacío. */
@Component({
  selector: 'siaf-relacion-perfil-categoria',
  standalone: true,
  imports: [ButtonComponent, DateTimePickerComponent, IconComponent, ModalComponent, RadioComponent, SelectionSideNavComponent, SnackbarComponent, TextAreaControlComponent, TextFieldComponent],
  template: `
    <div class="min-h-[calc(100vh-56px)] bg-[var(--sys-color-bg-surfaces-surface-lowest)] text-text">
      <nav class="flex items-center gap-siaf-xxs bg-surface px-siaf-md py-siaf-xxs" aria-label="Ruta de navegación">
        <span class="inline-flex size-8 items-center justify-center"><siaf-icon name="home" [size]="20" /></span>
        <span aria-hidden="true">›</span>
        <span class="text-xs font-medium text-[var(--sys-color-text-neutral-medium)]">Catálogo de relación perfil por ámbito de categoría presupuestaria</span>
        <span aria-hidden="true">›</span>
        <span class="text-xs font-normal text-[var(--sys-color-text-neutral-low)]">Registro</span>
      </nav>

      @if (detalleRegistro(); as registro) {
        <header class="flex min-h-[73px] items-center gap-siaf-md border-b border-[var(--sys-color-divider-default)] bg-surface px-siaf-lg py-siaf-md">
          <button class="inline-flex size-8 items-center justify-center rounded-siaf-sm text-[var(--sys-color-text-neutral-medium)] hover:bg-[var(--sys-color-bg-states-light-hover)]" type="button" aria-label="Volver al listado" (click)="volverAlListado()">
            <siaf-icon name="arrow_back" [size]="20" />
          </button>
          <h1 class="m-0 max-w-[580px] text-base font-bold uppercase leading-5 tracking-[0.02px] text-[var(--sys-color-text-neutral-high)]">Detalle de relación perfil por ámbito de categoría presupuestaria</h1>
        </header>

        <main class="p-siaf-md">
          <section class="rounded-siaf-md bg-surface p-siaf-md" aria-label="Detalle del registro">
            <div class="grid gap-siaf-lg">
              <div class="grid gap-siaf-xs">
                <h2 class="m-0 text-xs font-bold text-[var(--sys-color-text-neutral-high)]">Proceso/Procedimiento</h2>
                <div class="relative flex min-h-[52px] items-center rounded-siaf-md border border-[var(--sys-color-border-states-enabled)] bg-surface pl-siaf-md">
                  <span class="absolute inset-y-siaf-sm left-0 w-0.5 rounded-r bg-[var(--sys-color-border-states-active)]"></span>
                  <div class="grid w-[200px] gap-0.5"><span class="text-[10px] font-medium uppercase tracking-[0.06em] text-[var(--sys-color-text-neutral-low)]">Código</span><strong class="text-xs">{{ registro.codigo }}</strong></div>
                  <div class="grid min-w-0 flex-1 gap-0.5"><span class="text-[10px] font-medium uppercase tracking-[0.06em] text-[var(--sys-color-text-neutral-low)]">Nombre</span><strong class="text-xs">{{ registro.proceso }}</strong></div>
                </div>
              </div>

              <div class="grid gap-siaf-xs">
                <h2 class="m-0 text-xs font-bold text-[var(--sys-color-text-neutral-high)]">Rol y Perfil</h2>
                <div class="relative flex min-h-[52px] items-center rounded-siaf-md border border-[var(--sys-color-border-states-enabled)] bg-surface pl-siaf-md">
                  <span class="absolute inset-y-siaf-sm left-0 w-0.5 rounded-r bg-[var(--sys-color-border-states-active)]"></span>
                  <div class="grid w-[200px] gap-0.5"><span class="text-[10px] font-medium uppercase tracking-[0.06em] text-[var(--sys-color-text-neutral-low)]">Rol</span><strong class="text-xs">{{ registro.rol }}</strong></div>
                  <div class="grid min-w-0 flex-1 gap-0.5"><span class="text-[10px] font-medium uppercase tracking-[0.06em] text-[var(--sys-color-text-neutral-low)]">Perfil</span><strong class="text-xs">{{ registro.perfil }}</strong></div>
                </div>
              </div>

              <div class="grid gap-siaf-xs"><h2 class="m-0 text-xs font-bold text-[var(--sys-color-text-neutral-high)]">Ámbito de categoría presupuestaria</h2><div class="grid gap-0.5 px-siaf-md"><span class="text-[10px] text-[var(--sys-color-text-neutral-low)]">Ámbito</span><span class="text-xs text-[var(--sys-color-text-neutral-medium)]">{{ registro.ambito }}</span></div></div>

              <section class="grid gap-siaf-md" aria-labelledby="vigencia-detalle"><h2 id="vigencia-detalle" class="m-0 text-xs font-bold uppercase text-[var(--sys-color-text-neutral-high)]">Vigencia</h2><div class="grid gap-siaf-md sm:grid-cols-3"><div class="grid gap-0.5 px-siaf-md"><span class="text-[10px] text-[var(--sys-color-text-neutral-low)]">Estado</span><span class="text-xs">{{ registro.estado }}</span></div><div class="grid gap-0.5 px-siaf-md"><span class="text-[10px] text-[var(--sys-color-text-neutral-low)]">Fecha desde</span><span class="text-xs">19/08/2025</span></div><div class="grid gap-0.5 px-siaf-md"><span class="text-[10px] text-[var(--sys-color-text-neutral-low)]">Fecha hasta</span><span class="text-xs">--/--/----</span></div></div></section>
            </div>
          </section>
        </main>
      } @else {
      <header class="flex min-h-[73px] items-start gap-siaf-lg border-b border-[var(--sys-color-divider-default)] bg-surface px-siaf-lg py-siaf-md">
        <div class="flex min-w-0 flex-1 items-start gap-siaf-xs">
          <div class="flex min-w-0 flex-1 flex-col gap-siaf-xxs">
            <h1 class="m-0 max-w-[580px] text-base font-bold uppercase leading-5 tracking-[0.02px] text-[var(--sys-color-text-neutral-high)]">
              Solicitud de relación perfil por ámbito de categoría presupuestaria
            </h1>
            <p class="m-0 text-[11px] font-normal uppercase leading-normal tracking-[0.66px] text-[var(--sys-color-text-neutral-low)]">Creación</p>
          </div>
          @if (!solicitudEliminada() && !solicitudAceptada()) { <span class="mt-siaf-xxs shrink-0 rounded-siaf-sm border border-[var(--sys-color-border-states-enabled)] px-siaf-sm py-siaf-xxs text-xs font-normal leading-normal text-white" [class.bg-[var(--sys-color-bg-brand-primary)]]="solicitudEnEdicion()" [class.bg-[var(--sys-color-bg-brand-accent)]]="!solicitudEnEdicion()">{{ solicitudEnEdicion() ? 'Edición' : 'Nuevo' }}</span> }
        </div>

        <div class="hidden shrink-0 items-center gap-siaf-sm lg:flex">
          @if (solicitudEnEdicion()) {
            <siaf-button variant="secondary" icon="close" (click)="cancelarEdicionSolicitud()">Cancelar</siaf-button>
            <siaf-button variant="secondary" icon="save" [disabled]="!cambiosEdicionPendientes()" (click)="abrirConfirmacionGrabado()">Grabar</siaf-button>
            <siaf-button variant="secondary" icon="task_alt" [disabled]="true">Verificar</siaf-button>
          } @else if (solicitudElaborada() && !solicitudEliminada() && !solicitudAceptada()) {
            <siaf-button variant="secondary" icon="delete" (click)="abrirConfirmacionEliminarSolicitud()">Eliminar</siaf-button>
            <siaf-button variant="secondary" icon="edit" (click)="editarSolicitud()">Editar</siaf-button>
            <siaf-button icon="task_alt" (click)="abrirConfirmacionVerificacion()">Verificar</siaf-button>
          } @else if (!solicitudElaborada()) {
            <siaf-button variant="secondary" icon="close" (click)="cancelarEdicion()">Cancelar</siaf-button>
            <siaf-button variant="secondary" icon="save" [disabled]="!registroGuardado()" (click)="abrirConfirmacionGrabado()">Grabar</siaf-button>
            <siaf-button variant="secondary" icon="task_alt" [disabled]="true">Verificar</siaf-button>
          }
        </div>
      </header>

      <main class="p-siaf-md">
        @if (solicitudElaborada()) {
          <div class="grid gap-siaf-md lg:grid-cols-[minmax(0,1fr)_270px]">
            <section class="grid gap-x-siaf-lg gap-y-siaf-sm rounded-siaf-md bg-surface p-siaf-md sm:grid-cols-[140px_1fr]" aria-label="Datos de la solicitud">
              <span class="text-[11px] font-medium uppercase tracking-[0.06em] text-text-muted">Fecha</span><strong class="text-sm">19/08/2025&nbsp;&nbsp;&nbsp; 08:00:59</strong>
              <span class="text-[11px] font-medium uppercase tracking-[0.06em] text-text-muted">Ente rector</span><strong class="text-sm uppercase">Dirección General de Presupuesto Público</strong>
            </section>
            <section class="grid gap-x-siaf-md gap-y-siaf-xs rounded-siaf-md bg-surface p-siaf-md sm:grid-cols-[92px_1fr]" aria-label="Estado de la solicitud">
              <span class="text-[10px] font-medium uppercase tracking-[0.06em] text-text-muted">N° documento</span><strong class="text-xs">0001</strong>
              <span class="text-[10px] font-medium uppercase tracking-[0.06em] text-text-muted">Estado</span><span class="w-fit rounded-siaf-sm px-siaf-xs py-0.5 text-[10px] text-white" [class.bg-[var(--sys-color-bg-on-surfaces-high)]]="!solicitudEliminada() && !solicitudAceptada()" [class.bg-[var(--sys-color-bg-brand-accent)]]="solicitudEliminada()" [class.bg-[var(--sys-color-bg-feedback-success)]]="solicitudAceptada()">{{ solicitudEliminada() ? 'Eliminado' : solicitudAceptada() ? 'Aceptado' : 'Elaborado' }}</span>
            </section>
          </div>
        } @else {
        <section class="grid gap-x-siaf-lg gap-y-siaf-sm rounded-siaf-md bg-surface p-siaf-md sm:grid-cols-[140px_1fr]" aria-label="Datos de la solicitud">
          <span class="text-[11px] font-medium uppercase tracking-[0.06em] text-text-muted">Fecha</span>
          <strong class="text-sm">19/08/2025&nbsp;&nbsp;&nbsp; 08:00:59</strong>
          <span class="text-[11px] font-medium uppercase tracking-[0.06em] text-text-muted">Ente rector</span>
          <strong class="text-sm uppercase">Dirección General de Presupuesto Público</strong>
        </section>
        }

        @if (!enCreacion()) {
          <section class="mt-siaf-md rounded-siaf-md bg-surface" aria-labelledby="registro-title">
            <div class="flex min-h-14 items-center gap-siaf-md px-siaf-lg py-siaf-md">
              <h2 id="registro-title" class="m-0 flex-1 text-base font-bold uppercase tracking-[0.02px] text-[var(--sys-color-text-neutral-high)]">
                Registro de relación perfil por ámbito de categoría presupuestaria
              </h2>
              @if (!solicitudElaborada()) { <siaf-button ariaLabel="Añadir nuevo registro" [iconOnly]="true" icon="add" (click)="nuevoRegistro()" /> }
            </div>

            @if (!registroGuardado()) {
              <div class="px-siaf-lg pb-siaf-lg">
                <div class="rounded-siaf-md bg-[var(--sys-color-bg-surfaces-surface-low)] p-siaf-md text-sm text-[var(--sys-color-text-neutral-medium)]">
                  Por favor, haga clic en el botón (+) para añadir el registro.
                </div>
              </div>
            } @else {
              <div class="px-siaf-lg pb-siaf-lg">
                <div class="mb-siaf-md flex items-center justify-between">
                  <div class="flex items-center gap-siaf-xs">
                    @if (puedeSeleccionarRegistros()) { <input class="size-4 accent-brand-primary" type="checkbox" aria-label="Seleccionar todos los registros" [checked]="todosSeleccionados()" (change)="alternarTodosRegistros()" /> }
                    @if (registrosSeleccionados().length) {
                      <siaf-button variant="standard" ariaLabel="Editar registros seleccionados" [iconOnly]="true" icon="edit" (click)="editarRegistroSeleccionado()" />
                      <siaf-button variant="standard" ariaLabel="Eliminar registros seleccionados" [iconOnly]="true" icon="delete" (click)="abrirConfirmacionEliminacion()" />
                      <siaf-button variant="standard" ariaLabel="Más acciones" [iconOnly]="true" icon="more_vert" />
                    }
                  </div>
                  <span class="text-xs text-[var(--sys-color-text-neutral-low)]">1-{{ registros().length }} de {{ registros().length }}&nbsp;&nbsp;&nbsp; ‹ &nbsp;&nbsp; ›</span>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full min-w-[830px] border-collapse text-left text-xs">
                    <thead class="bg-[var(--sys-color-bg-surfaces-surface-high)] font-bold uppercase text-[var(--sys-color-text-neutral-high)]">
                      <tr class="h-8 border-b border-[var(--sys-color-divider-default)]">
                        @if (puedeSeleccionarRegistros()) { <th class="w-12" rowspan="2"></th> }
                        <th class="border-r border-[var(--sys-color-divider-default)] px-siaf-md" rowspan="2">Proceso/Procedimiento</th>
                        <th class="border-r border-[var(--sys-color-divider-default)] px-siaf-md" rowspan="2">Rol</th>
                        <th class="border-r border-[var(--sys-color-divider-default)] px-siaf-md" rowspan="2">Perfil</th>
                        <th class="border-r border-[var(--sys-color-divider-default)] px-siaf-md" rowspan="2">Ámbito de categoría presupuestaria</th>
                        <th class="px-siaf-md text-center" colspan="3">Vigencia</th>
                      </tr>
                      <tr class="h-8 border-b border-[var(--sys-color-divider-default)]">
                        <th class="px-siaf-md">Estado</th>
                        <th class="px-siaf-md">Fecha desde</th>
                        <th class="px-siaf-md">Fecha hasta</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (registro of registros(); track $index) {
                        <tr class="cursor-pointer border-b border-[var(--sys-color-divider-default)] text-[var(--sys-color-text-neutral-medium)] hover:bg-[var(--sys-color-bg-states-light-hover)]" (click)="abrirDetalle(registro)">
                          @if (puedeSeleccionarRegistros()) { <td class="px-siaf-md py-siaf-sm" (click)="$event.stopPropagation()"><input class="size-4 accent-brand-primary" type="checkbox" [checked]="registroEstaSeleccionado($index)" [attr.aria-label]="'Seleccionar registro ' + ($index + 1)" (change)="alternarRegistro($index)" /></td> }
                          <td class="px-siaf-md py-siaf-sm">{{ registro.proceso }}</td>
                          <td class="px-siaf-md py-siaf-sm">{{ registro.rol }}</td>
                          <td class="px-siaf-md py-siaf-sm">{{ registro.perfil }}</td>
                          <td class="px-siaf-md py-siaf-sm">{{ registro.ambito }}</td>
                          <td class="px-siaf-md py-siaf-sm">{{ registro.estado }}</td>
                          <td class="px-siaf-md py-siaf-sm">{{ solicitudAceptada() ? '19/08/2026' : '--/--/----' }}</td>
                          <td class="px-siaf-md py-siaf-sm">--/--/----</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
                <div class="mt-siaf-md flex items-center justify-between text-xs text-[var(--sys-color-text-neutral-low)]">
                  <span>Filas por página: <span class="ml-siaf-xs inline-flex h-8 items-center gap-siaf-xs rounded-siaf-md border border-[var(--sys-color-border-states-enabled)] px-siaf-md text-[var(--sys-color-text-neutral-medium)]">25 <siaf-icon name="keyboard_arrow_down" [size]="20" /></span></span>
                  <span>1-{{ registros().length }} de {{ registros().length }}&nbsp;&nbsp;&nbsp; ‹ &nbsp;&nbsp; ›</span>
                </div>
              </div>
            }
          </section>
        } @else {
          <section class="mt-siaf-md rounded-siaf-md bg-surface p-siaf-md" aria-labelledby="registro-creacion-title">
            <div class="mb-siaf-md flex min-h-10 items-center justify-between gap-siaf-md">
              <h2 id="registro-creacion-title" class="m-0 flex-1 text-sm font-bold uppercase text-[var(--sys-color-text-neutral-high)]">Registro de relación perfil por ámbito de categoría presupuestaria</h2>
              <div class="flex items-center gap-siaf-sm">
                <siaf-button variant="secondary" size="sm" (click)="cancelarEdicion()">Cancelar</siaf-button>
                <siaf-button size="sm" [disabled]="!ambito()" (click)="guardarRegistro()">Aceptar</siaf-button>
              </div>
            </div>

            <div class="grid gap-siaf-lg">
              <h3 id="detalle-title" class="m-0 text-xs font-bold uppercase text-[var(--sys-color-text-neutral-high)]">Detalle</h3>
              <div class="grid gap-siaf-xs">
                <label class="text-xs font-bold text-[var(--sys-color-text-neutral-high)]">Proceso/Procedimiento <span class="text-[var(--sys-color-text-feedback-danger)]">*</span></label>
                <div class="flex items-center gap-siaf-xs">
                  @if (procesoSeleccionado()) {
                    <div class="relative flex min-h-[52px] flex-1 items-center rounded-siaf-md border border-[var(--sys-color-border-states-enabled)] bg-surface pl-siaf-md pr-12">
                      <span class="absolute inset-y-siaf-sm left-0 w-0.5 rounded-r bg-[var(--sys-color-border-states-active)]"></span>
                      <div class="grid w-[200px] gap-0.5">
                        <span class="text-[10px] font-medium uppercase tracking-[0.06em] text-[var(--sys-color-text-neutral-low)]">Código</span>
                        <strong class="text-xs text-[var(--sys-color-text-neutral-high)]">{{ procesoCodigo() }}</strong>
                      </div>
                      <div class="grid min-w-0 flex-1 gap-0.5">
                        <span class="text-[10px] font-medium uppercase tracking-[0.06em] text-[var(--sys-color-text-neutral-low)]">Nombre proceso/procedimiento</span>
                        <strong class="text-xs text-[var(--sys-color-text-neutral-high)]">{{ procesoSeleccionado() }}</strong>
                      </div>
                      <button class="absolute right-siaf-sm inline-flex size-8 items-center justify-center rounded-siaf-sm text-[var(--sys-color-text-neutral-medium)] hover:bg-[var(--sys-color-bg-states-light-hover)]" type="button" aria-label="Limpiar proceso seleccionado" (click)="limpiarProceso()">
                        <siaf-icon name="close" [size]="20" />
                      </button>
                    </div>
                  } @else {
                    <div class="min-h-10 flex-1 rounded-siaf-md bg-[var(--sys-color-bg-surfaces-surface-low)] px-siaf-md py-siaf-xs text-sm leading-6 text-[var(--sys-color-text-neutral-medium)]">
                      No se ha seleccionado ninguna opción. Haga clic en el botón para realizar una selección.
                    </div>
                  }
                  <siaf-button ariaLabel="Seleccionar proceso o procedimiento" [iconOnly]="true" icon="search" [disabled]="!!procesoSeleccionado()" (click)="abrirPanelProceso()" />
                </div>
              </div>

              <div class="grid gap-siaf-xs">
                <label class="text-xs font-bold text-[var(--sys-color-text-neutral-high)]">Rol y Perfil <span class="text-[var(--sys-color-text-feedback-danger)]">*</span></label>
                <div class="flex items-center gap-siaf-xs">
                  @if (rolSeleccionado()) {
                    <div class="relative flex min-h-[52px] flex-1 items-center rounded-siaf-md border border-[var(--sys-color-border-states-enabled)] bg-surface pl-siaf-md pr-12">
                      <span class="absolute inset-y-siaf-sm left-0 w-0.5 rounded-r bg-[var(--sys-color-border-states-active)]"></span>
                      <div class="grid w-[200px] gap-0.5">
                        <span class="text-[10px] font-medium uppercase tracking-[0.06em] text-[var(--sys-color-text-neutral-low)]">Rol</span>
                        <strong class="text-xs text-[var(--sys-color-text-neutral-high)]">{{ rolValor() }}</strong>
                      </div>
                      <div class="grid min-w-0 flex-1 gap-0.5">
                        <span class="text-[10px] font-medium uppercase tracking-[0.06em] text-[var(--sys-color-text-neutral-low)]">Perfil</span>
                        <strong class="text-xs text-[var(--sys-color-text-neutral-high)]">{{ perfilValor() }}</strong>
                      </div>
                      <button class="absolute right-siaf-sm inline-flex size-8 items-center justify-center rounded-siaf-sm text-[var(--sys-color-text-neutral-medium)] hover:bg-[var(--sys-color-bg-states-light-hover)]" type="button" aria-label="Limpiar rol y perfil seleccionados" (click)="limpiarRol()">
                        <siaf-icon name="close" [size]="20" />
                      </button>
                    </div>
                  } @else {
                    <div class="min-h-10 flex-1 rounded-siaf-md bg-[var(--sys-color-bg-surfaces-surface-low)] px-siaf-md py-siaf-xs text-sm leading-6 text-[var(--sys-color-text-neutral-medium)]">
                      No se ha seleccionado ninguna opción. Haga clic en el botón para realizar una selección.
                    </div>
                  }
                  <siaf-button ariaLabel="Seleccionar rol y perfil" [iconOnly]="true" icon="search" [disabled]="!procesoSeleccionado() || !!rolSeleccionado()" (click)="abrirPanelRol()" />
                </div>
              </div>

              <div class="grid max-w-[225px] gap-siaf-xs">
                <label class="text-xs font-bold text-[var(--sys-color-text-neutral-high)]">Ámbito de categoría presupuestaria <span class="text-[var(--sys-color-text-feedback-danger)]">*</span></label>
                <siaf-input
                  placeholder="Ámbito"
                  type="select"
                  [disabled]="modoEdicion()"
                  [autoSuccess]="false"
                  [options]="ambitos"
                  [value]="ambito()"
                  (valueChange)="ambito.set($any($event))"
                />
              </div>

              <fieldset class="grid gap-siaf-md border-0 p-0">
                <legend class="text-xs font-bold uppercase text-[var(--sys-color-text-neutral-high)]">Vigencia</legend>
                <div class="grid gap-siaf-lg lg:grid-cols-[280px_minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
                  <siaf-radio-group label="Estado" name="estado-vigencia" [inline]="true" [options]="opcionesVigencia" [value]="vigencia()" (valueChange)="vigencia.set($event)" />
                  <siaf-date-time-picker label="Fecha desde" [defaultToToday]="false" [fullWidth]="true" [value]="fechaDesde()" (valueChange)="fechaDesde.set($event)" />
                  <siaf-date-time-picker label="Fecha hasta" [defaultToToday]="false" [fullWidth]="true" [value]="fechaHasta()" (valueChange)="fechaHasta.set($event)" />
                </div>
                <p class="m-0 text-xs text-[var(--sys-color-text-neutral-medium)] lg:ml-[310px]">Será asignada cuando se acepte el requerimiento de solicitud</p>
              </fieldset>

              <div class="grid gap-siaf-xs">
                <h3 class="m-0 text-xs font-bold uppercase text-[var(--sys-color-text-neutral-high)]">Detalle de creación</h3>
                <text-area-control
                  placeholder="Descripción"
                  [maxlength]="300"
                  [value]="descripcion()"
                  (valueChange)="descripcion.set($event)"
                />
              </div>
            </div>
          </section>
        }
        @if (solicitudElaborada()) {
          <section class="mt-siaf-md grid gap-siaf-md rounded-siaf-md bg-surface p-siaf-md sm:grid-cols-3" aria-label="Trazabilidad de la solicitud">
            <div class="grid gap-0.5"><span class="text-[10px] font-medium uppercase tracking-[0.06em] text-text-muted">Elaborador por</span><strong class="text-xs uppercase">Juan Doe Perez Perez</strong><span class="mt-siaf-xs text-[10px] font-medium uppercase text-text-muted">Fecha</span><strong class="text-xs">19/08/2025 &nbsp; 08:00:59</strong></div>
            <div class="grid gap-0.5"><span class="text-[10px] font-medium uppercase tracking-[0.06em] text-text-muted">Verificado por</span><strong class="text-xs">{{ solicitudAceptada() ? 'JUAN DOE PEREZ PEREZ' : 'No asignado aún' }}</strong><span class="mt-siaf-xs text-[10px] font-medium uppercase text-text-muted">Fecha</span><strong class="text-xs">{{ solicitudAceptada() ? '19/08/2025   08:00:59' : 'Fecha y hora no registradas' }}</strong></div>
            <div class="grid gap-0.5"><span class="text-[10px] font-medium uppercase tracking-[0.06em] text-text-muted">Aceptado por</span><strong class="text-xs">{{ solicitudAceptada() ? 'SISTEMA SIAF-RP' : 'No asignado aún' }}</strong><span class="mt-siaf-xs text-[10px] font-medium uppercase text-text-muted">Fecha</span><strong class="text-xs">{{ solicitudAceptada() ? '19/08/2025   08:00:59' : 'Fecha y hora no registradas' }}</strong></div>
          </section>
        }
      </main>
      }

      <siaf-selection-side-nav
        [open]="panelProcesoAbierto()"
        title="Seleccionar proceso/procedimiento"
        mode="single"
        [customTable]="true"
        [selectedIds]="procesosSeleccionados()"
        [paginated]="true"
        [pageSize]="10"
        [totalItems]="10"
        [totalPages]="1"
        [rowsPerPage]="10"
        [showRowsPerPage]="true"
        [searchValue]="busquedaProceso()"
        (searchChange)="busquedaProceso.set($event)"
        (closed)="cerrarPanelProceso()"
        (accepted)="aceptarProceso()"
      >
        <table class="w-full min-w-[940px] border-collapse text-left text-sm" aria-label="Procedimientos disponibles">
          <thead>
            <tr class="h-10 bg-[var(--sys-color-bg-surfaces-surface-high)] text-xs font-bold uppercase text-[var(--sys-color-text-neutral-high)]">
              <th class="w-12 rounded-l-siaf-sm"></th>
              <th class="w-[24%] px-siaf-md">Procedimiento del nivel 01</th>
              <th class="w-[24%] px-siaf-md">Procedimiento del nivel 02</th>
              <th class="w-[24%] px-siaf-md">Procedimiento del nivel 03</th>
              <th class="w-[24%] rounded-r-siaf-sm px-siaf-md">Procedimiento del nivel 04</th>
            </tr>
          </thead>
          <tbody>
            @for (proceso of procesosVisibles; track proceso.id) {
              <tr
                class="h-12 border-b border-[var(--sys-color-divider-default)] text-[var(--sys-color-text-neutral-medium)] transition hover:bg-[var(--sys-color-bg-states-light-hover)]"
                [class.bg-[var(--sys-color-bg-states-light-selected)]]="estaSeleccionado(proceso.id)"
                (click)="seleccionarProceso(proceso.id, proceso.nivel)"
              >
                <td class="px-siaf-sm" (click)="$event.stopPropagation()">
                  <input
                    class="size-5 accent-brand-primary"
                    type="radio"
                    name="proceso-seleccionado"
                    [checked]="radioMarcado(proceso.id, proceso.nivel)"
                    [attr.aria-label]="'Seleccionar ' + proceso.texto"
                    (change)="seleccionarProceso(proceso.id, proceso.nivel)"
                  />
                </td>
                <td class="px-siaf-md py-siaf-xs" [class.font-medium]="proceso.nivel === 1">
                  @if (proceso.nivel === 1) {
                    <button class="inline-flex items-start gap-siaf-md text-left" type="button" (click)="alternarRama(proceso.id, $event)">
                      <siaf-icon [name]="ramaContraida(proceso.id) ? 'keyboard_arrow_down' : 'keyboard_arrow_up'" [size]="20" />
                      {{ proceso.texto }}
                    </button>
                  }
                </td>
                <td class="px-siaf-md py-siaf-xs">
                  @if (proceso.nivel === 2) { <span class="ml-siaf-md block border-l-2 border-b-2 border-[var(--sys-color-divider-default)] pl-siaf-md leading-5 text-justify">{{ proceso.texto }}</span> }
                </td>
                <td class="px-siaf-md py-siaf-xs">
                  @if (proceso.nivel === 3) { <span class="ml-siaf-md block border-l-2 border-b-2 border-[var(--sys-color-divider-default)] pl-siaf-md leading-5 text-justify">{{ proceso.texto }}</span> }
                </td>
                <td class="px-siaf-md py-siaf-xs">
                  @if (proceso.nivel === 4) { <span class="ml-siaf-md block border-l-2 border-b-2 border-[var(--sys-color-divider-default)] pl-siaf-md leading-5 text-justify">{{ proceso.texto }}</span> }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </siaf-selection-side-nav>

      <siaf-selection-side-nav
        [open]="panelRolAbierto()"
        title="Seleccionar rol y perfil"
        mode="single"
        [rows]="rolesPerfil"
        [columns]="columnasRol"
        [selectedIds]="rolTemporal() ? [rolTemporal()] : []"
        [paginated]="true"
        [pageSize]="25"
        [totalItems]="6"
        [totalPages]="1"
        [rowsPerPage]="25"
        [showRowsPerPage]="true"
        [searchValue]="busquedaRol()"
        (searchChange)="busquedaRol.set($event)"
        (selectionChange)="seleccionarRolTemporal($event)"
        (closed)="cerrarPanelRol()"
        (accepted)="aceptarRol()"
      />

      <siaf-modal
        [open]="confirmacionEliminacionAbierta()"
        variant="delete-record"
        description="Perderá todos los datos del(os) registro(s) ingresado(s)."
        [showIllustration]="true"
        (closed)="confirmacionEliminacionAbierta.set(false)"
        (canceled)="confirmacionEliminacionAbierta.set(false)"
        (confirmed)="confirmarEliminacion()"
      />

      <siaf-modal
        [open]="confirmacionGrabadoAbierta()"
        variant="save"
        [showIllustration]="true"
        (closed)="confirmacionGrabadoAbierta.set(false)"
        (canceled)="confirmacionGrabadoAbierta.set(false)"
        (confirmed)="confirmarGrabadoSolicitud()"
      />

      <siaf-modal
        [open]="confirmacionEliminarSolicitudAbierta()"
        variant="delete-request"
        [showIllustration]="true"
        (closed)="confirmacionEliminarSolicitudAbierta.set(false)"
        (canceled)="confirmacionEliminarSolicitudAbierta.set(false)"
        (confirmed)="confirmarEliminarSolicitud()"
      />

      <siaf-modal
        [open]="confirmacionVerificacionAbierta()"
        variant="verify"
        description="La solicitud será verificada y aceptada automáticamente."
        [showIllustration]="true"
        (closed)="confirmacionVerificacionAbierta.set(false)"
        (canceled)="confirmacionVerificacionAbierta.set(false)"
        (confirmed)="confirmarVerificacion()"
      />

      <div class="fixed bottom-siaf-xl left-1/2 z-[60] -translate-x-1/2">
        <siaf-snackbar [open]="avisoRegistroVisible()" variant="record-done" (closed)="avisoRegistroVisible.set(false)" />
        <siaf-snackbar [open]="avisoEliminacionVisible()" variant="record-deleted" (closed)="avisoEliminacionVisible.set(false)" />
        <siaf-snackbar [open]="avisoSolicitudElaboradaVisible()" variant="creation-elaborated" requestNumber="0001" (closed)="avisoSolicitudElaboradaVisible.set(false)" />
        <siaf-snackbar [open]="avisoCambiosVisible()" variant="changes-saved" (closed)="avisoCambiosVisible.set(false)" />
        <siaf-snackbar [open]="avisoSolicitudEliminadaVisible()" variant="creation-deleted" requestNumber="0001" (closed)="avisoSolicitudEliminadaVisible.set(false)" />
        <siaf-snackbar [open]="avisoSolicitudAceptadaVisible()" variant="creation-approved" requestNumber="0001" (closed)="avisoSolicitudAceptadaVisible.set(false)" />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelacionPerfilCategoriaComponent {
  readonly enCreacion = signal(false);
  readonly ambito = signal('');
  readonly vigencia = signal('si');
  readonly fechaDesde = signal('');
  readonly fechaHasta = signal('');
  readonly descripcion = signal('');
  readonly panelProcesoAbierto = signal(false);
  readonly panelRolAbierto = signal(false);
  readonly procesosSeleccionados = signal<string[]>([]);
  readonly busquedaProceso = signal('');
  readonly busquedaRol = signal('');
  readonly procesoSeleccionado = signal('');
  readonly procesoCodigo = signal('');
  readonly rolTemporal = signal('');
  readonly rolSeleccionado = signal('');
  readonly rolValor = signal('');
  readonly perfilValor = signal('');
  readonly registroGuardado = signal(false);
  readonly avisoRegistroVisible = signal(false);
  readonly avisoEliminacionVisible = signal(false);
  readonly confirmacionEliminacionAbierta = signal(false);
  readonly confirmacionGrabadoAbierta = signal(false);
  readonly solicitudElaborada = signal(false);
  readonly solicitudEnEdicion = signal(false);
  readonly solicitudEliminada = signal(false);
  readonly confirmacionEliminarSolicitudAbierta = signal(false);
  readonly avisoSolicitudEliminadaVisible = signal(false);
  readonly solicitudAceptada = signal(false);
  readonly confirmacionVerificacionAbierta = signal(false);
  readonly avisoSolicitudAceptadaVisible = signal(false);
  readonly avisoSolicitudElaboradaVisible = signal(false);
  readonly avisoCambiosVisible = signal(false);
  readonly cambiosEdicionPendientes = signal(false);
  readonly registros = signal<Array<{ codigo: string; proceso: string; rol: string; perfil: string; ambito: string; estado: string }>>([]);
  readonly detalleRegistro = signal<{ codigo: string; proceso: string; rol: string; perfil: string; ambito: string; estado: string } | null>(null);
  readonly registrosSeleccionados = signal<number[]>([]);
  readonly modoEdicion = signal(false);
  readonly indiceRegistroEnEdicion = signal<number | null>(null);
  readonly ramasContraidas = signal<string[]>([]);

  readonly ambitos = [
    { label: '1 PP', value: '1 PP' },
    { label: '2 APNOP', value: '2 APNOP' },
    { label: '3 AC', value: '3 AC' },
    { label: '4 PP y APNOP', value: '4 PP y APNOP' },
    { label: '5 APNOP y AC', value: '5 APNOP y AC' },
    { label: '6 PP y AC', value: '6 PP y AC' },
    { label: '7 PP, APNOP y AC', value: '7 PP, APNOP y AC' },
  ];

  readonly opcionesVigencia = [
    { label: 'Sí', value: 'si' },
    { label: 'No', value: 'no' },
  ];

  readonly procesos = [
    { id: 'catalogos', nivel: 1, texto: 'C01.01 Catálogos' },
    { id: 'actividades', nivel: 2, texto: '12 Catálogo de Actividades' },
    { id: 'efp', nivel: 2, texto: '15 Catálogo de Estructura Funcional Programática - EFP' },
    { id: 'programacion', nivel: 1, texto: 'M02.01 Programación de Recursos Públicos' },
    { id: 'multianual', nivel: 2, texto: 'M02.01.02 Programación Multianual, Formulación y Aprobación Presupuestaria' },
    { id: 'multianual-presupuestaria', nivel: 3, texto: 'M02.01.02.01 Programación Multianual Presupuestaria' },
    { id: 'reportes-apm', nivel: 4, texto: 'M02.01.02.01.01 Programación Multianual Presupuestaria - Gestión de Reportes de la APM' },
  ];

  readonly columnasRol: SelectionColumn[] = [
    { key: 'proceso', label: 'Proceso / Procedimiento', widthClass: 'w-[34%]' },
    { key: 'rol', label: 'Rol', widthClass: 'w-[18%]' },
    { key: 'perfil', label: 'Perfil', widthClass: 'w-[23%]' },
    { key: 'nombreCorto', label: 'Nombre corto de perfil', widthClass: 'w-[25%]' },
  ];

  readonly rolesPerfil = [
    { id: 'creador-efp-pp', proceso: '15 Catálogo de Estructura Funcional Programática - EFP', rol: '1 Creador', perfil: '3 Dirección General de Presupuesto Público - EFP PP', nombreCorto: 'DGPP - EFP PP' },
    { id: 'evaluador-efp-apnop-ac', proceso: '15 Catálogo de Estructura Funcional Programática - EFP', rol: '2 Evaluador', perfil: '4 Dirección General de Presupuesto Público - EFP APNOP y AC', nombreCorto: 'DGPP - EFP APNOP y AC' },
    { id: 'aprobador-efp-pp', proceso: '15 Catálogo de Estructura Funcional Programática - EFP', rol: '2 Aprobador', perfil: '3 Dirección General de Presupuesto Público - EFP PP', nombreCorto: 'DGPP - EFP PP' },
    { id: 'aprobador-anulaciones', proceso: '15 Catálogo de Estructura Funcional Programática - EFP', rol: '2 Aprobador', perfil: '5 Dirección General de Presupuesto Público - Anulaciones', nombreCorto: 'DGPP - A' },
    { id: 'creador-dgpp', proceso: '15 Catálogo de Estructura Funcional Programática - EFP', rol: '1 Creador', perfil: '6 Dirección General de Presupuesto Público', nombreCorto: 'DGPP' },
    { id: 'creador-entidad-pliego', proceso: '15 Catálogo de Estructura Funcional Programática - EFP', rol: '1 Creador', perfil: '7 Entidad Pliego', nombreCorto: 'EP' },
  ];

  get procesosVisibles() {
    const contraidas = this.ramasContraidas();
    let raizActual = '';
    return this.procesos.filter((proceso) => {
      if (proceso.nivel === 1) {
        raizActual = proceso.id;
        return true;
      }
      return !contraidas.includes(raizActual);
    });
  }

  abrirCreacion(): void {
    this.enCreacion.set(true);
  }

  nuevoRegistro(): void {
    this.limpiarProceso();
    this.limpiarRol();
    this.ambito.set('');
    this.vigencia.set('si');
    this.fechaDesde.set('');
    this.fechaHasta.set('');
    this.descripcion.set('');
    this.avisoRegistroVisible.set(false);
    this.modoEdicion.set(false);
    this.indiceRegistroEnEdicion.set(null);
    this.abrirCreacion();
  }

  cancelarEdicion(): void {
    this.enCreacion.set(false);
  }

  guardarRegistro(): void {
    if (!this.ambito()) {
      return;
    }
    const registro = { codigo: this.procesoCodigo(), proceso: this.procesoSeleccionado(), rol: this.rolValor(), perfil: this.perfilValor(), ambito: this.ambito(), estado: this.vigencia() === 'si' ? 'Sí' : 'No' };
    const indice = this.indiceRegistroEnEdicion();
    const esEdicion = indice !== null;
    this.registros.update((registros) => indice === null ? [...registros, registro] : registros.map((item, i) => i === indice ? registro : item));
    this.enCreacion.set(false);
    this.registroGuardado.set(true);
    this.avisoRegistroVisible.set(!esEdicion);
    this.avisoCambiosVisible.set(esEdicion);
    if (esEdicion) this.cambiosEdicionPendientes.set(true);
    this.modoEdicion.set(false);
    this.indiceRegistroEnEdicion.set(null);
    this.registrosSeleccionados.set([]);
  }

  abrirConfirmacionGrabado(): void {
    if (this.registros().length) {
      this.confirmacionGrabadoAbierta.set(true);
    }
  }

  confirmarGrabadoSolicitud(): void {
    this.confirmacionGrabadoAbierta.set(false);
    if (!this.registros().length) return;
    this.solicitudElaborada.set(true);
    this.avisoRegistroVisible.set(false);
    this.avisoSolicitudElaboradaVisible.set(true);
  }

  editarSolicitud(): void {
    this.solicitudEnEdicion.set(true);
    this.registrosSeleccionados.set(this.registros().length ? [0] : []);
  }

  cancelarEdicionSolicitud(): void {
    this.solicitudEnEdicion.set(false);
    this.registrosSeleccionados.set([]);
    this.cambiosEdicionPendientes.set(false);
  }

  abrirConfirmacionEliminarSolicitud(): void {
    this.confirmacionEliminarSolicitudAbierta.set(true);
  }

  confirmarEliminarSolicitud(): void {
    this.confirmacionEliminarSolicitudAbierta.set(false);
    this.solicitudEnEdicion.set(false);
    this.solicitudEliminada.set(true);
    this.avisoSolicitudElaboradaVisible.set(false);
    this.avisoSolicitudEliminadaVisible.set(true);
  }

  abrirConfirmacionVerificacion(): void {
    this.confirmacionVerificacionAbierta.set(true);
  }

  confirmarVerificacion(): void {
    this.confirmacionVerificacionAbierta.set(false);
    this.solicitudAceptada.set(true);
    this.avisoSolicitudElaboradaVisible.set(false);
    this.avisoSolicitudAceptadaVisible.set(true);
  }

  puedeSeleccionarRegistros(): boolean {
    return !this.solicitudElaborada() || this.solicitudEnEdicion();
  }

  registroEstaSeleccionado(indice: number): boolean {
    return this.registrosSeleccionados().includes(indice);
  }

  todosSeleccionados(): boolean {
    return this.registros().length > 0 && this.registrosSeleccionados().length === this.registros().length;
  }

  alternarRegistro(indice: number): void {
    this.registrosSeleccionados.update((seleccionados) => seleccionados.includes(indice) ? seleccionados.filter((item) => item !== indice) : [...seleccionados, indice]);
  }

  alternarTodosRegistros(): void {
    this.registrosSeleccionados.set(this.todosSeleccionados() ? [] : this.registros().map((_, indice) => indice));
  }

  editarRegistroSeleccionado(): void {
    const indice = this.registrosSeleccionados()[0];
    const registro = this.registros()[indice];
    if (!registro) return;
    this.procesoCodigo.set(registro.codigo);
    this.procesoSeleccionado.set(registro.proceso);
    this.rolValor.set(registro.rol);
    this.perfilValor.set(registro.perfil);
    this.rolSeleccionado.set(`${registro.rol} · ${registro.perfil}`);
    this.ambito.set(registro.ambito);
    this.vigencia.set(registro.estado === 'Sí' ? 'si' : 'no');
    this.indiceRegistroEnEdicion.set(indice);
    this.modoEdicion.set(true);
    this.enCreacion.set(true);
  }

  abrirConfirmacionEliminacion(): void {
    if (this.registrosSeleccionados().length) {
      this.confirmacionEliminacionAbierta.set(true);
    }
  }

  confirmarEliminacion(): void {
    const seleccionados = this.registrosSeleccionados();
    this.registros.update((registros) => registros.filter((_, indice) => !seleccionados.includes(indice)));
    this.registrosSeleccionados.set([]);
    this.registroGuardado.set(this.registros().length > 0);
    this.confirmacionEliminacionAbierta.set(false);
    this.avisoRegistroVisible.set(false);
    this.avisoEliminacionVisible.set(true);
  }

  abrirDetalle(registro: { codigo: string; proceso: string; rol: string; perfil: string; ambito: string; estado: string }): void {
    this.detalleRegistro.set(registro);
    this.avisoRegistroVisible.set(false);
  }

  volverAlListado(): void {
    this.detalleRegistro.set(null);
  }

  abrirPanelProceso(): void {
    this.procesosSeleccionados.set([]);
    this.panelProcesoAbierto.set(true);
  }

  cerrarPanelProceso(): void {
    this.panelProcesoAbierto.set(false);
  }

  abrirPanelRol(): void {
    this.rolTemporal.set('');
    this.panelRolAbierto.set(true);
  }

  cerrarPanelRol(): void {
    this.panelRolAbierto.set(false);
  }

  seleccionarRolTemporal(ids: string[]): void {
    this.rolTemporal.set(ids[0] ?? '');
  }

  aceptarRol(): void {
    const rol = this.rolesPerfil.find((item) => item.id === this.rolTemporal());
    this.rolSeleccionado.set(rol ? `${rol.rol} · ${rol.perfil}` : '');
    this.rolValor.set(rol?.rol ?? '');
    this.perfilValor.set(rol?.perfil ?? '');
    this.cerrarPanelRol();
  }

  limpiarRol(): void {
    this.rolSeleccionado.set('');
    this.rolValor.set('');
    this.perfilValor.set('');
    this.rolTemporal.set('');
  }

  seleccionarProceso(id: string, nivel: number): void {
    if (nivel === 1) {
      const indiceInicio = this.procesos.findIndex((proceso) => proceso.id === id);
      const rama = this.procesos.slice(indiceInicio);
      const siguienteRaiz = rama.findIndex((proceso, indice) => indice > 0 && proceso.nivel === 1);
      this.procesosSeleccionados.set(rama.slice(0, siguienteRaiz === -1 ? undefined : siguienteRaiz).map((proceso) => proceso.id));
      return;
    }

    this.procesosSeleccionados.set([id]);
  }

  estaSeleccionado(id: string): boolean {
    return this.procesosSeleccionados().includes(id);
  }

  /** La rama de nivel 1 se selecciona completa, pero solo su nodo raíz muestra el radio marcado. */
  radioMarcado(id: string, nivel: number): boolean {
    const seleccion = this.procesosSeleccionados();
    return nivel === 1 ? seleccion.includes(id) : seleccion.length === 1 && seleccion[0] === id;
  }

  ramaContraida(id: string): boolean {
    return this.ramasContraidas().includes(id);
  }

  alternarRama(id: string, event: Event): void {
    event.stopPropagation();
    this.ramasContraidas.update((ramas) => ramas.includes(id) ? ramas.filter((rama) => rama !== id) : [...ramas, id]);
  }

  aceptarProceso(): void {
    const seleccionado = this.procesos.find((proceso) => this.procesosSeleccionados().includes(proceso.id));
    this.procesoSeleccionado.set(seleccionado?.texto ?? '');
    this.procesoCodigo.set(this.codigoDeProceso(seleccionado?.texto ?? ''));
    this.cerrarPanelProceso();
  }

  limpiarProceso(): void {
    this.procesoSeleccionado.set('');
    this.procesoCodigo.set('');
    this.procesosSeleccionados.set([]);
  }

  private codigoDeProceso(texto: string): string {
    return texto.match(/^\d+/)?.[0] ?? texto.match(/^\w+\d+(?:\.\d+)*/)?.[0] ?? '';
  }
}
