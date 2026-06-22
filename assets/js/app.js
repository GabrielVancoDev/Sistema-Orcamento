/**
 * Sistema de Orçamento TI
 * Aplicação Principal
 */

let itens = [];

// Inicialização
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("dataDoc").valueAsDate = new Date(); // Definir data atual
  atualizarTabela();
});

// Adicionar item
function adicionarItem() {
  const descricao = document.getElementById("itemDescricao").value.trim();  
  const quantidade = parseFloat(
    document.getElementById("itemQuantidade").value,
  );
  const valor = parseFloat(document.getElementById("itemValor").value);

  // Validações
  if (!descricao) {
    alert("Preencha a descrição do produto!");
    document.getElementById("itemDescricao").focus();
    return;
  }

  if (quantidade <= 0 || quantidade > 9999) {
    alert("Quantidade deve estar entre 1 e 9999!");
    document.getElementById("itemQuantidade").focus();
    return;
  }

  if (valor <= 0 || valor > 999999.99) {
    alert("Valor deve estar entre R$ 0,01 e R$ 999.999,99!");
    document.getElementById("itemValor").focus();
    return;
  }

  const item = {
    id: Date.now(),
    descricao,
    quantidade,
    valorUnitario: valor,
    valorTotal: quantidade * valor,
  };

  itens.push(item);
  atualizarTabela();
  limparCamposItem();
}

// Remover item
function removerItem(id) {
  if (confirm("Deseja remover este item?")) {
    itens = itens.filter((item) => item.id !== id);
    atualizarTabela();
  }
}

// Atualizar tabela
function atualizarTabela() {
  const container = document.getElementById("tabelaItens");
  const btnGerarPDF = document.getElementById("btnGerarPDF");

  if (itens.length === 0) {
    container.innerHTML =
      '<div class="empty-state">📦 Nenhum item adicionado ainda</div>';
    document.getElementById("totalSection").innerHTML = "";
    btnGerarPDF.disabled = true;
    return;
  }

  btnGerarPDF.disabled = false;

  let html = `
        <table class="items-table">
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th style="width: 80px;">Qtd</th>
                    <th style="width: 120px;">Valor Unit.</th>
                    <th style="width: 120px;">Total</th>
                    <th style="width: 100px;">Ações</th>
                </tr>
            </thead>
            <tbody>
    `;

  itens.forEach((item) => {
    html += `
            <tr>
                <td>${item.descricao}</td>
                <td>${item.quantidade}</td>
                <td>${formatarMoeda(item.valorUnitario)}</td>
                <td><strong>${formatarMoeda(item.valorTotal)}</strong></td>
                <td>
                    <button class="btn-danger" onclick="removerItem(${item.id})">
                        🗑️
                    </button>
                </td>
            </tr>
        `;
  });

  html += "</tbody></table>";
  container.innerHTML = html;

  // Atualizar total
  const total = itens.reduce((sum, item) => sum + item.valorTotal, 0);
  document.getElementById("totalSection").innerHTML = `
        <div class="total-section">
            <h3>Valor Total do Documento</h3>
            <div class="amount">${formatarMoeda(total)}</div>
        </div>
    `;
}

// Limpar campos de item
function limparCamposItem() {
  document.getElementById("itemDescricao").value = "";
  document.getElementById("itemQuantidade").value = "1";
  document.getElementById("itemValor").value = "0";
  document.getElementById("itemDescricao").focus();
}

// Formatar moeda
function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

// Limpar formulário
function limparFormulario() {
  if (confirm("Deseja realmente limpar todos os dados?")) {
    itens = [];
    atualizarTabela();

    document.getElementById("clienteNome").value = "";
    document.getElementById("clienteCpfCnpj").value = "";
    document.getElementById("clienteEndereco").value = "";
    document.getElementById("clienteCidade").value = "";
    document.getElementById("clienteTelefone").value = "";
    document.getElementById("clienteEmail").value = "";

    document
      .querySelectorAll(".error")
      .forEach((el) => el.classList.remove("error"));
    document
      .querySelectorAll(".error-message")
      .forEach((el) => el.classList.remove("show"));
  }
}

