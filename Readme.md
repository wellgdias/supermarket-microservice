## Archtype Nodejs
Este arquetipo em node foi desenvolvido em TypeScript, e deverá seguir os padrões de desenvolvimento estipulados no .eslitnrc.json, link abaixo contendo as regras e padrões

https://eslint.org/docs/rules/


### Pré requisitos
* eslint
* typescript
* typescript@next
* gulp
* nodemon
* ts-node
* swagger-jsdoc


### Variáveis de Ambiente
O arquivo .env, é responsável por configuar as variávies de ambiente do sistema. Como exemplo de .env está sendo disponibilizado o arquivo .env.exemple.

Então antes de rodar o projeto, renomeie o arquivo .env.exemple para .env. Na pasta do projeto rode o comando abaixo:

```
cp .env.example .env
```


### Instalações e execuções
Instalações Globais
```
sudo npm install -g eslint typescript typescript@next gulp nodemon ts-node mocha swagger-jsdoc --ignore-scripts
```

Instalações da aplicação
```
npm install --ignore-scripts

// Ambiente de Dev
npm install --only=dev --ignore-scripts
```

Start ambiente de Dev
```
npm run start-dev

// Para acessar a api de teste use o seguinte endpoint
// http://localhost:8082/helloword/MensagemDeTeste
```

Executar testes
```
npm run test
```

Build da aplicação para prod
```
npm run build
```

Start ambiente de prod
```
npm run start
```

Gerar documentação do swagger
```
npm run swagger-doc
```


### Database
Para criar uma nova conexão com o banco, deverá ser criado uma classe no diretório ./src/services/database. Siga o exemplo de ./src/services/database/DataDiskService. E esta classe deverá implementar a interface DatabaseInterface do módulo archetype-node-interfaces.

Referência sobre o módulo archetype-node-interfaces http://r-gitlab.riachuelo.net/canais-digitais/archetype-node-interfaces

Na classe que deseja utilizar um objeto para manipular os dados do banco.  Deverá criar um objeto do tipo ./src/services/Database, passando os atributos de collection que será manipulada e a classe de conexão com o banco de dados. Ex:

```
import { Database} from '../services';
import { DatabaseInterface } from 'archetype-node-interfaces';


/**
* Faz a conexão com o banco e insere um registro na base
*/
public myMethod() {
	const database: Database = new Database('test-helloword', new DiskDatabase());
	const item = await database.insert({name: 'Archtype', type: 'nodejs', text: 'hellowrd'});

	return item;
}

```


### Log
Todos os logs serão disparados para o Elastisearch e exibidos no Kibana. Para não conectar diretamente com o Elasticsearch, será enviado para o FluentD e este se responsábiliza por comunicar com o Elastic. Para configurar o FluentD local, acesso o link (http://gitlab-cloud.riachuelo.net/grp_ecommerce/docker-fluentd-dev)

A class responsável por disparar todos eventos de log é ./src/services/LogService, ela contém os métodos:

```
public collectRequestInformation(request: Request): void
public error(error: Error): void 
public add(key: string, value: any): void
public startAt(): void
public endAt(): void
public sendLog(type: string = 'info'): void

```

* collectRequestInformation 
Recebe o Request como parâmetro e é resonsável por adcionar os dados da requisição no log.

* error
Recebe o Error com parâmetro e é resonsável por adcionar os dados de erro no log.

* add
Recebe duas strings com paramêtros, chave e valor. E adiciona atributos customisáveis no log.

* startAt
Responsável por adicionar o timestamp de inicio do processo no log.

* endAt
Responsável por adicionar o timestamp de fin do processo no log.

* sendLog
Responsável por enviar o log para o FluentD.

Exemplo de utilização:

```
import { LogService } from '../services';

public myMethod(req: Request) {
	this.logger.collectRequestInformation(req);
	this.logger.startAt();

	try {
		//Logica ...
		this.logger.add('atributoPersonalizado', 'Valor Personalizado');

		this.logger.endAt();
            	this.logger.sendLog();
	} catch (error) {
		this.logger.error(error);
	}
}

```


### Documentação da API (Swagger)
Toda API deve ter documentação no Swagger, para isso o plugin do swagger-jsdoc está instalado na aplicação. Para que possa ser gerada a devida documentação, você deverá colocar os doctypes na API. Segue exemplo de doctype:

```
/**
* @swagger
*
* /helloword/{msg}:
*   get:
*     description: Teste da api helloword
*     produces:
*       - application/json
*     parameters:
*       - name: msg
*         description: Mensagem que será exibda na tela.
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: login
*/
```

Link da documentação do swagger-jsdoc https://github.com/Surnet/swagger-jsdoc



### Subir aplicação para ambientes de qa, preprod e prod com Docker
Para subir a aplicação utilizando o Dockerfile, basta acessar o linke (http://r-gitlab.riachuelo.net/canais-digitais/arquetipo-node-docker)