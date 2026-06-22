/**
 * Módulo de Validação de Formulários
 * Sistema de Orçamento TI
 */

// Validar campo específico
function validarCampo(campo, tipo) {
  const valor = campo.value.trim();
  const errorElement = document.getElementById(
    `error${campo.id.charAt(0).toUpperCase() + campo.id.slice(1)}`,
  );
  let valido = true;

  if (tipo === "obrigatorio" && !valor) {
    valido = false;
  } else if (tipo === "email" && valor) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    valido = emailRegex.test(valor);
  } else if (tipo === "telefone" && valor) {
    const telefoneRegex = /^[\d\s\(\)\-\+]{10,15}$/;
    valido = telefoneRegex.test(valor);
  } else if (tipo === "cpfcnpj" && valor) {
    const numeros = valor.replace(/\D/g, "");
    valido = numeros.length === 11 || numeros.length === 14;
  }

  if (!valido) {
    campo.classList.add("error");
    if (errorElement) errorElement.classList.add("show");
  } else {
    campo.classList.remove("error");
    if (errorElement) errorElement.classList.remove("show");
  }

  return valido;
}

// Adicionar eventos de validação
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("input[required]").forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.type === "email") {
        validarCampo(this, "email");
      } else if (this.id.includes("Telefone")) {
        validarCampo(this, "telefone");
      } else if (this.id.includes("CpfCnpj") || this.id.includes("Cnpj")) {
        validarCampo(this, "cpfcnpj");
      } else {
        validarCampo(this, "obrigatorio");
      }
    });
  });
});

// Validar formulário completo
function validarFormulario() {
  let valido = true;

  // Validar empresa
  const camposEmpresa = [
    "empresaNome",
    "empresaCnpj",
    "empresaEndereco",
    "empresaCidade",
    "empresaTelefone",
    "empresaEmail",
  ];
  camposEmpresa.forEach((id) => {
    const campo = document.getElementById(id);
    if (id.includes("Email")) {
      if (!validarCampo(campo, "email")) valido = false;
    } else if (id.includes("Telefone")) {
      if (!validarCampo(campo, "telefone")) valido = false;
    } else if (id.includes("Cnpj")) {
      if (!validarCampo(campo, "cpfcnpj")) valido = false;
    } else {
      if (!validarCampo(campo, "obrigatorio")) valido = false;
    }
  });

  // Validar cliente
  const camposCliente = [
    "clienteNome",
    "clienteCpfCnpj",
    "clienteEndereco",
    "clienteCidade",
    "clienteTelefone",
  ];
  camposCliente.forEach((id) => {
    const campo = document.getElementById(id);
    if (id.includes("Telefone")) {
      if (!validarCampo(campo, "telefone")) valido = false;
    } else if (id.includes("CpfCnpj")) {
      if (!validarCampo(campo, "cpfcnpj")) valido = false;
    } else {
      if (!validarCampo(campo, "obrigatorio")) valido = false;
    }
  });

  // Validar email do cliente se preenchido
  const emailCliente = document.getElementById("clienteEmail");
  if (emailCliente.value.trim()) {
    if (!validarCampo(emailCliente, "email")) valido = false;
  }

  // Validar documento
  if (!validarCampo(document.getElementById("numeroDoc"), "obrigatorio"))
    valido = false;
  if (!validarCampo(document.getElementById("dataDoc"), "obrigatorio"))
    valido = false;

  return valido;
}
