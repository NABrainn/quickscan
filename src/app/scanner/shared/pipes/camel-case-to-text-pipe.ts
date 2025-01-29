import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'camelCaseText',
    standalone: true
})
export class CamelCaseToTextPipe implements PipeTransform {
    transform(value: string | undefined, ...args: any[]) { 
        return value?.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()); 
    }
    
}