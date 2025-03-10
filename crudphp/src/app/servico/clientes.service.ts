

/*Este arquivo define um serviço angular chamado ClientesService
que busca dados de uma API. */

/*Importa o serviço HttpClient do Angular, que permite fazer requisições
HTTP para APIs */

/*API: Interface de Programação de Aplicativos. é um conjunto de 
regras e definições que permitem que diferentes softwares se 
comuniquem entre si. Pense em uma API como um intermediário 
que facilita a interação entre dois sistemas, sem que um precise
conhecer os detalhes internos do outro. */
import { HttpClient } from '@angular/common/http';

/*Importa o decorador Injectable, usado para marcar uma classe como
um serviço injetável do Angular */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*Define uma interface chamada Clientes que especifica a estrutura dos
dados dos clientes. Cada cliente terá as propriedades (colunas
do banco de dados) id, nome, cidade e email, todas do tipo string.
Essa interface ajuda a manter a consistência dos dados e facilita a
tipagem do código. */
export interface Clientes{

  id: string;
  nome:string;
  cidade: string;
  email: string;
}

/*Decora a classe ClientesService como um serviço injetável. */
@Injectable({
  providedIn: 'root'
})

/* */
export class ClientesService {

  /*Define uma propriedade privada chamada url que armazena o endereço
  da API onde os dados dos clientes estão localizados. */  
  private url = 'http://localhost/php-com-ionic/PHP/clientes';


  /*O construtor recebe o serviço HttpClient como parâmetro e o atribui
  a uma variável privada http. Isso permite que o serviço use o HttpClient para fazer requisições HTTP. */
  constructor(private http: HttpClient) { }

  /*Define um método chamado getAll() que faz uma requisição GET para a 
  API na URL especificada */
  getAll(){

    /*Usa o HttpClient para fazer uma requisição GET para a URL 
    armazenada na propriedade url. <[Clientes]> indica que o método
    espera receber um array do tipo Clientes como resposta da API. 
    O método retorna um Observable que emite o array de clientes quando
    a requisição é bem-sucedida.*/
    return this.http.get<[Clientes]>(this.url);
  }

  /*Método que irá realizar requisições do tipo DELETE para apagar
  dados do servidor. */

  /*id: any: Declara que a função recebe um parâmetro chamado id de tipo
  any. O tipo any significa que o parâmetro pode ser de qualquer tipo
  (número, string, objeto, etc) */
  remove(id: any){

    /*This.http refere-se a uma instância de serviço HttpClient do Angular, que é usado para fazer requisições Http.
  
    this.http.delete() é usado para fazer uma requisição Http DELETE. 
    As requisições DELETE são tipicamente utilizadas para remover 
    recursos do servidor.

    this.url + '/' + id constrói a URL completa para a requisição DELETE.
    */
    return this.http.delete(this.url + '/' + id);
  }

  /*Srrviço que irá lidar com a criação de novos 
  clientes. A função irá receber um único parâmetro chamado
  cliente. O tipo de cliente é a classe Clientes definida anteriormente
  */
  create(cliente: Clientes){

    /* Usa o http serviço para fazer uma requisição POST para uma URL
    especificada pelo this.url. O cliente objeto é passado como corpo 
    para solicitação. */
    return this.http.post(this.url, cliente)
  }

  
  /*Função que irá lidar com a atualização de clientes usando requisição
  HTTP put. Ela recebe 2 argumentos:
  
  cliente: clientes: Um objeto do tipo Clientes que contém os dados
  atualizados do cliente.
  
  id: any: O id do cliente que precisa ser atualizado. O tipo any indica
  que o ID pode ser de qualquer tipo (geralmente um número ou string).
  */
  update(cliente: Clientes, id:any): Observable<any>{


      /*Esta linha realiza a requisição HTTP put para atualizar o cliente
      no banco de dados.
      
      this.http: é uma instância do HttpClient do Angular, que é usado
      para fazer requisições HTTP.
      
      put: O método put do HttpClient é usado para enviar a requisição
      HTTP put ao servidor. Ela recebe 2 argumentos:
      
      url: A URL para a qual a requisição será enviada.

      body (cliente): Os dados que serão enviados no corpo
      da requisição.
      */

      /*this.url + '/' + id: Esta parte constrói a URL completa para a requisição adicionando o id e os dados do cliente. O id indica
      qual registro deve ter os dados atualizados e o cliente possui
      os dados atualizados */
      return this.http.put(this.url + '/' + id, cliente);


  }

}
