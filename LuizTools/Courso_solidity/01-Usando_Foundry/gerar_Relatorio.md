Segue o conteúdo formatado em Markdown (.md) para que você possa colocar no seu GitHub:

markdown
Copy
# Como gerar um relatório HTML de cobertura

Este guia explica como gerar um relatório de cobertura em HTML utilizando o Foundry e a ferramenta `genhtml`.

## 1. Gere o arquivo LCOV com o Foundry

Use a flag `--report lcov` para gerar um arquivo no formato LCOV:

```bash
forge coverage --report lcov --out lcov.info
Isso vai gerar um arquivo chamado lcov.info com os dados de cobertura.
```
2. Instale a ferramenta genhtml
Em distribuições baseadas em Debian/Ubuntu, você pode instalar com:

```bash
sudo apt-get update
sudo apt-get install lcov
```
Em outras distribuições, procure o pacote lcov no seu gerenciador de pacotes.

3. Converta o LCOV para HTML
Depois de gerar o lcov.info, use o comando genhtml (que vem junto com o pacote lcov) para criar um relatório HTML completo:

```bash
genhtml lcov.info --output-directory coverage
```
Isso criará uma pasta chamada coverage contendo vários arquivos HTML.

4. Abra o relatório no navegador
Abra o arquivo principal, geralmente index.html, no seu navegador:

```bash
xdg-open coverage/index.html
```
Lá você verá um relatório detalhado, com cada arquivo de contrato e as linhas que foram ou não cobertas pelos testes.

Resumo do Fluxo
Gere LCOV:

```bash
forge coverage --report lcov --out lcov.info
```
Converta para HTML:


genhtml lcov.info --output-directory coverage
Abra no navegador:

```bash
xdg-open coverage/index.html
```
Dessa forma, você terá um relatório interativo que destaca as linhas não cobertas em cada contrato.



Você pode salvar esse conteúdo em um arquivo com a extensão `.md` (por exemplo, `COBERTURA.md`) e enviá-lo para o seu repositório GitHub.


Search

Deep research

## Cobertura Gerada em Momentos Diferentes:  seguer este passo

Você rodou forge coverage --match-contract BookDatabaseTest e viu 52.94% no terminal, mas não gerou um novo relatório HTML específico para esse mesmo run.
O arquivo HTML que você abriu pode ter sido gerado anteriormente, com um outro comando ou sem o filtro --match-contract, resultando em dados desatualizados.
Uso de Comandos Diferentes para Relatório HTML:

Se você estiver usando genhtml para criar o relatório HTML, verifique se está rodando o mesmo comando de cobertura e sobrescrevendo os mesmos arquivos.
Por exemplo, se você executa:

```bash
forge coverage --match-contract BookDatabaseTest --report lcov --out lcov.info
genhtml lcov.info --output-directory coverage
```
e depois abre o coverage/index.html, você deve ver os mesmos números que apareceram no terminal.

```bash
genhtml lcov.info --output-directory coverage
```
```bash
xdg-open coverage/index.html
```