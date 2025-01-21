import { Pipe, PipeTransform } from "@angular/core";
import { InvoiceEntry } from "../../../dto/InvoiceEntry";

@Pipe({
    name: 'separator',
    standalone: true
})
export class SeparatorPipe implements PipeTransform {
    transform(text: any, ...args: any[]) {
        return text.toString().replaceAll(',', ': ')
    }
    
}