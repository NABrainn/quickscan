import { Injectable, signal, WritableSignal } from '@angular/core';

export type FieldControl = {
  status: WritableSignal<boolean>,  // Each field has its own status
  callbacks?: StrategyCollection;
}

export type FieldValidator = {
  string?: FieldControl,
  number?: FieldControl,
}

interface StrategyCollection {
  isRegex?: (value: string, regex?: RegExp) => void;
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

    fv: FieldValidator = {
      string: {
        status: signal<boolean>(false),  // ✅ Unique signal for string
        callbacks: {}
      },
      number: {
        status: signal<boolean>(false),  // ✅ Unique signal for number
        callbacks: {
          isRegex: (value: string, regex?: RegExp) => {
            console.log('im being called');
            this.fv.number?.status?.set(regex ? regex?.test(value) : false);
          },
        }
      }
    };

    
}
