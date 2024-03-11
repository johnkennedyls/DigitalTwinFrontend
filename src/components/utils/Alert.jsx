import Swal from 'sweetalert2';

function ToastAlert (title, severity) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
  Toast.fire({
    icon: severity,
    title
  });
}

export function ErrorAlert (title) {
  ToastAlert(title, 'error');
}

export function SuccessAlert(title) {
    ToastAlert(title, 'success');
}

export function InfoAlert(title) {
    ToastAlert(title, 'info');
}
