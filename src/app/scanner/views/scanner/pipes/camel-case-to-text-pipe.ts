import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'cCaseConverter',
    standalone: true
})
export class CamelCaseToTextPipe implements PipeTransform {
    transform(value: string | undefined, ...args: any[]) {
        return value?.split('').reduce(
            (curr, next) => next === next.toUpperCase() ? `${curr} ${next}` : curr + next
        )   
    }
    
}