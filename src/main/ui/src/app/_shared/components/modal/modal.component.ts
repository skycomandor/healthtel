import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit, ViewChild,
  ViewContainerRef,
  ElementRef
} from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  @ViewChild('modalContent', { read: ViewContainerRef })
  public modal: ViewContainerRef;

  public childComponent: ComponentFactory<any>;
  public isOpen: boolean = false;
  public modalContext: ComponentRef<any>;

  public constructor(
      private _modalService: ModalService,
      private _componentFactoryResolver: ComponentFactoryResolver
  ) { }

  public ngOnInit(): void {
      this._modalService.modalSequence$
          .subscribe((componentObj: { component: any, context?: any }) => {
              if (componentObj === null) {
                  this.close();
                  return;
              }
              this.isOpen = true;
              this.childComponent = this._componentFactoryResolver
                  .resolveComponentFactory(componentObj.component);

              this.modalContext = this.modal.createComponent(this.childComponent);

              if (componentObj.context) {
                  Object.keys(componentObj.context)
                      .forEach((key: string) =>
                          this.modalContext.instance[key] = componentObj.context[key]);
              }
          });

  }

  public close(): void {
    this.modalContext.destroy();
    this.isOpen = false;
  }
}

