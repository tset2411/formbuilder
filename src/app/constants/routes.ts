import { RouterModule, Routes } from '@angular/router';

/**
 * Components
 */
import { DashboardComponent } from '../layout/content/dashboard/dashboard.component';
import { PreviewComponent } from '../layout/content/preview/preview.component';

export const DASHBOARD = '';
export const PREVIEW = 'preview';
/**
 * All routs
 */
export const routes: Routes = [
    { path: DASHBOARD, component: DashboardComponent, pathMatch: 'full' },
    { path: PREVIEW, component: PreviewComponent, pathMatch: 'full' }
];