// Gerar PDF
function gerarPDF() {
  if (itens.length === 0) {
    alert("Adicione pelo menos um item antes de gerar o PDF!");
    return;
  }

  if (!validarFormulario()) {
    alert("Por favor, preencha todos os campos obrigatórios corretamente!");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Dados
  const empresa = {
    nome: document.getElementById("empresaNome").value.trim(),
    cnpj: document.getElementById("empresaCnpj").value.trim(),
    endereco: document.getElementById("empresaEndereco").value.trim(),
    cidade: document.getElementById("empresaCidade").value.trim(),
    telefone: document.getElementById("empresaTelefone").value.trim(),
    email: document.getElementById("empresaEmail").value.trim(),
  };

  const cliente = {
    nome: document.getElementById("clienteNome").value.trim(),
    cpfCnpj: document.getElementById("clienteCpfCnpj").value.trim(),
    endereco: document.getElementById("clienteEndereco").value.trim(),
    cidade: document.getElementById("clienteCidade").value.trim(),
    telefone: document.getElementById("clienteTelefone").value.trim(),
    email: document.getElementById("clienteEmail").value.trim(),
  };

  const numeroDoc = document.getElementById("numeroDoc").value.trim();
  const dataDoc = document.getElementById("dataDoc").value;
  const tipoDoc =
    document.getElementById("tipoDoc").value === "orcamento"
      ? "ORÇAMENTO"
      : "NOTA FISCAL";

  // Cabeçalho
  doc.setFillColor(44, 62, 80);
  doc.rect(0, 0, 210, 35, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont(undefined, "bold");
  doc.text(tipoDoc, 105, 15, { align: "center" });

  doc.setFontSize(11);
  doc.setFont(undefined, "normal");
  doc.text(`Nº ${numeroDoc}`, 105, 23, { align: "center" });
  doc.text(`Data: ${new Date(dataDoc).toLocaleDateString("pt-BR")}`, 105, 29, {
    align: "center",
  });

  doc.setTextColor(0, 0, 0);

  // Dados da Empresa
  let y = 45;
  doc.setFontSize(12);
  doc.setFont(undefined, "bold");
  doc.text("DADOS DA EMPRESA", 20, y);

  doc.setFontSize(9);
  doc.setFont(undefined, "normal");
  y += 6;
  doc.text(empresa.nome, 20, y);
  y += 5;
  doc.text(`CNPJ: ${empresa.cnpj}`, 20, y);
  y += 5;
  doc.text(empresa.endereco, 20, y);
  y += 5;
  doc.text(empresa.cidade, 20, y);
  y += 5;
  doc.text(`Tel: ${empresa.telefone}`, 20, y);
  y += 5;
  doc.text(`Email: ${empresa.email}`, 20, y);

  // Dados do Cliente
  y += 12;
  doc.setFontSize(12);
  doc.setFont(undefined, "bold");
  doc.text("DADOS DO CLIENTE", 20, y);

  doc.setFontSize(9);
  doc.setFont(undefined, "normal");
  y += 6;
  doc.text(cliente.nome, 20, y);
  y += 5;
  doc.text(`CPF/CNPJ: ${cliente.cpfCnpj}`, 20, y);
  y += 5;
  doc.text(cliente.endereco, 20, y);
  y += 5;
  doc.text(cliente.cidade, 20, y);
  y += 5;
  doc.text(`Tel: ${cliente.telefone}`, 20, y);
  if (cliente.email) {
    y += 5;
    doc.text(`Email: ${cliente.email}`, 20, y);
  }

  // Tabela de Itens
  y += 12;
  doc.setFontSize(12);
  doc.setFont(undefined, "bold");
  doc.text("ITENS DO DOCUMENTO", 20, y);

  y += 7;

  // Cabeçalho da tabela
  doc.setFillColor(52, 73, 94);
  doc.rect(20, y - 5, 170, 7, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text("Descrição", 22, y);
  doc.text("Qtd", 125, y);
  doc.text("Valor Unit.", 140, y);
  doc.text("Total", 170, y);

  y += 5;
  doc.setTextColor(0, 0, 0);
  doc.setFont(undefined, "normal");

  // Itens
  itens.forEach((item, index) => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    if (index % 2 === 0) {
      doc.setFillColor(248, 249, 250);
      doc.rect(20, y - 4, 170, 6, "F");
    }

    const descricaoTruncada =
      item.descricao.length > 45
        ? item.descricao.substring(0, 42) + "..."
        : item.descricao;
    doc.text(descricaoTruncada, 22, y);
    doc.text(item.quantidade.toString(), 125, y);
    doc.text(formatarMoeda(item.valorUnitario), 140, y);
    doc.text(formatarMoeda(item.valorTotal), 170, y);
    y += 6;
  });

  // Total
  y += 5;
  const total = itens.reduce((sum, item) => sum + item.valorTotal, 0);

  doc.setFillColor(44, 62, 80);
  doc.rect(20, y - 4, 170, 10, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont(undefined, "bold");
  doc.text("VALOR TOTAL:", 25, y + 2);
  doc.text(formatarMoeda(total), 185, y + 2, { align: "right" });

  // Rodapé
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.setFont(undefined, "normal");
  doc.text("Documento gerado pelo Sistema de Orçamento TI", 105, 285, {
    align: "center",
  });
  doc.text(
    `Gerado em: ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}`,
    105,
    290,
    { align: "center" },
  );

  // Salvar
  const nomeArquivo = `${tipoDoc.replace(" ", "_")}_${numeroDoc.replace("/", "-")}_${new Date().getTime()}.pdf`;
  doc.save(nomeArquivo);
}
