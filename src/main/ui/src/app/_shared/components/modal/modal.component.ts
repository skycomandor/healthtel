import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef, HostListener, ElementRef } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  @ViewChild('modalWrapper') modalWrapper: ElementRef
  @ViewChild('modalContent', { read: ViewContainerRef }) modal: ViewContainerRef;

  childComponent: ComponentFactory<any>;
  isOpen: boolean = false;
  modalContext: ComponentRef<any>;

  constructor(
    private modalService: ModalService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.modalService.modalSequence$.subscribe((componentObj: { component: any, context?: any }) => {
      if (componentObj === null) return this.close()
      this.isOpen = true;
      this.childComponent = this.componentFactoryResolver.resolveComponentFactory(componentObj.component);

      this.modalContext = this.modal.createComponent(this.childComponent);
    });
  }

  close(): void {
    this.modalContext.destroy();
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event.target'])
  onclick(targetEl: ElementRef) {
    if (this.modalWrapper && this.modalWrapper.nativeElement.isEqualNode(targetEl) && this.isOpen) this.close()
  }
}

