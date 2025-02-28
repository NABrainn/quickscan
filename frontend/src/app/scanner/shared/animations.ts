import { animate, animation, style, transition, trigger } from "@angular/animations";

    export const popInAnimation = animation([
        style({ opacity: '{{ zero }}' }),
        animate('{{ time }}', style({ opacity: '{{ one }}' }))
    ]);
  
    export const popOutAnimation = animation([
        animate('{{ time }}', style({ opacity: '{{ zero }}' }))
    ]);