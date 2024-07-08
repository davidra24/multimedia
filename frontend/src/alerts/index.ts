import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Toast = MySwal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast: any) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export const successAlert = (title: string, text: string) => {
  Toast.fire({ title, icon: 'success', text });
};

export const errorAlert = (title: string, text: string = 'Error general') => {
  Toast.fire({ title, icon: 'error', text });
};

export const warningAlert = (title: string, text: string) => {
  Toast.fire({ title, icon: 'warning', text });
};
