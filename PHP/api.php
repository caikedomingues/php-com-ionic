

<?php

    # Bloco que irá configurar cabeçalhos HTTP para permitir requisições
    # de diferentes origens e define o tipo de conteúdo resposta.

    # Hader: Desempenham um papel crucial na comunicação entre o servidor
    # e o cliente (geralmente um navegador). Eles servem para diversas
    # finalidades, desde fornecer informações sobre o conteúdo da resposta até controlar o comportamento do navegador. 

    # Os cabeçalhos podem informar o tipo de conteúdo que está sendo enviado na resposta, como Content-Type: application/json para dados JSON ou Content-Type: text/html para páginas HTML.
    # Resumindo, eles são o conjunto de regras e informações que definem como o servidor e o cliente se comunicam.

    # Access-Control-Allow-Origin: Controla quais origens(dominios) têm
    # permissão para fazer requisições para o seu servidor.

    # *: Sigifica que qualquer origem tem permissão para acessar os 
    # recursos do seu servidor.  
    header('Access-Control-Allow-Origin: *');

    # 'Content-Type: application/json': Este cabeçalho informa ao
    # cliente (geralmente um navegador ou outra aplicação) que o
    # conteúdo da resposta do servidor é um objeto JSON (JavaScript
    # Objetc Notation). Isso é essencial para que o cliente interprete
    # a resposta corretamente. Quando o cliente recebe a resposta, ele
    # saberá que deve análisar o conteúdo como JSON.
    header('Content-Type: application/json');

    # 'Access-Control-Allow-Methods: POST, GET, PUT, DELETE':Este 
    # cabeçalho especifica quais métodos HTTP são permitidos para
    # requisições de outras origens.
    
    # POST, GET, PUT e DELETE: são métodos HTTP comuns usados para diferentes operações (criar,ler, atualizar e excluir dados
    # respectivamente).
    
    # Ao incluir esses métodos, você está permitindo que requisições 
    # de diferentes origens usem esses métodos especificos.
    header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE');

    #  Este cabaçalho lida com cabeçalhos personalizados
    # que podem ser enviados nas requisições.

    # Access-Control-Allow-Headers: Especifica quais cabeçalhos podem
    # ser usados na requisição real.

    # Access-Control-Allow-Headers, Content-Type: Permite que a requisição envie os cabeçãlhos Access-Control-Allow-Headers e Content-Type.

    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type');


    # Conexão com  o banco de dados usando msqli: A função irá receber
    # como argumento informações do banco de dados. Essas informações
    # são: endereço do servidor, o usuário(quem administra o
    # banco de dados), a senha e o nome do banco de dados.  
    $con = new mysqli('localhost', 'root', '', 'phpionic');

    # GET: As requisições GET são um dos métodos de requisição HTTP 
    # utilizados na comunicação entre um cliente (como um navegador
    # web) e um servidor. O foco principal do GET é obter informações
    # do servidor (como textos, videos, imagens, paginas web, arquivos,
    # dados de api, etc).

    # Este bloco verifica se a requisição HTTP é do tipo GET. Se for,
    # ele processa a requisição para recuperar dados da tabela 'clientes'
    # de um banco de dados,  com base no parâmetro 'id' fornecido na 
    # URL. Se o "id" não for fornecido, ele recupera todos os registros
    # da tabela.

    # if($_SERVER['REQUEST_METHOD'] == 'GET'): Verifica se o método
    # da requisição é um GET. O REQUEST_METHOD retorna o tipo de
    # requisição que o cliente fez ao servidor. Se a requisição
    # for GET, o código dentro do bloco if será executado.
    if($_SERVER['REQUEST_METHOD'] == 'GET'){

        # Esta parte verifica se o parâmetro "id" foi passado na URL
        # da requisição GET. $_GET['id'] recupera o valor do parâmetro
        # id. A função isset serve para verificar se uma variável foi 
        # iniciada com algum valor
        if(isset($_GET['id'])){

            # Se o "id" estiver presente, ele é armazenado na variável
            # $id
            $id = $_GET['id'];

            # Irá selecionar todos os dados do id informado.
            $sql = $con->query("SELECT * FROM clientes WHERE id='$id'");

            # Irá receber um array associativo que irá localizar as 
            # colunas da tabela 'clientes' pelo nome após a seleção
            # dos dados.
            $data = $sql->fetch_assoc();

        }else{

            # Se o parâmetro "id" não estiver presente, esta parte do
            # código será executada.

            # Incializa um array vázio para armazenar os resultados.
            $data = array();

            # Raliza uma consulta sql que irá mostrar todos os registros
            # da tabela 'clientes
            $sql = $con->query("SELECT * FROM clientes");

            # Irá iterar sobre cada linha do resultado da consulta, recuperando cada linha como um array associativo e adicionando-a ao array $data
            while($d = $sql->fetch_assoc()){

                $data [] = $d;
            }
        }

        # Exit: Envia a String JSON como resposta da requisição
        # e encerra a execução do script.

        # json_encode($data): Converte o array $data em uma String JSON.
        exit(json_encode($data));
    }


    # PUT: É usado para solicitar atualizações de registros no servidor.
    # Observação se o recurso não existir no URI especificado, o put
    # pode criar um novo recurso. 

    # Este bloco verifica se a requisição HTTP é do tipo PUT. Se for,
    # ele tenta atualizar o um registro na tabela "clientes" do banco de
    # dados com base no 'id' fornecido na URL. Os dados para atualização
    # são recebidos no corpo da requisição como JSON.

    # $_SERVER["REQUEST_METHOD"] == 'PUT': Esta linha verifica se o 
    # método da requisição HTTP é um PUT. Se a requisição for PUT,
    # o código dentro do bloco if será executado.
    if($_SERVER["REQUEST_METHOD"] == 'PUT'){

        # Essa parte verifica se o id foi passado na requisição HTTP
        # PUT
        if(isset($_GET['id'])){

            # Se o id estiver presente ele será armazenado na
            # variável 'id'.
            $id = $_GET['id'];

            # json_decode: Decodifica a string JSON recebida no corpo
            # da requisição em um objeto PHP. O resultado é armazenado
            # na variável data.
            
            # file_get_contents("php://input"): Lê o conteúdo do corpo
            # da requisição HTTP. Em requisições PUT, os dados geralmente
            # são enviados no corpo da requisição.

            $data = json_decode(file_get_contents("php://input"));

            # Comando sql que atualiza o registro do id especificado na URL
            $sql = $con->query("UPDATE clientes set nome = '".$data->nome."', cidade = '".$data->cidade."', email = '".$data->email."' WHERE id='$id'");

            if($sql){

                # Se o comando for executado, vamos imprimir essa 
                # mensagem
                exit(json_encode(array('Status' => 'Sucesso')));

            }else{

                # Se a atualização do registro falhar, vamos imprimir
                # essa mensagem.
                exit(json_encode(array('Status' => 'Não Funcionou')));
            }
        }
    }
 ?>