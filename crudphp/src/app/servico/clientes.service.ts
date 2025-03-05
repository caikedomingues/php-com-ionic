

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

/*Define uma interface chamada Clientes que especifica a estrutura dos
dados dos clientes. Cada cliente terá as propriedades (colunas
do banco de dados) id, nome, cidade e email, todas do tipo string.
Essa interface ajuda a manter a consistência dos dados e facilita a
tipagem do código. */
export interface Clientes{

  id: String;
  nome:String;
  cidade: String;
  email: String;
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
}
