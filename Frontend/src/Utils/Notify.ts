import { errorExtractor } from 'error-extractor';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

class Notify {
    public success(message: string) {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: message,
            timer: 2500,
            showConfirmButton: false,
            position: 'center',
        });
    }

    public error(err: any) {
        const msg = errorExtractor.getMessage(err);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: msg,
            timer: 2500,
            showConfirmButton: false,
            position: 'center',
        });
    }

    // For irreversible actions like deleting an expense, need to add functionality for ❌/✅ buttons
    public confirm(message: string): Promise<boolean> {
        return Swal.fire({
            icon: 'warning',
            text: message,
            showConfirmButton: true,
            showCancelButton: true,  // Add cancel button
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            position: 'center'
        }).then((result) => {
            return result.isConfirmed;  // Returns true if confirmed, false if canceled
        });
    }
}

export const notify = new Notify();
