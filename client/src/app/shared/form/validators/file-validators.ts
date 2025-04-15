import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function fileTypeValidator(allowedTypes: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const file = control.value;

        if (!file) {
            return null;
        }

        if (file instanceof File) {
            const fileType = file.type;
            if (!allowedTypes.includes(fileType)) {
                return { 
                    invalidFileType: 'Dozwolone typy plików: ' + allowedTypes.join(', ')
                };
            }
        }

        return null;
    };
}

export function fileSizeValidator(sizeMB: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const file = control.value;

        if (!file) {
            return null;
        }

        if (file instanceof File) {
            const fileSize = file.size / (1024 * 1024);
            if (fileSize > sizeMB) {
                return { 
                    fileTooLarge: 'Maksymalny rozmiar pliku to ' + sizeMB + ' MB'
                };
            }
        }

        return null; 
    };
}