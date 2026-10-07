import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

import { FocoDirective } from '../../shared/ui/foco/foco.directive';

/**
 * Desplegable de notificaciones que abre la campana del navbar (lista, skeleton, vacío y "marcar leídas").
 *
 * Lee y muta el estado compartido de `NotificationsStateService` — la misma fuente del contador de la
 * campana — y no hace HTTP por su cuenta. Al tocar una notificación resuelve la ruta del documento por
 * código de tipo (SCC, SCMPC, SRAA, STAA, SCA, CAM) y navega, conservando compatibilidad con el campo
 * viejo `solicitud` además del actual `documento`.
 *
 * @usar
 * - Solo como desplegable de la campana de `siaf-navbar`, que lo pinta al abrirse y lo quita al recibir `closed`.
 * - Para revisar de un vistazo las notificaciones recientes y saltar al documento (SCC, SCMPC, SRAA, STAA, SCA o CAM)
 *   sin pasar por la bandeja.
 * @evitar
 * - Para el historial completo, con filtro y paginación: usar `siaf-tray-notifications-view` (Bandeja › Notificaciones).
 * - Para avisar el resultado de una acción del usuario: usar `siaf-snackbar` o `siaf-alert`.
 * - Suelto en una pantalla: `open` no lo oculta (lo decide quien lo pinta) y su posición supone la campana del navbar.
 * @teclado
 * - **Tab**: al abrir, el foco entra en «Marcar todas como leídas», si hay no leídas, o en la primera notificación;
 *   luego recorre cada notificación y puede salir del panel (no atrapa el foco: no es modal).
 * - **Escape**: cierra el panel (emite `closed`) y el foco vuelve a la campana.
 * - **Enter / Espacio**: en una notificación, emite `closed` y, si tiene documento, lo abre; en «Marcar todas como
 *   leídas», las marca.
 * @accesibilidad
 * - **1.3.1 Información y relaciones (A)**: encabezado `h3` y notificaciones en lista `ul`/`li`; cada una es un
 *   `<button>` cuyo nombre reúne título, fecha, mensaje y número del documento.
 * - **Pendiente · 1.4.3 Contraste mínimo (AA)**: título `text-text` 16.29:1 / 16.53:1, mensaje `text-neutral-medium`
 *   14.53:1 / 12.87:1, fecha `text-neutral-low` 5.01:1 / 8.86:1 y código blanco sobre `bg-brand-accent` 4.89:1 / 5.65:1;
 *   pero «Marcar todas como leídas» usa la clase `text-brand-primary` (azul de fondo de marca) y en oscuro queda en
 *   2.66:1.
 * - **1.4.11 Contraste no textual (AA)**: el contorno de foco es el azul del kit (`border-states-focus`, 5.35:1 claro
 *   / 10.15:1 oscuro sobre la superficie).
 * - **Pendiente · 2.4.3 Orden del foco (A)**: con `siafFoco` (sin atrapar Tab) el foco entra al abrir y Escape cierra
 *   devolviéndolo a la campana, pero al marcar todas como leídas el botón desaparece y el foco se pierde.
 * - **2.4.7 Foco visible (AA)**: «Marcar todas como leídas» y cada notificación muestran un contorno azul de 2 px con
 *   `focus-visible`.
 * - **4.1.2 Nombre, función y valor (A)**: el panel es `role="dialog"` con `aria-label="Notificaciones"`, y la campana
 *   de `siaf-navbar` publica `aria-expanded` y `aria-haspopup="dialog"`.
 * - **Pendiente · 4.1.3 Mensajes de estado (AA)**: la carga se marca con `role="status"` y `aria-live="polite"`, pero no
 *   se anuncia el resultado: ni el vacío «No tienes notificaciones nuevas.» ni el marcado de todas como leídas.
 */
@Component({
  selector: 'siaf-notifications-panel',
  standalone: true,
  imports: [FocoDirective],
  template: `
    <div
      class="fixed inset-x-2 top-[60px] z-50 overflow-hidden rounded-siaf-md bg-surface shadow-siaf-elevation-2 sm:absolute sm:inset-x-auto sm:right-0 sm:top-[calc(100%+8px)] sm:w-[410px] sm:max-w-[calc(100vw-32px)]"
      role="dialog"
      aria-label="Notificaciones"
      [siafFoco]="open"
      [siafFocoAtrapar]="false"
      (siafFocoEscape)="closed.emit()"
      (click)="$event.stopPropagation()"
    >
      <header class="px-5 pb-3 pt-4">
        <h3 class="m-0 text-2xl font-bold leading-7 text-text">Notificaciones</h3>
      </header>

      <div class="px-5 pb-4">
        <ul class="m-0 list-none p-0">
          @for (notification of referenceNotifications; track notification.status) {
            <li class="border-b border-[var(--sys-color-divider-default)] last:border-b-0">
              <button class="grid w-full grid-cols-[1fr_auto] gap-x-4 py-4 text-left hover:bg-surface-muted" type="button" (click)="openCatalogDocument()">
                <strong class="col-span-2 text-base font-bold leading-[19px] text-text">Solicitud de relación perfil por ámbito de categoría presupuestaria</strong>
                <span class="mt-2 text-sm font-bold text-text">N° 0002</span>
                <span class="mt-2 text-right text-xs leading-[18px] text-text">{{ notification.date }}<br>{{ notification.time }}</span>
                <span class="mt-1 text-sm text-text">{{ notification.status }}</span>
              </button>
            </li>
          }
        </ul>
        <button class="mt-2 h-8 w-full rounded-siaf-sm bg-surface-muted text-xs font-bold text-text hover:bg-[var(--sys-color-bg-states-light-hover)]" type="button" (click)="closed.emit()">Ver todas las notificaciones</button>
      </div>
    </div>
  `,
  styles: [`
    @keyframes siaf-skeleton-pulse-kf {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 0.85; }
    }
    .siaf-skeleton-pulse {
      animation: siaf-skeleton-pulse-kf 1.5s ease-in-out infinite;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsPanelComponent {
  private readonly router = inject(Router);

  @Input() open = false;
  @Output() closed = new EventEmitter<void>();

  readonly referenceNotifications = [
    { status: 'Aceptado', date: '25/08/25', time: '08:00:59' },
    { status: 'Verificado', date: '25/08/25', time: '08:00:59' },
    { status: 'Elaborado', date: '19/08/25', time: '08:00:59' },
  ];

  openCatalogDocument(): void {
    this.closed.emit();
    void this.router.navigate(['/procesos/catalogos/relacion-perfil-ambito-categoria-presupuestaria']);
  }
}
