
 
/*Este arquivo define um componente Angular chamado ClientesPage que 
busca e exibe uma lista de clientes */

/*Importa as classes Component e OnInit do Angular Core. Component
é um decorador usado para definir um componente Angular, e OnInit
é um ciclo de vida do componente que é executado quando o componente
é inicializado.*/
import { Component, OnInit } from '@angular/core';

/*Importa o módulo IonicModule do Ionic Framework. Este módulo
fornece os componentes, diretivas e serviços necessários para
construir interfaces de usuário com o ionic. */
import { IonicModule } from '@ionic/angular';

/*Importa a interface Clientes e o serviço ClientesService de um
arquivo chamado clientes.serivce.ts localizado na pasta src/app/servico */
import { Clientes, ClientesService } from 'src/app/servico/clientes.service';

import { CommonModule } from '@angular/common'; 

/*@Component: Este decorador define o componente Angular. Ele recebe um objeto de metadados com as segunites propriedades:

selector: 'app-clientes': Define o seletor do componente. Este seletor
será usado para exibir componentes no html.

templateUrl: './clientes.page.html': Define o caminho para o arquivo 
HTML do componente.

styleUrls: ['./clientes.page.scss']: Define o caminho oara o arquivo
CSS do componente.

standalone: true: Indica que este é um componente standalone. Componentes
standalone não precisam ser declarados no template do componente.

imports: [IonicModule]: Importa o módulo IonicModule para que os componentes do Ionic possam ser usados no template do componente.
*/
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})

/*export class ClientesPage implements OnInit {}: Define a classe
do componente. Ela implementa a interface OnInit, o que significa 
que ela terá um método ngOnInit que será executado quando o componente
for inicializado. */
export class ClientesPage implements OnInit {

/*Declara uma propriedade chamada clientes que é um array de objetos
do tipo Clientes. Esta propriedade será usada para armazenar a lista
de clientes que será exibida na página. */
clientes: Clientes[] = [];

  /*Define o construtor da classe. Ele recebe o serviço ClienteService
  como um parâmetro e o atribui a uma propriedade privada chamada services. */
  constructor(private services: ClientesService) { }

  /*Este método é executado quando o componente é inicializado. */
  ngOnInit() {

    /*Chama o método getAll do serviço ClientesService. Este método
    provavelmente faz uma requisição HTTP para buscar a lista de 
    clientes. O metodo subscribe é usado para se inscrever na resposta
    da requisição. */
    this.services.getAll().subscribe((response: Clientes[]) => {

        /*Registra a resposta da requisição no console do navegador */
        console.log(response);

        /*Atribui a resposta da requisição á propriedade clientes. Isso atualizara a lista de clientes que será exibida na página. */
        this.clientes = response;
    })
    
    
  }

}
