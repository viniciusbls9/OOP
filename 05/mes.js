class Mes {
  constructor(nome, saldoInicial) {
    if (nome === "") {
      throw new Error('Mês inválido: O nome é obrigatório')
    }
    this.nome = nome
    this.saldoInicial = saldoInicial
    this.totalizador = { saldo: 0, saldoInicial, juros: 0, rendimentos: 0, receitas: 0, despesas: 0, distribuicaoDeDespesas: [] }
    this.lancamentos = []
  }

  calcularSaldo() {
    this.totalizador.saldo = this.saldoInicial
    this.apurarReceitas()
    this.apurarDespesas()
    this.distribuirDespesas()
    this.apurarJuros()
    this.apurarRendimentos()
  }

  distribuirDespesas() {
    const distribuicaoDeDespesas = []
    for (const lancamento of this.lancamentos) {
      if (lancamento.tipo === "despesa") {
        const percentual = arredondar((lancamento.valor / this.totalizador.despesas) * 100)
        distribuicaoDeDespesas.push({ categoria: lancamento.categoria, percentual })
      }
    }
    this.totalizador.distribuicaoDeDespesas = distribuicaoDeDespesas
  }

  adicionarLancamento(lancamento) {
    this.lancamentos.push(lancamento)
  }

  calcularJuros(valor) {
    const juros = arredondar(valor * 0.1)
    return juros
  }

  calcularRendimentos(valor) {
    const rendimentos = arredondar(valor * 0.005)
    return rendimentos
  }

  apurarJuros() {
    if (this.totalizador.saldo < 0) {
      this.totalizador.juros = this.calcularJuros(this.totalizador.saldo)
      this.totalizador.saldo = arredondar(this.totalizador.saldo + this.totalizador.juros)
    }
  }

  apurarRendimentos() {
    if (this.totalizador.saldo > 0) {
      this.totalizador.rendimentos = this.calcularRendimentos(this.totalizador.saldo)
      this.totalizador.saldo = arredondar(this.totalizador.saldo + this.totalizador.rendimentos)
    }
  }

  apurarReceitas() {
    for (const lancamento of this.lancamentos) {
      if (lancamento.tipo === "receita") {
        this.totalizador.saldo += lancamento.valor
        this.totalizador.receitas += lancamento.valor
      }
    }
  }

  apurarDespesas() {
    for (const lancamento of this.lancamentos) {
      if (lancamento.tipo === "despesa") {
        this.totalizador.saldo -= lancamento.valor
        this.totalizador.despesas += lancamento.valor
      }
    }
  }
}
