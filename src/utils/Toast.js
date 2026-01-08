import Swal from 'sweetalert2'

const ToastMixin = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export const notifySuccess = (message) => {
    ToastMixin.fire({
        icon: 'success',
        title: message
    })
}

export const notifyError = (title, text = '') => {
    ToastMixin.fire({
        icon: 'error',
        title: title,
        text: text
    })
}

export const confirmAction = (message) => {
    return Swal.fire({
        title: 'Are you sure?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, do it!'
    })
}
