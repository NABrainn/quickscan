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
                return { invalidFileType: { allowedTypes, actualType: fileType } };
            }
        }

        return null; 
    };
}