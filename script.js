/**
 * Saudação dinâmica por horário
 */
function atualizarSaudacao() {
  var elementoSaudacao = document.getElementById('saudacao');
  if (!elementoSaudacao) return;

  var hora = new Date().getHours();
  var saudacao;

  if (hora >= 6 && hora < 12) {
    saudacao = 'Bom dia! Bem-vindo ao Petshop WillPet!';
  } else if (hora >= 12 && hora < 18) {
    saudacao = 'Boa tarde! Bem-vindo ao Petshop WillPet!';
  } else {
    saudacao = 'Boa noite! Bem-vindo ao Petshop WillPet!';
  }

  elementoSaudacao.textContent = saudacao;
}

/**
 * Relógio em tempo real
 */
function atualizarRelogio() {
  const elementoRelogio = document.getElementById('relogio');
  if (!elementoRelogio) {
    return;
  }

  const agora = new Date();
  const opcoes = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  elementoRelogio.textContent = agora.toLocaleDateString('pt-BR', opcoes);
}

/**
 * Validação da data de agendamento (não permitir datas passadas)
 */
function configurarDataMinima() {
  const campoData = document.getElementById('dataAgendamento');
  if (!campoData) {
    return;
  }

  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  campoData.setAttribute('min', ano + '-' + mes + '-' + dia);
}

/**
 * Máscara simples de CPF
 */
function aplicarMascaraCPF() {
  /**@type {HTMLInputElement} */
  const campoCPF = document.getElementById('cpfCliente');
  if (!campoCPF) {
    return;
  }
  campoCPF.addEventListener('input', function () {
    let valor = this.value.replace(/\D/g, '');
    if (valor.length > 11) {
      valor = valor.substring(0, 11);
    }

    if (valor.length > 9) {
      valor = valor.substring(0, 3) + '.' + valor.substring(3, 6) + '.' + valor.substring(6, 9) + '-' + valor.substring(9);
    } else if (valor.length > 6) {
      valor = valor.substring(0, 3) + '.' + valor.substring(3, 6) + '.' + valor.substring(6);
    } else if (valor.length > 3) {
      valor = valor.substring(0, 3) + '.' + valor.substring(3);
    }

    this.value = valor;
  });
}

/**
 * Máscara simples de CEP
 */
function aplicarMascaraCEP() {
  /**@type {HTMLInputElement} */
  const campoCEP = document.getElementById('cepCliente');
  if (!campoCEP) {
    return;
  }

  campoCEP.addEventListener('input', function () {
    let valor = this.value.replace(/\D/g, '');
    if (valor.length > 8) {
      valor = valor.substring(0, 8);
    }

    if (valor.length > 5) {
      valor = valor.substring(0, 5) + '-' + valor.substring(5);
    }

    this.value = valor;
  });
}

/**
 * Range do pet: atualizar valor exibido
 */
function configurarRange() {
  const range = document.getElementById('idadeRange');
  const valorSpan = document.getElementById('idadeRangeValor');
  if (!range || !valorSpan) {
    return;
  }

  range.addEventListener('input', function () {
    valorSpan.textContent = this.value;
  });
}

/**
 * Confirmação antes de enviar formulários
 */
function configurarConfirmacaoFormularios() {
  const formularios = document.querySelectorAll('form');

  formularios.forEach(form => {
    form.addEventListener('submit', evento => {
      const confirmou = confirm('Deseja realmente enviar os dados? Verifique se todas as informações estão corretas.');
      if (!confirmou) {
        evento.preventDefault();
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  atualizarSaudacao();
  atualizarRelogio();
  configurarDataMinima();
  aplicarMascaraCPF();
  aplicarMascaraCEP();
  configurarRange();
  configurarConfirmacaoFormularios();

  setInterval(atualizarRelogio, 1000);
});
