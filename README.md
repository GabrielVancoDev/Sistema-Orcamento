# 💻 Sistema de Orçamento TI

Um sistema web profissional para geração de orçamentos e notas fiscais para equipamentos de informática, com exportação para PDF.

## 🎯 Características

- ✅ Interface moderna e responsiva
- ✅ Validação completa de formulários
- ✅ Restrição de caracteres em campos
- ✅ Cálculo automático de totais
- ✅ Geração de PDF profissional
- ✅ Cores neutras e profissionais
- ✅ Sem dependências externas (exceto jsPDF)

## 🚀 Como Usar

### Opção 1: Abrir Localmente
1. Clone o repositório:
```bash
git clone https://github.com/GabrielVancoDev/Sistema-Orcamento
cd sistema-orcamento-ti
```

2. Abra o arquivo `index.html` no navegador

### Opção 2: Usar um Servidor Local
```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (http-server)
npx http-server
```

Acesse: `http://localhost:8000`

## 📋 Como Funciona

### 1. **Dados da Empresa**
Preencha as informações da sua empresa (obrigatório). Já vem com dados de exemplo.

### 2. **Dados do Cliente**
Insira os dados do cliente que receberá o orçamento (obrigatório).

### 3. **Informações do Documento**
Defina o tipo (Orçamento ou Nota Fiscal), número e data.

### 4. **Adicionar Itens**
- Descrição do produto/serviço
- Quantidade
- Valor unitário

Clique em "Adicionar" para incluir na tabela.

### 5. **Gerar PDF**
Clique em "Gerar PDF" para baixar o documento formatado.

## 🔒 Validações

- **Email**: Formato válido
- **Telefone**: 10-15 caracteres numéricos
- **CPF**: 11 dígitos
- **CNPJ**: 14 dígitos
- **Campos obrigatórios**: Destacados com asterisco vermelho
- **Restrição de caracteres**: Limite máximo por campo

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos e responsividade
- **JavaScript (Vanilla)**: Lógica da aplicação
- **jsPDF**: Geração de PDFs

## 📊 Cores Utilizadas

- **Primária**: `#2c3e50` (Cinza escuro)
- **Secundária**: `#34495e` (Cinza médio)
- **Sucesso**: `#27ae60` (Verde)
- **Erro**: `#e74c3c` (Vermelho)
- **Fundo**: `#f5f5f5` (Cinza claro)

## 🔧 Customizações

### Alterar cor primária
Edite o arquivo `assets/css/style.css`:
```css
.btn-primary, .header, .section {
    background: #SEU_CODIGO_COR;
}
```

### Alterar dados padrão da empresa
Edite o `index.html`:
```html
<input type="text" id="empresaNome" value="Sua Empresa">
```

### Adicionar novos campos
1. Adicione o input no HTML
2. Crie a validação em `validation.js`
3. Integre no PDF em `app.js`

## 📝 Exemplo de Uso

1. Preencha os dados da empresa
2. Insira nome do cliente: "João Silva"
3. Adicione item: "Notebook Dell Inspiron 15" - Qtd: 1 - Valor: R$ 3.500,00
4. Clique em "Gerar PDF"
5. Download automático: `ORCAMENTO_001-2026.pdf`

## 📄 Campos Validados

| Campo | Máximo | Validação |
|-------|--------|-----------|
| Nome Empresa | 80 | Obrigatório |
| CNPJ | 18 | Formato e tamanho |
| Endereço | 100 | Obrigatório |
| Cidade | 50 | Obrigatório |
| Telefone | 15 | Formato telefônico |
| Email | 60 | Formato válido |
| CPF/CNPJ Cliente | 18 | 11 ou 14 dígitos |
| Descrição Item | 100 | Obrigatório |

## 🤝 Contribuições

Sugestões e melhorias são bem-vindas! Sinta-se livre para:
- Abrir issues
- Enviar pull requests
- Reportar bugs

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

Desenvolvido como um projeto de portfólio para demonstrar habilidades em:
- Desenvolvimento Frontend
- JavaScript Vanilla
- Design Responsivo
- Validação de Formulários
- Geração de PDFs

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para o seu portfólio**