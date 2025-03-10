
 
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
import { IonicModule, ModalController } from '@ionic/angular';

/*Importa a interface Clientes e o serviço ClientesService de um
arquivo chamado clientes.serivce.ts localizado na pasta src/app/servico */
import { Clientes, ClientesService } from 'src/app/servico/clientes.service';

/*Importa o módulo CommonModule do pacote @angular/common no Angular.
  O commonModule fornece um conjunto de diretivas, pipes e outros 
  recursos essenciais que são usados em quase todos os aplicativos
  Angular. Aqui estão alguns dos recursos mais usados que ele fornece:

  *ngIf: Adiciona ou remove um elemento DOM com base em uma condição
  
  *ngFor: Itera sobre uma lista e renderiza um modelo para cada item.

  *ngSwitch: Permite alternar entre vários modelos com base em um valor

  DatePipe: Formata datas.

  CurrencyPipe: Formata valores de moeda.

  UpperCasePipe: Transforma texto em maiúsculas.

  LowerCasePipe: Transforma texto em minúsculas.
*/
import { CommonModule } from '@angular/common'; 
import { ModalclientePage } from '../modalcliente/modalcliente.page';

/*@Component: Este decorador define o componente Angular. Ele recebe um objeto de metadados com as segunites propriedades:

selector: 'app-clientes': Define o seletor do componente. Este seletor
será usado para exibir componentes no html.

templateUrl: './clientes.page.html': Define o caminho para o arquivo 
HTML do componente.

styleUrls: ['./clientes.page.scss']: Define o caminho oara o arquivo
CSS do componente.

standalone: true: Indica que este é um componente standalone. Componentes
standalone não precisam ser declarados no template do componente.

imports: [IonicModule]: Importa o módulo IonicModule para que os 
componentes do Ionic possam ser usados no template do componente.

imports: [CommonModule]: Permite que você use diretivas e pipes comuns do Angular, que são essenciais para a lógica do template
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
  constructor(private services: ClientesService, private modalCtrl:ModalController) { }

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

  /*Função que irá remover registros do banco de dados do
  aplicativo  */

  /*A função ira receber um id do tipo any (que aceita qualquer tipo de
  de dado) */
  remover(id: any){
    
    /*Irá chamar o método remove da classe ClienteServices passando
    o id como parâmetro. O método remove faz requisições DELETE ao 
    servidor para excluir clientes. O subscribe é usado para inscrever
    no Observable e executar um código quando a requisição for concluida. O código dentro do subscribe() será executado quando a
    exclusão do cliente for bem-sucedida.*/
    this.services.remove(id).subscribe(()=>{
    
    /*Vamos repetir esse processo com o objetivo de mostrar a lista
    atualizada de clientes */
    this.services.getAll().subscribe(response => {

        this.clientes = response;
    })

    } )
  }
  
  /*Essa função é responsável por criar e exibir um modal (ModalclientePage) e manipular os dados retornados quando
  o modal é descartado */
  novoCliente(){

    /*Irá criar o modal */
    this.modalCtrl.create({

      /*Especifica qual componente Angular será exibido
      dentro do modal. */
      component: ModalclientePage

      /*Esse .then() é executado quando o modal é criado
      com sucesso. */
    }).then( modal => {

      /*Exibe o modal na tela */
      modal.present();
      
      /*Retorna um promise que é resolvida quando o modal é fechado
      (descartado). Essa promise contém os dados que foram passados do modal de volta para o componente pai. */
      return modal.onDidDismiss();

      /*Esse .then() é executado quando o modal é fechado e a promise
      de OnDidDismiss() é resolvida. O data desestrutura o objeto 
      retornado para obter a propriedade data. Essa propriedade 
      contém os dados que foram passados do modal de volta para
      o componente pai. */
    }).then(({data}) =>{

        /*Exibe os dados no console do navegador. Isso permite que o desenvolvedor veja quais dados foram retornados pelo modal. */
        console.log(data);
    });
  }


  /*Função que tem como objetivo atualizar o cadastro de clientes
  no sistema. Ela recebe um objeto c do tipo Clientes como argumento
  que representa o cliente a ser atualizado*/
  atualizar(c:Clientes){

      /*Esta linha cria um modal usando o ModalController
      do Ionic. */
      this.modalCtrl.create({

        /*Especifica a que o modal exibirá o componente
        ModalClientePage. */
        component: ModalclientePage,

        /*Ela passa o objeto c (o cliente a ser atualizado)
        como propriedades para o componente ModalClientePage.
        Isso permite que o modal exiba e edite os dados do
        cliente. */
        componentProps: (c)

        /*Esse .then() é executado quando o modal é criado com sucesso.  */
      }).then(modal => {

        /*Exibe o modal na tela */
        modal.present();

        /*Retorna uma promise que é resolvida quando o modal é fechado.
         Essa promise contém os dados que foram passados do modal de volta para o componente pai.*/
        return modal.onDidDismiss();

        /*Esse then é executado quando o modal é fechado e a promise
        de onDidDismiss é resolvida. O data desestrutura o objeto
        retornado pela promise para obter a propriedade data. Essa
        propriedade data contém os dados que foram passados do modal
        de volta para o componente pai. */
      }).then(({data}) =>{

        /*Esta parte do código é executada após o modal ser fechado. 
        Isso chama o método getAll de um serviço chamado services.
        Este serviço faz uma requisição para buscar
        todos os clientes do banco de dados.
        O subscribe se inscreve na resposta da requisição. Quando
        a resposta é recebida, a função de callback é executada.*/
        this.services.getAll().subscribe(response => {

          /*Esta linha atualiza a propriedade this.cliente do componente
          com os dados recebidos do banco de dados. Isso garante que 
          a lista de clientes exibida na tela seja atualizada após a 
          atualização de um cliente no modal. */
          this.clientes = response;
        })

      })


  }

}
