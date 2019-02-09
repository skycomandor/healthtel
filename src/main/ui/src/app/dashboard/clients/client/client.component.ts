import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent implements OnInit {
  private clientID: string;

  constructor(private route: ActivatedRoute, private router: Router, private clientsServ: ClientsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.clientID = params.get('id');
    });
    this.clientsServ.getClient(this.clientID).subscribe(client => {});
  }

  public navigate() {
    this.router.navigateByUrl('/dashboard/clients');
  }

}
