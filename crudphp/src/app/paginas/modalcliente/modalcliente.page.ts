


/*, este código define um componente Angular que representa um modal para cadastrar clientes. O componente usa o FormsModule para criar um formulário e o ModalController para gerenciar o modal. */


/*Importa as classes Component e OnInit do Angular core. Component
é usado para definir um componente Angular e OnInit é um ciclo de
vida do componente que é executado após a inicialização do componente.*/
import { Component, Input, OnInit } from '@angular/core';

/*Importa o módulo IonicModule e a classe ModalController do Ionic
Angular. IonicModule fornece os componentes e diretivas do Ionic
para construir a interface do usuário, e ModalController é usado
para criar e gerenciar modais. */
import { IonicModule, ModalController } from '@ionic/angular';


/*Importa o módulo FormsModule e a classe NgForm do Angular forms.
FormsModule fornece as diretivas e serviços necessários para 
trabalhar com formulários no Angular, e NgForm representa um 
formulário no template. */
import { FormsModule, NgForm} from '@angular/forms';
import { Clientes, ClientesService } from 'src/app/servico/clientes.service';



@Component({

  /*Define o seletor do componente como app-modalcliente.
  Isso significa que você pode usar este componente no seu
  template HTML como  <app-modalcliente></app-modalcliente>.*/
  selector: 'app-modalcliente',

  /*Define o caminho para o arquivo HTML do
  template do componente */
  templateUrl: './modalcliente.page.html',

  /*Define o caminho para o arquivo SCSS  de estilos
  do componente. */
  styleUrls: ['./modalcliente.page.scss'],

  /*Indica que este componente é um componente standalone. Componentes
  standalone não precisam ser declarados em um módulo Angular */
  standalone: true,

  /*Importa os módulos IonicModule e FormsModule para que este componente possa usar os componentes, diretivas e serviços fornecidos
  por esses módulos. */
  imports: [IonicModule, FormsModule]
})

/*Define a classe do componente como ModalclientePage e implementa
a interface OnInit. Isso significa que esta classe deve ter um 
método ngOnInit(). */
export class ModalclientePage implements OnInit {

  /*Input: Este é um decorador do Angular. Decoradores são funções
  que modificam classes, propriedades ou métodos.
  
  c: Este é o nome da propriedade que está sendo decorada. É o nome
  que será usado no template do componente pai para passar dados
  para este componente filho.

  Clientes | undefined: Esta parte define o tipo da propriedade
  c. 

  Clientes: é uma interface que define a estrutura de dados de um
  cliente. Isso significa que a variável "c" pode receber um objeto do tipo cliente.

  | undefined: O operador | significa "ou". Portanto Clientes | undefined
  significa que a propriedade c pode ser do tipo Clientes ou undefined
  (indefinida). Isso é útil para lidar com casos em que o componente filho pode ser renderizado antes que os dados do cliente estejam
  disponiveis.
  */
  @Input() c: Clientes | undefined;

  /*O construtor da classe recebe o ModalController como um parâmetro
  e o atribui a uma propriedade privada modalCtrl. Isso permite que
  o componente use o ModalController para fechar o modal. */
  constructor(private modalCtrl: ModalController, private services:ClientesService) { }

  /*Este método é chamado após a inicialização do componente. Podemos
  adicionar aqui um código para executar alguma lógica de inicialização */
  ngOnInit() {


    console.log("Entrou no atualizar");
    
    /*Exibe no console as propriedades da variável c. */
    console.log(this.c);

   
  }


  /* Este método chama o método dismiss() do ModalController para fechar o modal. */
  fecharModal(){

    this.modalCtrl.dismiss();
  }

  /*Este método é chamado quando o formulário é enviado. Ele recebe
  o NgForm como um parâmetro, que representa o formulário no template.
  Vamos adicionar código aqui para enviar os dados do formulário
  para um servidor ou realizar outras ações. */
  enviando(form: NgForm){

    /*Variável constante (que não muda de valor) que irá receber o objeto form.value que contém os valores dos campos do formulário.
    As chaves objeto correspondem aos nomes dos campos definidos com
    ngModel no template HTML. */
      const cliente = form.value;

      /*Chama o um método create de um serviço chamado services (classe ClientesService). Este serviço é responsável por enviar os dados do cliente para um banco de dados. O método create recebe o objeto cliente como argumento, que contém os dados do formulário.
      O subscribe é usado para lidar com a resposta assincrona do 
      método create. A função callback response é executada quando
      o Observable emite um valor, ou seja, quando a resposta do servidor é recebida.
      O modalCtrl dentro da função callback fecha o modal após a
      resposta do servidor ser recebida. Isso indica que o cadastro
      do cliente foi bem-sucedido.*/
      this.services.create(cliente).subscribe(response => {

        this.modalCtrl.dismiss(response);
      })
  }
}
