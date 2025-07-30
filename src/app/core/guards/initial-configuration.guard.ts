import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Paths } from '../constants/paths';
import { InitialConfigurationService } from '../../services/initial-configuration.service';

export const mainGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const initialConfigService = inject(InitialConfigurationService);

  if (!initialConfigService.isDone) {
    router.navigate([Paths.INIT_CONFIG, Paths.POCKETS]);
    return false;
  } else {
    return true;
  }
};