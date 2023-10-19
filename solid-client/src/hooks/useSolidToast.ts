import toast, { ToastOptions } from 'solid-toast';
import { BACKGROUND_COLORS, FOREGROUND_COLORS } from '../configs';

export function useSolidToast(duration?: number) {
  const config: ToastOptions = {
    position: 'top-center',
    duration: duration || 3000,
    unmountDelay: 500,
    style: {
      color: FOREGROUND_COLORS['fnt-light'],
      'background-color': BACKGROUND_COLORS['bnt-dark'],
    },
  };

  const onSuccess = (message: string) => toast.success(message, config);
  const onError = (message: string) => toast.error(message, config);
  const onLoading = (message: string) => toast.loading(message, config);

  return { onSuccess, onError, onLoading };
}
